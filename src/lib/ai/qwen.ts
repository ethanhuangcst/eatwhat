// Qwen API 封装
import type {
  AIResponse,
  GenerationOptions,
  QwenMessage,
  QwenAPIResponse,
} from '@/types/ai';

export interface AIService {
  generate(prompt: string, options?: GenerationOptions): Promise<AIResponse>;
  generateStream(prompt: string, options?: GenerationOptions): AsyncIterable<string>;
  embed(text: string): Promise<number[]>;
}

export class QwenService implements AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.QWEN_API_KEY || '';
    this.baseUrl =
      process.env.QWEN_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1';

    if (!this.apiKey) {
      console.warn('QWEN_API_KEY is not set');
    }
  }

  async generate(prompt: string, options?: GenerationOptions): Promise<AIResponse> {
    const messages: QwenMessage[] = [
      {
        role: 'system',
        content:
          '你是一位专业营养师和厨师，擅长根据用户喜好创建家常菜谱。请使用中文回复，确保菜谱实用、易操作。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Qwen API error: ${response.status} - ${error}`);
    }

    const data: QwenAPIResponse = await response.json();

    return {
      content: data.choices[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
  }

  async *generateStream(
    prompt: string,
    options?: GenerationOptions,
  ): AsyncIterable<string> {
    const messages: QwenMessage[] = [
      {
        role: 'system',
        content:
          '你是一位专业营养师和厨师，擅长根据用户喜好创建家常菜谱。请使用中文回复，确保菜谱实用、易操作。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Qwen API error: ${response.status} - ${error}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                yield content;
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async embed(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-v2',
        input: text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Qwen Embedding API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.data?.[0]?.embedding || [];
  }
}
