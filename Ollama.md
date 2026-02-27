
## Ollama

### Best models for coding and reasoning

* ollama run qwen3-coder
* ollama run qwen3-coder-next
* ollama run gpt-oss:20b
* ollama run gpt-oss:20b
* ollama run deepseek-coder-v2 

### Example how to connect using VS Code extension Continue to local LLM Ollama

```yaml
name: Local Config
version: 1.0.0
schema: v1
models: 
  - name: Llama3.1 # Not for coding, reasoning
    provider: openai
    model: llama3.1:latest
    apiBase: http://192.168.1.215:11434/v1
    completionOptions:
      stream: false
  - name: Qwen3‑Coder  # eats a lot of RAM, 16Gb not enough
    provider: openai
    model: qwen3-coder
    apiBase: http://192.168.1.50:11434/v1
    apiKey: ollama
    completionOptions:
      stream: false
 - name: Deepseek-coder-v2  # 6-8Gb Ram
    provider: openai
    model: deepseek-coder-v2
    apiBase: http://192.168.1.50:11434/v1
    apiKey: ollama
    completionOptions:
      stream: false
```

