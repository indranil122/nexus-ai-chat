<div align="center">
  
# 🚀 NexusAI Chat

**A 100% client-side, minimalist AI workbench.**  
Zero-server architecture. Complete privacy. Live interactive artifacts.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Vanilla-JS-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Anime.js](https://img.shields.io/badge/UI-Anime.js-FF4B4B)](https://animejs.com/)

<img src="https://via.placeholder.com/1000x500.png?text=NexusAI+Chat+Interface+Screenshot" alt="NexusAI Chat UI Preview" width="100%">
  
</div>

---

## 🌟 Overview

**NexusAI Chat** is a lightweight, high-performance web application designed for seamless interaction with multi-provider Large Language Models (LLMs). Built with a strict **zero-server philosophy**, all computations, API key storage, and dynamic state management occur entirely inside your browser. 

Whether you are connecting to cloud endpoints or running local GGUF models offline, NexusAI Chat offers an uncompromised, privacy-first workbench experience.

---

## 🔥 Key Features

- **🌐 Universal BYOK (Bring Your Own Key) Inference**  
  Connect seamlessly to OpenRouter, Groq, TogetherAI, DeepInfra, NVIDIA NIM, or run private local models via Ollama and LM Studio.
- **🔒 Zero-Server Privacy**  
  100% client-side execution. Zero databases, zero telemetry, and zero third-party tracking. API keys are encrypted locally using the **Web Crypto API (AES-256)**.
- **🎨 Modern Minimalist UI**  
  A premium, dark-mode high-contrast interface enhanced with fluid, physics-based UI animations powered by **Anime.js**.
- **💻 Live Canvas Engine**  
  Instantly preview, execute, and iterate on AI-generated HTML, CSS, and JavaScript web apps in a real-time, side-by-side split Canvas panel.
- **📐 Rich Text & Math Support**  
  Full code block syntax highlighting, dynamic copy/paste features, and beautiful **KaTeX** rendering for complex mathematical and scientific expressions.

---

## 🛠️ Supported Inference Providers

| Provider / Engine | Type | Supported Models / Features |
| :--- | :--- | :--- |
| **OpenRouter** | Cloud Endpoint | Claude 3.5, GPT-4o, Llama 3.3, Gemini 1.5, DeepSeek R1 |
| **Groq** | Cloud LPU | Ultra-low latency Llama 3, Mixtral, Gemma models |
| **NVIDIA NIM** | Enterprise Cloud | Scalable GPU-accelerated microservices |
| **TogetherAI / DeepInfra** | Distributed Cloud | Open-source foundation models |
| **Ollama / LM Studio** | Local Execution | Offline GGUF models (Llama, Mistral, Qwen, Phi) |

---

## ⚡ Quick Start

### 1. Requirements
- Any modern web browser (Chrome, Firefox, Safari, Edge) supporting the Web Crypto API.
- *(Optional)* Local LLM runner such as [Ollama](https://ollama.ai/) or [LM Studio](https://lmstudio.ai/).

### 2. Run Locally
```bash
# Clone the repository
git clone https://github.com/indranil122/nexus-ai-chat.git

# Navigate into the project directory
cd nexus-ai-chat

# Open index.html in your browser or serve via static server
npx serve .
```

---

## 🔒 Security & Privacy Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    Your Web Browser                     │
│                                                         │
│  ┌──────────────────┐        ┌───────────────────────┐  │
│  │   UI & Canvas    │ ◄────► │  Web Crypto (AES-256) │  │
│  └────────┬─────────┘        └───────────────────────┘  │
└───────────┼─────────────────────────────────────────────┘
            │ Direct HTTPS / WSS Connection
            ▼
┌─────────────────────────────────────────────────────────┐
│  AI Inference APIs (OpenRouter, Groq, Ollama, etc.)     │
└─────────────────────────────────────────────────────────┘
```

1. **Local Key Storage**: API keys are encrypted via AES-256 before being stored in standard browser `localStorage`.
2. **Direct Requests**: Requests are routed straight from your browser to the designated model provider or local server (`localhost`). No middleware proxies are used.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/indranil122/nexus-ai-chat/issues) if you want to contribute.

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
