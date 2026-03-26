// AI 服务入口
import { QwenService } from './qwen';
import type { AIService } from './qwen';

let aiServiceInstance: AIService | null = null;

export function getAIService(): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new QwenService();
  }
  return aiServiceInstance;
}

export { QwenService };
export type { AIService };
