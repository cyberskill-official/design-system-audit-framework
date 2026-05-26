import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url, email } = await req.json()
    
    if (!url || !email) {
      throw new Error('Missing URL or email')
    }

    // 1. Perform lightweight scan
    let html = '';
    let isLive = false;
    try {
      const targetRes = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'DSAF-Scanner/1.0' } });
      isLive = targetRes.ok;
      if (isLive) {
        html = await targetRes.text();
      }
    } catch (e) {
      console.log('Failed to fetch target URL:', e);
    }

    // Deterministic mock scoring based on HTML content
    const semanticTags = ['<nav', '<main', '<footer', '<article', '<section', '<aside'];
    const semanticScore = semanticTags.filter(tag => html.includes(tag)).length;
    
    const ariaLabels = (html.match(/aria-label/g) || []).length;
    const buttons = (html.match(/<button/g) || []).length;
    
    let baseScore = 20; // Default L0
    if (isLive) baseScore += 10;
    if (semanticScore > 3) baseScore += 15;
    if (ariaLabels > 2) baseScore += 10;
    if (buttons > 5) baseScore += 5;

    // Cap at 100
    const finalScore = Math.min(100, Math.max(0, baseScore + (html.length % 15))); 
    
    const results = {
      isLive,
      semanticScore,
      ariaLabels,
      buttons,
      timestamp: new Date().toISOString()
    };

    // 2. Persist to Supabase
    // We will use the service role key to bypass RLS since the function is authenticating
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabaseClient
      .from('scans')
      .insert({
        url,
        email,
        score: finalScore,
        results_json: results,
        status: 'completed'
      })
      .select()
      .single()

    if (error) {
      throw error;
    }

    // 3. Dispatch Email via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'DSAF Audit <audit@cyberskill.world>',
          to: [email],
          subject: `Your DSAF-371 Scan Results for ${url}`,
          html: `<h1>Your DSAF Scan is Complete</h1>
                 <p>Target: ${url}</p>
                 <p>Score: <strong>${finalScore}/100</strong></p>
                 <p>Semantic Tags Detected: ${semanticScore}</p>
                 <p>Aria Labels Detected: ${ariaLabels}</p>
                 <p>The full DSAF-371 Self-Scoring CSV is attached (coming soon).</p>`
        })
      });
      if (!resendRes.ok) {
        console.error('Failed to send email via Resend', await resendRes.text());
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email dispatch.');
    }

    return new Response(JSON.stringify({ success: true, score: finalScore, scanId: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
