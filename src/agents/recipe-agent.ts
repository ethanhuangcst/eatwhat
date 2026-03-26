// 菜谱生成 Agent
import { BaseAgent } from './base';
import type { RecipeInput, RecipePlan, RecipeResult } from '@/types/agent';
import { renderRecipePrompt } from '@/prompts/recipe';

export class RecipeAgent extends BaseAgent {
  async plan(input: RecipeInput): Promise<RecipePlan> {
    const prompt = renderRecipePrompt(input.preferences);

    return {
      prompt,
      systemPrompt:
        '你是一位专业营养师和厨师，擅长根据用户喜好创建家常菜谱。请使用中文回复，确保菜谱实用、易操作。',
      temperature: 0.7,
      maxTokens: 2000,
    };
  }

  async execute(plan: RecipePlan): Promise<RecipeResult> {
    try {
      const response = await this.aiService.generate(plan.prompt, {
        temperature: plan.temperature,
        maxTokens: plan.maxTokens,
      });

      // 解析 AI 响应
      const recipeData = this.parseResponse(response.content);

      return {
        success: true,
        data: recipeData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async validate(result: RecipeResult): Promise<boolean> {
    if (!result.success || !result.data) {
      return false;
    }

    const data = result.data;
    return !!(
      data.name &&
      data.description &&
      Array.isArray(data.ingredients) &&
      data.ingredients.length > 0 &&
      Array.isArray(data.instructions) &&
      data.instructions.length > 0 &&
      data.prepTime &&
      data.cookTime &&
      data.difficulty &&
      data.cuisine
    );
  }

  private parseResponse(content: string): RecipeResult['data'] {
    try {
      // 尝试解析 JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          name: parsed.name || '未命名菜谱',
          description: parsed.description || '',
          ingredients: parsed.ingredients || [],
          instructions: parsed.instructions || [],
          prepTime: parsed.prepTime || 10,
          cookTime: parsed.cookTime || 20,
          servings: parsed.servings || 2,
          difficulty: parsed.difficulty || 'medium',
          cuisine: parsed.cuisine || '中式',
          tags: parsed.tags || [],
          calories: parsed.calories,
        };
      }

      throw new Error('No JSON found in response');
    } catch (error) {
      // 如果解析失败，返回默认值
      console.error('Failed to parse AI response:', error);
      return {
        name: 'AI 生成菜谱',
        description: content.slice(0, 200),
        ingredients: [{ name: '食材', amount: '适量' }],
        instructions: ['步骤 1', '步骤 2'],
        prepTime: 15,
        cookTime: 30,
        servings: 2,
        difficulty: 'medium',
        cuisine: '中式',
        tags: ['ai-generated'],
        calories: undefined,
      };
    }
  }
}
