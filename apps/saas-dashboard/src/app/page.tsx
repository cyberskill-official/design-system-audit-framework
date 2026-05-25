"use client";

import { useState } from 'react';
import { UploadCloud, FileCode2, Loader2, AlertTriangle, ShieldCheck, PlayCircle } from 'lucide-react';

type Violation = {
  rule: string;
  description: string;
  file: string;
};

type AuditResult = {
  score: number;
  summary: string;
  violations: Violation[];
};

export default function DashboardPage() {
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('gemini');
  const [model, setModel] = useState('');
  const [baseUrl, setBaseUrl] = useState('');

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => 
      f.name.endsWith('.tsx') || f.name.endsWith('.jsx') || f.name.endsWith('.css') || f.name.endsWith('.ts')
    );
    
    await processFiles(droppedFiles);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      await processFiles(selectedFiles);
    }
  };

  const processFiles = async (fileList: File[]) => {
    const loadedFiles: { name: string; content: string }[] = [];
    
    for (const f of fileList) {
      const text = await f.text();
      loadedFiles.push({ name: f.name, content: text });
    }
    
    setFiles(prev => [...prev, ...loadedFiles]);
  };

  const runAudit = async () => {
    if (files.length === 0) return;
    setIsAuditing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files, apiKey, provider, model, baseUrl })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to audit');
      }

      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsAuditing(false);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Settings / API Key */}
      <div className="glass" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Engine Configuration</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <select
            value={provider}
            onChange={e => setProvider(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
          >
            <option value="gemini">Google Gemini</option>
            <option value="openai">OpenAI (or Compatible)</option>
            <option value="anthropic">Anthropic</option>
          </select>
          <input 
            type="text" 
            placeholder="Custom Base URL (Optional, e.g. https://token-plan-sgp.xiaomimimo.com/v1)" 
            value={baseUrl}
            onChange={e => setBaseUrl(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
          />
          <input 
            type="text" 
            placeholder="Model Name (Optional, e.g. gpt-4o)" 
            value={model}
            onChange={e => setModel(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
          />
          <input 
            type="password" 
            placeholder="API Key (Optional if server configured)" 
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Dropzone */}
        <div 
          className="glass" 
          style={{ 
            padding: '40px', 
            textAlign: 'center', 
            borderStyle: 'dashed',
            borderColor: isDragging ? 'var(--accent)' : 'var(--border-strong)',
            backgroundColor: isDragging ? 'var(--accent-soft)' : 'var(--glass-bg)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <UploadCloud size={48} color="var(--accent)" style={{ marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>Drag & Drop Components</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Upload .tsx or .css files directly from your system.</p>
          
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            Browse Files
            <input type="file" multiple onChange={handleFileSelect} style={{ display: 'none' }} accept=".tsx,.jsx,.ts,.css" />
          </label>
        </div>

        {/* File List */}
        <div className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            Loaded Queue 
            <span className="badge">{files.length} Files</span>
          </h3>
          
          <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '200px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {files.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontStyle: 'italic' }}>No files loaded.</div>
            ) : (
              files.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <FileCode2 size={16} color="var(--text-secondary)" /> {f.name}
                  </div>
                  <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#D23B00', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
                </div>
              ))
            )}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={runAudit}
            disabled={files.length === 0 || isAuditing}
            style={{ width: '100%', opacity: files.length === 0 ? 0.5 : 1 }}
          >
            {isAuditing ? <><Loader2 className="animate-spin" size={18} /> Processing Audit...</> : <><PlayCircle size={18} /> Run DSAF Engine</>}
          </button>
        </div>

      </div>

      {/* Results Section */}
      {error && (
        <div className="animate-fade-in" style={{ padding: '24px', background: 'rgba(210, 59, 0, 0.1)', border: '1px solid #D23B00', borderRadius: '12px', color: '#D23B00' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in glass" style={{ padding: '40px', borderColor: result.score >= 85 ? '#10B981' : 'var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Audit Complete</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>{result.summary}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text-secondary)' }}>Maturity Score</div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: result.score >= 85 ? '#10B981' : '#D23B00', lineHeight: 1 }}>{result.score}<span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>/100</span></div>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Discovered Violations</h3>
          {result.violations.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px', background: 'var(--bg-color)', borderRadius: '12px', border: '1px solid #10B981', color: '#10B981' }}>
              <ShieldCheck size={24} /> <strong>Perfect! No criteria violations detected.</strong>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.violations.map((v, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--bg-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <AlertTriangle size={20} color="#D23B00" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span className="badge">{v.rule}</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{v.file}</span>
                      </div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{v.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
