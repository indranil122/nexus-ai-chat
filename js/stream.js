/**
 * NexusAI Chat - Server-Sent Events (SSE) Streaming Client
 */

export class StreamClient {
  constructor() {
    this.activeController = null;
  }

  // Stop current active stream
  abort() {
    if (this.activeController) {
      this.activeController.abort();
      this.activeController = null;
    }
  }

  // Stream chat completion
  async streamChat({
    baseUrl,
    apiKey,
    model,
    messages,
    systemPrompt,
    temperature = 0.7,
    maxTokens = 2048,
    topP = 1.0,
    onChunk,
    onComplete,
    onError
  }) {
    this.abort(); // Cancel any existing stream

    this.activeController = new AbortController();
    const signal = this.activeController.signal;

    let cleanUrl = baseUrl.trim().replace(/\/+$/, '');
    let endpoint = `${cleanUrl}/chat/completions`;
    if (!cleanUrl.endsWith('/v1') && !cleanUrl.includes('/v1/')) {
      endpoint = `${cleanUrl}/v1/chat/completions`;
    }

    const formattedMessages = [];
    if (systemPrompt && systemPrompt.trim()) {
      formattedMessages.push({ role: 'system', content: systemPrompt.trim() });
    }
    
    // Add existing chat messages
    messages.forEach(msg => {
      formattedMessages.push({
        role: msg.role,
        content: msg.content
      });
    });

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream'
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey.trim()}`;
    }

    if (cleanUrl.includes('openrouter.ai')) {
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'NexusAI Chat';
    }

    const payload = {
      model: model,
      messages: formattedMessages,
      temperature: parseFloat(temperature),
      max_tokens: parseInt(maxTokens, 10) || 2048,
      top_p: parseFloat(topP),
      stream: true
    };

    let fullText = '';
    let fullReasoning = '';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        signal: signal
      });

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status} ${response.statusText}`;
        try {
          const errJson = await response.json();
          if (errJson.error && errJson.error.message) {
            errorMsg = errJson.error.message;
          }
        } catch (e) {
          // ignore text error
        }
        throw new Error(errorMsg);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported by browser or response body empty.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue; // Skip comments & empty lines

          if (trimmed === 'data: [DONE]') {
            onComplete(fullText, fullReasoning);
            this.activeController = null;
            return;
          }

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.choices && data.choices[0]) {
                const delta = data.choices[0].delta || {};

                // Standard content chunk
                if (delta.content) {
                  fullText += delta.content;
                  onChunk(delta.content, null);
                }

                // DeepSeek / Thinking models reasoning content
                if (delta.reasoning_content || delta.reasoning) {
                  const reasoningChunk = delta.reasoning_content || delta.reasoning;
                  fullReasoning += reasoningChunk;
                  onChunk(null, reasoningChunk);
                }
              }
            } catch (err) {
              console.warn('Failed to parse SSE line:', trimmed);
            }
          }
        }
      }

      // Final completion trigger if stream closed normally
      onComplete(fullText, fullReasoning);
      this.activeController = null;

    } catch (err) {
      this.activeController = null;
      if (err.name === 'AbortError') {
        onComplete(fullText, fullReasoning); // Return what was generated before abort
      } else {
        onError(err);
      }
    }
  }
}
