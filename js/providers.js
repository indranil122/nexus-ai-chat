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
    fallbackModels: [
      { id: 'deepseek/deepseek-v4-flash', name: 'DeepSeek V4 Flash', contextLength: 1000000, provider: 'DeepSeek', isFree: true, priceTag: 'FREE' },
      { id: 'deepseek/deepseek-v4-pro', name: 'DeepSeek V4 Pro', contextLength: 1000000, provider: 'DeepSeek', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', contextLength: 1000000, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', contextLength: 1048576, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', contextLength: 1048576, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', contextLength: 1000000, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview', contextLength: 1000000, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-3.5-flash', name: 'Gemini 3.5 Flash', contextLength: 1000000, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-3.6-flash', name: 'Gemini 3.6 Flash', contextLength: 1000000, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'alibaba/qwen-3-32b', name: 'Qwen 3 32B', contextLength: 128000, provider: 'Alibaba', isFree: false, priceTag: '$0.16/1M tok' },
      { id: 'alibaba/qwen-3-14b', name: 'Qwen 3 14B', contextLength: 40960, provider: 'Alibaba', isFree: false, priceTag: '$0.12/1M tok' },
      { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', contextLength: 200000, provider: 'Anthropic', isFree: false, priceTag: '$0.25/1M tok' },
      { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4', contextLength: 1000000, provider: 'Anthropic', isFree: false, priceTag: '$3.00/1M tok' }
    ]
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    docUrl: 'https://openrouter.ai/keys',
    description: 'Unified gateway for Llama 3.3, DeepSeek R1, Claude, Mistral, Qwen & 200+ models.',
    fallbackModels: [
      { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B Instruct', contextLength: 131072, provider: 'Meta', isFree: true, priceTag: 'FREE' },
      { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1', contextLength: 64000, provider: 'DeepSeek', isFree: true, priceTag: 'FREE' },
      { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash Exp', contextLength: 1048576, provider: 'Google', isFree: true, priceTag: 'FREE' },
      { id: 'nvidia/nemotron-3-ultra-550b:free', name: 'NVIDIA Nemotron 3 550B', contextLength: 977000, provider: 'NVIDIA', isFree: true, priceTag: 'FREE' },
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', contextLength: 200000, provider: 'Anthropic', isFree: false, priceTag: '$3.00/1M' }
    ]
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA NIM',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    docUrl: 'https://build.nvidia.com',
    description: 'High-performance optimized inference for Llama 3, DeepSeek, Mistral, Command R+.',
    fallbackModels: [
      { id: 'meta/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct', contextLength: 131072, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'meta/llama-3.1-405b-instruct', name: 'Llama 3.1 405B Instruct', contextLength: 128000, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'meta/llama-3.1-70b-instruct', name: 'Llama 3.1 70B Instruct', contextLength: 128000, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B Instruct', contextLength: 128000, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'deepseek-ai/deepseek-r1', name: 'DeepSeek R1', contextLength: 64000, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'nvidia/nemotron-4-340b-instruct', name: 'Nemotron 4 340B Instruct', contextLength: 4096, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'nvidia/nemotron-3-8b-chat', name: 'Nemotron 3 8B Chat', contextLength: 8192, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'mistralai/mistral-large-2411', name: 'Mistral Large 2411', contextLength: 128000, provider: 'NVIDIA NIM', isFree: false, priceTag: 'PAID' },
      { id: 'mistralai/mixtral-8x22b-instruct-v0.1', name: 'Mixtral 8x22B Instruct', contextLength: 65536, provider: 'NVIDIA NIM', isFree: false, priceTag: 'PAID' },
      { id: 'cohere/command-r-plus-08-2024', name: 'Command R+ 08-2024', contextLength: 128000, provider: 'NVIDIA NIM', isFree: false, priceTag: 'PAID' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B IT', contextLength: 8192, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B IT', contextLength: 8192, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'microsoft/phi-3-mini-128k-instruct', name: 'Phi-3 Mini 128K', contextLength: 128000, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'microsoft/phi-3-medium-4k-instruct', name: 'Phi-3 Medium 4K', contextLength: 4096, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' },
      { id: 'snowflake/arctic', name: 'Snowflake Arctic', contextLength: 4096, provider: 'NVIDIA NIM', isFree: true, priceTag: 'NIM Trial' }
    ]
  },
  groq: {
    id: 'groq',
    name: 'Groq Cloud',
    baseUrl: 'https://api.groq.com/openai/v1',
    docUrl: 'https://console.groq.com/keys',
    description: 'Ultra-fast LPU inference engine for Llama 3.3, DeepSeek R1 Distill, Mixtral.',
    fallbackModels: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', contextLength: 128000, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile', contextLength: 128000, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', contextLength: 128000, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'llama3-70b-8192', name: 'Llama 3 70B (8K)', contextLength: 8192, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'llama3-8b-8192', name: 'Llama 3 8B (8K)', contextLength: 8192, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill Llama 70B', contextLength: 128000, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 Distill Qwen 32B', contextLength: 128000, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B 32k', contextLength: 32768, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B IT', contextLength: 8192, provider: 'Groq LPU', isFree: true, priceTag: 'FREE Tier' }
    ]
  },
  together: {
    id: 'together',
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    docUrl: 'https://api.together.ai/settings/api-keys',
    description: 'Fast open-source model inference platform.',
    fallbackModels: [
      { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B Instruct Turbo', contextLength: 131072, provider: 'Together AI', isFree: false, priceTag: '$0.88/1M' },
      { id: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo', name: 'Llama 3.1 405B Instruct Turbo', contextLength: 131072, provider: 'Together AI', isFree: false, priceTag: '$5.00/1M' },
      { id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', name: 'Llama 3.1 70B Instruct Turbo', contextLength: 131072, provider: 'Together AI', isFree: false, priceTag: '$0.88/1M' },
      { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Instruct Turbo', contextLength: 131072, provider: 'Together AI', isFree: false, priceTag: '$0.18/1M' },
      { id: 'deepseek-ai/DeepSeek-R1', name: 'DeepSeek R1', contextLength: 64000, provider: 'Together AI', isFree: false, priceTag: '$7.00/1M' },
      { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen 2.5 72B Instruct Turbo', contextLength: 32768, provider: 'Together AI', isFree: false, priceTag: '$1.20/1M' },
      { id: 'Qwen/Qwen2.5-7B-Instruct-Turbo', name: 'Qwen 2.5 7B Instruct Turbo', contextLength: 32768, provider: 'Together AI', isFree: false, priceTag: '$0.30/1M' },
      { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B Instruct', contextLength: 65536, provider: 'Together AI', isFree: false, priceTag: '$1.20/1M' },
      { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B Instruct', contextLength: 32768, provider: 'Together AI', isFree: false, priceTag: '$0.60/1M' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B IT', contextLength: 8192, provider: 'Together AI', isFree: false, priceTag: '$0.80/1M' },
      { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B IT', contextLength: 8192, provider: 'Together AI', isFree: false, priceTag: '$0.30/1M' },
      { id: 'microsoft/WizardLM-2-8x22B', name: 'WizardLM-2 8x22B', contextLength: 65536, provider: 'Together AI', isFree: false, priceTag: '$1.20/1M' },
      { id: 'databricks/dbrx-instruct', name: 'DBRX Instruct', contextLength: 32768, provider: 'Together AI', isFree: false, priceTag: '$1.20/1M' },
      { id: 'upstage/SOLAR-10.7B-Instruct-v1.0', name: 'SOLAR 10.7B Instruct', contextLength: 4096, provider: 'Together AI', isFree: false, priceTag: '$0.30/1M' },
      { id: 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO', name: 'Nous Hermes 2 Mixtral', contextLength: 32768, provider: 'Together AI', isFree: false, priceTag: '$0.60/1M' }
    ]
  },
  fireworks: {
    id: 'fireworks',
    name: 'Fireworks AI',
    baseUrl: 'https://api.fireworks.ai/inference/v1',
    docUrl: 'https://fireworks.ai/account/api-keys',
    description: 'Blazing fast fine-tuned open source models.',
    fallbackModels: [
      { id: 'accounts/fireworks/models/llama-v3p3-70b-instruct', name: 'Llama 3.3 70B Instruct', contextLength: 131072, provider: 'Fireworks AI', isFree: false, priceTag: '$0.90/1M' },
      { id: 'accounts/fireworks/models/llama-v3p1-405b-instruct', name: 'Llama 3.1 405B Instruct', contextLength: 131072, provider: 'Fireworks AI', isFree: false, priceTag: '$3.00/1M' },
      { id: 'accounts/fireworks/models/llama-v3p1-70b-instruct', name: 'Llama 3.1 70B Instruct', contextLength: 131072, provider: 'Fireworks AI', isFree: false, priceTag: '$0.90/1M' },
      { id: 'accounts/fireworks/models/llama-v3p1-8b-instruct', name: 'Llama 3.1 8B Instruct', contextLength: 131072, provider: 'Fireworks AI', isFree: false, priceTag: '$0.20/1M' },
      { id: 'accounts/fireworks/models/deepseek-r1', name: 'DeepSeek R1', contextLength: 64000, provider: 'Fireworks AI', isFree: false, priceTag: '$8.00/1M' },
      { id: 'accounts/fireworks/models/qwen2p5-72b-instruct', name: 'Qwen 2.5 72B Instruct', contextLength: 32768, provider: 'Fireworks AI', isFree: false, priceTag: '$0.90/1M' },
      { id: 'accounts/fireworks/models/qwen2p5-7b-instruct', name: 'Qwen 2.5 7B Instruct', contextLength: 32768, provider: 'Fireworks AI', isFree: false, priceTag: '$0.20/1M' },
      { id: 'accounts/fireworks/models/mixtral-8x22b-instruct', name: 'Mixtral 8x22B Instruct', contextLength: 65536, provider: 'Fireworks AI', isFree: false, priceTag: '$1.20/1M' },
      { id: 'accounts/fireworks/models/mixtral-8x7b-instruct', name: 'Mixtral 8x7B Instruct', contextLength: 32768, provider: 'Fireworks AI', isFree: false, priceTag: '$0.50/1M' }
    ]
  },
  deepinfra: {
    id: 'deepinfra',
    name: 'DeepInfra',
    baseUrl: 'https://api.deepinfra.com/v1/openai',
    docUrl: 'https://deepinfra.com/dash/api_keys',
    description: 'Cost-effective serverless inference.',
    fallbackModels: [
      { id: 'meta-llama/Llama-3.3-70B-Instruct', name: 'Llama 3.3 70B Instruct', contextLength: 131072, provider: 'DeepInfra', isFree: false, priceTag: '$0.59/1M' },
      { id: 'meta-llama/Meta-Llama-3.1-405B-Instruct', name: 'Llama 3.1 405B Instruct', contextLength: 131072, provider: 'DeepInfra', isFree: false, priceTag: '$2.70/1M' },
      { id: 'meta-llama/Meta-Llama-3.1-70B-Instruct', name: 'Llama 3.1 70B Instruct', contextLength: 131072, provider: 'DeepInfra', isFree: false, priceTag: '$0.59/1M' },
      { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct', name: 'Llama 3.1 8B Instruct', contextLength: 131072, provider: 'DeepInfra', isFree: false, priceTag: '$0.13/1M' },
      { id: 'deepseek-ai/DeepSeek-R1', name: 'DeepSeek R1', contextLength: 64000, provider: 'DeepInfra', isFree: false, priceTag: '$2.19/1M' },
      { id: 'Qwen/Qwen2.5-72B-Instruct', name: 'Qwen 2.5 72B Instruct', contextLength: 32768, provider: 'DeepInfra', isFree: false, priceTag: '$0.59/1M' },
      { id: 'Qwen/Qwen2.5-7B-Instruct', name: 'Qwen 2.5 7B Instruct', contextLength: 32768, provider: 'DeepInfra', isFree: false, priceTag: '$0.13/1M' },
      { id: 'microsoft/WizardLM-2-8x22B', name: 'WizardLM-2 8x22B', contextLength: 65536, provider: 'DeepInfra', isFree: false, priceTag: '$0.59/1M' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B IT', contextLength: 8192, provider: 'DeepInfra', isFree: false, priceTag: '$0.27/1M' },
      { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B IT', contextLength: 8192, provider: 'DeepInfra', isFree: false, priceTag: '$0.07/1M' },
      { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B Instruct', contextLength: 65536, provider: 'DeepInfra', isFree: false, priceTag: '$0.65/1M' },
      { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B Instruct', contextLength: 32768, provider: 'DeepInfra', isFree: false, priceTag: '$0.24/1M' },
      { id: 'mistralai/Mistral-Nemo-Instruct-2407', name: 'Mistral Nemo 12B Instruct', contextLength: 128000, provider: 'DeepInfra', isFree: false, priceTag: '$0.13/1M' }
    ]
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama (Local)',
    baseUrl: 'http://localhost:11434/v1',
    docUrl: 'https://ollama.com',
    description: 'Run open-source LLMs locally on your Mac/Linux/Windows machine.',
    fallbackModels: [
      { id: 'llama3.3', name: 'Llama 3.3 (Local)', contextLength: 131072, provider: 'Ollama', isFree: true, priceTag: 'FREE' },
      { id: 'deepseek-r1', name: 'DeepSeek R1 (Local)', contextLength: 64000, provider: 'Ollama', isFree: true, priceTag: 'FREE' },
      { id: 'llama3.1', name: 'Llama 3.1 (Local)', contextLength: 128000, provider: 'Ollama', isFree: true, priceTag: 'FREE' },
      { id: 'mistral', name: 'Mistral (Local)', contextLength: 32768, provider: 'Ollama', isFree: true, priceTag: 'FREE' },
      { id: 'qwen2.5', name: 'Qwen 2.5 (Local)', contextLength: 32768, provider: 'Ollama', isFree: true, priceTag: 'FREE' }
    ]
  },
  lmstudio: {
    id: 'lmstudio',
    name: 'LM Studio (Local)',
    baseUrl: 'http://localhost:1234/v1',
    docUrl: 'https://lmstudio.ai',
    description: 'Run local LLMs with GGUF support on your desktop.',
    fallbackModels: [
      { id: 'local-model', name: 'Active Loaded LM Studio Model', contextLength: 4096, provider: 'LM Studio', isFree: true, priceTag: 'FREE' },
      { id: 'llama-3.3-70b', name: 'Llama 3.3 70B (Local)', contextLength: 131072, provider: 'LM Studio', isFree: true, priceTag: 'FREE' },
      { id: 'deepseek-r1', name: 'DeepSeek R1 (Local)', contextLength: 64000, provider: 'LM Studio', isFree: true, priceTag: 'FREE' }
    ]
  },
  custom: {
    id: 'custom',
    name: 'Custom Endpoint',
    baseUrl: '',
    docUrl: '',
    description: 'Connect to any OpenAI-compatible vLLM, TGI, FastChat or custom backend.',
    fallbackModels: [
      { id: 'default-model', name: 'Default Model', contextLength: 4096, provider: 'Custom', isFree: true, priceTag: 'FREE' }
    ]
  }
};

export class ProviderService {
  normalizeBaseUrl(url) {
    if (!url) return '';
    let trimmed = url.trim().replace(/\/+$/, '');
    return trimmed;
  }

  // Get fallback models catalog for given base URL or preset
  getFallbackModels(baseUrl) {
    const cleanUrl = this.normalizeBaseUrl(baseUrl).toLowerCase();
    for (const key in PROVIDER_PRESETS) {
      const preset = PROVIDER_PRESETS[key];
      if (preset.baseUrl && cleanUrl.includes(this.normalizeBaseUrl(preset.baseUrl).toLowerCase())) {
        return preset.fallbackModels || [];
      }
    }
    return [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (Generic Fallback)', contextLength: 4096, isFree: false, priceTag: 'PAID' }
    ];
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

    // If live API fetching returned no models (CORS restriction, missing auth, offline),
    // return the curated fallback model catalog so user is NEVER blocked!
    console.warn(`Live model scraping failed for ${cleanUrl} (${lastError ? lastError.message : 'no response'}). Loading curated catalog fallback.`);
    return this.getFallbackModels(cleanUrl);
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
