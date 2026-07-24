/**
 * NexusAI Chat - Provider Presets & Model Auto-Scraping Engine
 */

export const PROVIDER_PRESETS = {
  airouter: {
    id: 'airouter',
    name: 'AIRouter (https://api.airouter.in/v1)',
    baseUrl: 'https://api.airouter.in/v1',
    docUrl: 'https://airouter.in',
    description: 'Unified high-speed API gateway with 199+ free and paid models (Gemini 2.5/3, DeepSeek V4, Claude 3.5/4, Qwen 3, Llama 3.3).',
    
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    docUrl: 'https://openrouter.ai/keys',
    description: 'Unified gateway for Llama 3.3, DeepSeek R1, Claude, Mistral, Qwen & 200+ models.',
    
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA NIM',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    docUrl: 'https://build.nvidia.com',
    description: 'High-performance optimized inference for Llama 3, DeepSeek, Mistral, Command R+.',
    
  },
  groq: {
    id: 'groq',
    name: 'Groq Cloud',
    baseUrl: 'https://api.groq.com/openai/v1',
    docUrl: 'https://console.groq.com/keys',
    description: 'Ultra-fast LPU inference engine for Llama 3.3, DeepSeek R1 Distill, Mixtral.',
    
  },
  together: {
    id: 'together',
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    docUrl: 'https://api.together.ai/settings/api-keys',
    description: 'Fast open-source model inference platform.',
    
  },
  fireworks: {
    id: 'fireworks',
    name: 'Fireworks AI',
    baseUrl: 'https://api.fireworks.ai/inference/v1',
    docUrl: 'https://fireworks.ai/account/api-keys',
    description: 'Blazing fast fine-tuned open source models.',
    
  },
  deepinfra: {
    id: 'deepinfra',
    name: 'DeepInfra',
    baseUrl: 'https://api.deepinfra.com/v1/openai',
    docUrl: 'https://deepinfra.com/dash/api_keys',
    description: 'Cost-effective serverless inference.',
    
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama (Local)',
    baseUrl: 'http://localhost:11434/v1',
    docUrl: 'https://ollama.com',
    description: 'Run open-source LLMs locally on your Mac/Linux/Windows machine.',
    
  },
  lmstudio: {
    id: 'lmstudio',
    name: 'LM Studio (Local)',
    baseUrl: 'http://localhost:1234/v1',
    docUrl: 'https://lmstudio.ai',
    description: 'Run local LLMs with GGUF support on your desktop.',
    
  },
  custom: {
    id: 'custom',
    name: 'Custom Endpoint',
    baseUrl: '',
    docUrl: '',
    description: 'Connect to any OpenAI-compatible vLLM, TGI, FastChat or custom backend.',
    
  }
};

export class ProviderService {
  normalizeBaseUrl(url) {
    if (!url) return '';
    let trimmed = url.trim().replace(/\/+$/, '');
    return trimmed;
  }

  // Fetch models live with robust fallback logic
  async fetchModels(baseUrl, apiKey) {
    const cleanUrl = this.normalizeBaseUrl(baseUrl);
    if (!cleanUrl) {
      throw new Error('Base URL is required to auto-discover models.');
    }

    const headers = { 'Accept': 'application/json' };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey.trim()}`;
    }

    if (cleanUrl.includes('openrouter.ai')) {
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'NexusAI Chat';
    }

    // Try endpoints in priority order
    let endpointsToTry = [];
    if (cleanUrl.includes('11434')) {
      // Ollama native endpoints
      endpointsToTry.push(`${cleanUrl.replace('/v1', '')}/api/tags`);
      endpointsToTry.push(`${cleanUrl}/models`);
    } else {
      if (cleanUrl.endsWith('/v1')) {
        endpointsToTry.push(`${cleanUrl}/models`);
      } else {
        endpointsToTry.push(`${cleanUrl}/v1/models`);
        endpointsToTry.push(`${cleanUrl}/models`);
      }
    }

    let liveModels = [];
    let lastError = null;

    for (const targetEndpoint of endpointsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s per endpoint

        const response = await fetch(targetEndpoint, {
          method: 'GET',
          headers: headers,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const json = await response.json();
          liveModels = this.parseModelResponse(json, cleanUrl);
          if (liveModels && liveModels.length > 0) {
            return liveModels; // Success live models!
          }
        } else {
          lastError = new Error(`HTTP ${response.status} from ${targetEndpoint}`);
        }
      } catch (err) {
        lastError = err;
      }
    }

    // If we reach here, all endpoints failed
    console.error(`Live model fetching failed for ${cleanUrl}. Error:`, lastError);
    throw lastError || new Error('Failed to fetch models from any known endpoint.');
  }

  parseModelResponse(json, baseUrl = '') {
    let rawList = [];

    if (Array.isArray(json)) {
      rawList = json;
    } else if (json && Array.isArray(json.data)) {
      rawList = json.data;
    } else if (json && Array.isArray(json.models)) {
      rawList = json.models;
    }

    if (!rawList || rawList.length === 0) {
      return [];
    }

    const isLocal = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1') || baseUrl.includes('11434') || baseUrl.includes('1234');

    const models = rawList.map((item) => {
      const id = typeof item === 'string' ? item : (item.id || item.name || item.model);
      const name = typeof item === 'object' && item.name ? item.name : id;
      const contextLength = typeof item === 'object' ? (item.context_length || item.max_tokens || null) : null;
      const provider = typeof item === 'object' ? (item.owned_by || item.provider || '') : '';

      let isFree = false;
      let priceTag = 'PAID';

      if (isLocal) {
        isFree = true;
        priceTag = 'FREE';
      } else if (typeof item === 'object' && typeof item.free === 'boolean') {
        isFree = item.free;
        if (isFree) {
          priceTag = 'FREE';
        } else if (item.pricing && parseFloat(item.pricing.prompt || 0) > 0) {
          const promptCost = parseFloat(item.pricing.prompt);
          priceTag = `$${promptCost.toFixed(2)}/1M tok`;
        } else {
          priceTag = 'PAID';
        }
      } else if (id.toLowerCase().includes(':free') || id.toLowerCase().includes('-free') || id.toLowerCase().endsWith('/free')) {
        isFree = true;
        priceTag = 'FREE';
      } else if (typeof item === 'object' && item.pricing) {
        const promptCost = parseFloat(item.pricing.prompt || 0);
        const completionCost = parseFloat(item.pricing.completion || 0);
        if (promptCost === 0 && completionCost === 0) {
          isFree = true;
          priceTag = 'FREE';
        } else {
          isFree = false;
          let promptPerM = promptCost;
          if (promptCost > 0 && promptCost < 0.0001) {
            promptPerM = promptCost * 1000000;
          }
          priceTag = `$${promptPerM.toFixed(2)}/1M tok`;
        }
      }

      return {
        id: id,
        name: name,
        contextLength: contextLength,
        provider: provider,
        isFree: isFree,
        priceTag: priceTag
      };
    });

    models.sort((a, b) => {
      if (a.isFree !== b.isFree) {
        return a.isFree ? -1 : 1;
      }
      return a.id.localeCompare(b.id);
    });

    return models;
  }
}
