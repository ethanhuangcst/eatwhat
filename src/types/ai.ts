// AI 相关类型定义

import type { Recipe } from '@prisma/client';

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface RecipeGenerationInput {
  dietaryRestrictions: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  favoriteCuisines: string[];
  spiceLevel: string;
  cookingTime: number;
  servings: number;
  budgetLevel: string;
}

export interface GeneratedRecipe extends Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'> {
  ingredients: Array<{
    name: string;
    amount: string;
  }>;
  instructions: string[];
}

export interface QwenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface QwenAPIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: QwenMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
