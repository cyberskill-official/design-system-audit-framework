const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    
    if (!email) {
      throw new Error('Missing email')
    }

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format')
    }

    // Dispatch to Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const RESEND_AUDIENCE_ID = Deno.env.get('RESEND_AUDIENCE_ID');
    
    if (RESEND_API_KEY && RESEND_AUDIENCE_ID) {
      const resendRes = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          unsubscribed: false
        })
      });
      if (!resendRes.ok) {
        console.error('Failed to subscribe via Resend', await resendRes.text());
        throw new Error('Failed to subscribe to newsletter');
      }
    } else {
      console.log('RESEND_API_KEY or RESEND_AUDIENCE_ID not configured, skipping subscription.');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
