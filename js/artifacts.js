/**
 * NexusAI Chat - Artifacts & Live Canvas Engine
 */

export class ArtifactManager {
  constructor() {
    this.artifacts = [];
    this.activeArtifactId = null;
  }

  // Clear session artifacts
  clearSession() {
    this.artifacts = [];
    this.activeArtifactId = null;
  }

  // Extract artifacts from message content (e.g. html, svg, code blocks)
  extractArtifactsFromMessage(messageContent, msgId) {
    if (!messageContent) return [];

    const extracted = [];
    
    // Regex to match fenced code blocks
    const codeBlockRegex = /```(html|svg|xml|jsx|tsx|javascript|js|css|python|py|markdown|md)?\s*\n([\s\S]*?)```/gi;
    let match;
    let index = 1;

    while ((match = codeBlockRegex.exec(messageContent)) !== null) {
      const rawLang = (match[1] || 'code').toLowerCase().trim();
      const code = match[2].trim();

      // Skip very short code snippets (less than 4 lines or 50 chars) unless HTML/SVG
      if (code.length < 40 && !['html', 'svg', 'xml'].includes(rawLang)) {
        continue;
      }

      let type = 'code';
      let extension = 'txt';
      let isRenderable = false;
      let title = `Artifact ${index}`;

      if (rawLang === 'html' || code.includes('<!DOCTYPE html>') || code.includes('<html')) {
        type = 'html';
        extension = 'html';
        isRenderable = true;
        title = this.deriveTitleFromCode(code) || `Web Application #${index}`;
      } else if (rawLang === 'svg' || (code.startsWith('<svg') && code.endsWith('</svg>'))) {
        type = 'svg';
        extension = 'svg';
        isRenderable = true;
        title = `Vector Graphic #${index}`;
      } else if (['javascript', 'js', 'jsx', 'tsx'].includes(rawLang)) {
        type = 'js';
        extension = rawLang === 'jsx' || rawLang === 'tsx' ? rawLang : 'js';
        title = `JavaScript Component #${index}`;
      } else if (['python', 'py'].includes(rawLang)) {
        type = 'python';
        extension = 'py';
        title = `Python Script #${index}`;
      } else if (['css'].includes(rawLang)) {
        type = 'css';
        extension = 'css';
        title = `Stylesheet #${index}`;
      } else {
        title = `Code Document #${index}`;
      }

      const artifactId = `art_${msgId}_${index}`;
      const artifact = {
        id: artifactId,
        msgId: msgId,
        title: title,
        type: type,
        language: rawLang || 'code',
        extension: extension,
        code: code,
        isRenderable: isRenderable,
        createdAt: new Date().toISOString()
      };

      extracted.push(artifact);
      
      // Store in memory
      const existingIdx = this.artifacts.findIndex(a => a.id === artifactId);
      if (existingIdx >= 0) {
        this.artifacts[existingIdx] = artifact;
      } else {
        this.artifacts.push(artifact);
      }

      index++;
    }

    return extracted;
  }

  // Derive title from HTML <title> tag or <h1>
  deriveTitleFromCode(code) {
    const titleMatch = code.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) return titleMatch[1].trim();

    const h1Match = code.match(/<h1>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1]) return h1Match[1].replace(/<[^>]*>/g, '').trim();

    return null;
  }

  getArtifact(id) {
    return this.artifacts.find(a => a.id === id);
  }

  // Build safe preview HTML for sandboxed iframe
  buildPreviewDoc(artifact) {
    if (!artifact) return '';

    if (artifact.type === 'svg') {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin:0; padding:20px; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#0d1117; color:#fff; }
    svg { max-width:100%; height:auto; }
  </style>
</head>
<body>${artifact.code}</body>
</html>`;
    }

    if (artifact.type === 'html') {
      // If code contains full html document
      if (artifact.code.includes('<html') || artifact.code.includes('<!DOCTYPE')) {
        return artifact.code;
      }
      // Wrap snippet in standard boilerplate with Tailwind / Google Fonts support
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 p-4">
  ${artifact.code}
</body>
</html>`;
    }

    return `<!DOCTYPE html><html><body style="font-family:sans-serif; padding:20px; color:#fff; background:#090d16;"><pre>${this.escapeHtml(artifact.code)}</pre></body></html>`;
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Clean raw HTML blocks from chat text body so chat bubble stays compact and lag-free
  cleanMessageContentForChat(messageContent, isStreaming = false) {
    if (!messageContent) return '';

    let processed = messageContent;

    // Handle unclosed code block during active streaming
    if (isStreaming) {
      const openBlockIndex = processed.lastIndexOf('```');
      if (openBlockIndex !== -1) {
        const afterOpen = processed.slice(openBlockIndex);
        const lowerAfter = afterOpen.toLowerCase();
        
        // If an open code block for web app / code is currently streaming
        if (
          lowerAfter.startsWith('```html') ||
          lowerAfter.startsWith('```svg') ||
          lowerAfter.startsWith('```xml') ||
          lowerAfter.startsWith('```jsx') ||
          lowerAfter.startsWith('```tsx') ||
          lowerAfter.includes('<!doctype') ||
          lowerAfter.includes('<html') ||
          lowerAfter.includes('<svg')
        ) {
          processed = processed.slice(0, openBlockIndex) + 
            `\n\n<div class="artifact-generating-badge"><span class="badge-pulse-dot">⚡</span> Generating Web App Artifact...</div>\n\n`;
          return processed;
        }
      }
    }

    // Replace completed code blocks
    const codeBlockRegex = /```[\s\S]*?```/gi;
    return processed.replace(codeBlockRegex, (match) => {
      const lower = match.toLowerCase();
      if (
        lower.startsWith('```html') ||
        lower.startsWith('```svg') ||
        lower.startsWith('```xml') ||
        lower.startsWith('```jsx') ||
        lower.startsWith('```tsx') ||
        lower.includes('<!doctype') ||
        lower.includes('<html') ||
        lower.includes('<svg')
      ) {
        return '\n\n> ⚡ **Web App Artifact Generated** — *Live interactive app is ready in the Canvas panel on the right ➔*\n\n';
      }
      return match;
    });
  }

  // Download artifact as a file
  downloadArtifact(artifact) {
    if (!artifact) return;
    const blob = new Blob([artifact.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `${artifact.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${artifact.extension}`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
