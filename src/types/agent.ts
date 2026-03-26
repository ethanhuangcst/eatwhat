// Agent 相关类型定义

export interface AgentInput {
  userId: string;
  context?: Record<string, unknown>;
}

export interface AgentPlan {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  [key: string]: unknown;
}

export interface AgentResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface RecipeInput extends AgentInput {
  preferences: {
    dietaryRestrictions: string[];
    favoriteIngredients: string[];
    dislikedIngredients: string[];
    favoriteCuisines: string[];
    spiceLevel: string;
    cookingTime: number;
    servings: number;
    budgetLevel: string;
  };
}

export interface RecipePlan extends AgentPlan {
  prompt: string;
  systemPrompt: string;
}

export interface RecipeResult extends AgentResult {
  data?: {
    name: string;
    description: string;
    ingredients: Array<{ name: string; amount: string }>;
    instructions: string[];
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    tags: string[];
    calories?: number;
  };
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
