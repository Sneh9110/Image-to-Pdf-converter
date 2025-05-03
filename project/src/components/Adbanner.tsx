// src/components/AdBanner.tsx
import { useEffect } from 'react';

function AdBanner() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.innerHTML = `
      atOptions = {
        'key': 'e7e27e267732e29bfb57187f1af7429f',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };
    `;
    const script2 = document.createElement('script');
    script2.src = '//www.highperformanceformat.com/e7e27e267732e29bfb57187f1af7429f/invoke.js';
    script2.type = 'text/javascript';

    const container = document.getElementById('adsterra-container');
    if (container) {
      container.appendChild(script1);
      container.appendChild(script2);
    }
  }, []);

  return <div id="adsterra-container" style={{ width: 300, height: 250, margin: '20px auto' }} />;
}

export default AdBanner;
