const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, '..', 'public', 'media');
const outputHtml = path.join(__dirname, '..', 'public', 'test_gallery.html');

try {
  const files = fs.readdirSync(mediaDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const imageFiles = files.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Test Gallery SNB</title>
      <style>
        body { font-family: sans-serif; background: #f0f2f5; padding: 20px; }
        h1 { text-align: center; color: #333; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 10px; display: flex; flex-direction: column; align-items: center; }
        img { max-width: 100%; height: 150px; object-fit: cover; border-radius: 4px; }
        .filename { margin-top: 10px; font-size: 0.8rem; color: #666; word-break: break-all; text-align: center; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Visualisation des médias SNB</h1>
      <div class="grid">
        ${imageFiles.map(file => `
          <div class="card">
            <img src="/media/${file}" alt="${file}">
            <div class="filename">${file}</div>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(outputHtml, htmlContent);
  console.log('HTML test gallery generated successfully at public/test_gallery.html');
} catch (err) {
  console.error('Error generating HTML:', err);
}
