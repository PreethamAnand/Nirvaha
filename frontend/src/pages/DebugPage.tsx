import React, { useState } from 'react';

const DebugPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  const checkLocalStorage = () => {
    const marketplaceRaw = localStorage.getItem('nirvaha_marketplace_requests');
    const companionRaw = localStorage.getItem('nirvaha_companion_applications');
    
    console.log('🔍 [DEBUG] Marketplace raw:', marketplaceRaw);
    console.log('🔍 [DEBUG] Companion raw:', companionRaw);
    
    setData({
      marketplace: {
        raw: marketplaceRaw,
        parsed: marketplaceRaw ? JSON.parse(marketplaceRaw) : null,
        count: marketplaceRaw ? JSON.parse(marketplaceRaw).length : 0,
      },
      companion: {
        raw: companionRaw,
        parsed: companionRaw ? JSON.parse(companionRaw) : null,
        count: companionRaw ? JSON.parse(companionRaw).length : 0,
      }
    });
  };

  const clearAll = () => {
    if (confirm('Clear all localStorage data?')) {
      localStorage.removeItem('nirvaha_marketplace_requests');
      localStorage.removeItem('nirvaha_companion_applications');
      alert('Cleared!');
      checkLocalStorage();
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>🔍 localStorage Debug Panel</h1>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={checkLocalStorage}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Check localStorage
        </button>
        <button 
          onClick={clearAll}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#cc0000', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clear All Data
        </button>
      </div>

      {data && (
        <div style={{ marginTop: '30px' }}>
          <h2>📦 Marketplace Requests ({data.marketplace.count})</h2>
          <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
            {JSON.stringify(data.marketplace.parsed, null, 2)}
          </pre>

          <h2 style={{ marginTop: '30px' }}>👥 Companion Applications ({data.companion.count})</h2>
          <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
            {JSON.stringify(data.companion.parsed, null, 2)}
          </pre>

          <h2 style={{ marginTop: '30px' }}>📝 Raw Keys</h2>
          <ul style={{ background: '#f5f5f5', padding: '20px', borderRadius: '4px' }}>
            <li><strong>Marketplace key:</strong> nirvaha_marketplace_requests</li>
            <li><strong>Companion key:</strong> nirvaha_companion_applications</li>
          </ul>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', background: '#fff3cd', borderRadius: '4px' }}>
        <h3>🔧 Quick Tests</h3>
        <p><strong>Open browser DevTools console to see detailed logs</strong></p>
        <ul>
          <li>Submit a retreat request from <a href="/marketplace">/marketplace</a></li>
          <li>Submit a companion application from <a href="/companions">/companions</a></li>
          <li>Come back here and click "Check localStorage"</li>
          <li>Verify data appears in the JSON output above</li>
          <li>Then check admin panels:
            <ul>
              <li><a href="/admin/marketplace">/admin/marketplace</a></li>
              <li><a href="/admin/companions">/admin/companions</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DebugPage;
