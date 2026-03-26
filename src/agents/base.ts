// Agent 基类
import { getAIService } from './index';
import type { AIService } from './qwen';
import type { AgentInput, AgentPlan, AgentResult, Message } from '@/types/agent';

export abstract class BaseAgent {
  protected aiService: AIService;
  protected contextManager: ContextManager;

  constructor() {
    this.aiService = getAIService();
    this.contextManager = new ContextManager();
  }

  abstract plan(input: AgentInput): Promise<AgentPlan>;
  abstract execute(plan: AgentPlan): Promise<AgentResult>;
  abstract validate(result: AgentResult): Promise<boolean>;

  async run(input: AgentInput): Promise<AgentResult> {
    const plan = await this.plan(input);
    const result = await this.execute(plan);

    const isValid = await this.validate(result);
    if (!isValid) {
      throw new Error('Agent result validation failed');
    }

    return result;
  }
}

export class ContextManager {
  private maxContextLength: number;
  private conversationHistory: Message[];

  constructor(maxContextLength: number = 10000) {
    this.maxContextLength = maxContextLength;
    this.conversationHistory = [];
  }

  addMessage(role: 'user' | 'assistant' | 'system', content: string): void {
    this.conversationHistory.push({ role, content });
    this.trimIfNeeded();
  }

  getContext(): Message[] {
    return this.conversationHistory;
  }

  clear(): void {
    this.conversationHistory = [];
  }

  private trimIfNeeded(): void {
    while (this.calculateTokenCount() > this.maxContextLength) {
      this.conversationHistory.shift();
    }
  }

  private calculateTokenCount(): number {
    return this.conversationHistory.reduce((acc, msg) => {
      return acc + Math.ceil(msg.content.length / 4);
    }, 0);
  }
}
