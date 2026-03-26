// 菜谱生成提示词模板

export const RECIPE_SYSTEM_PROMPT = `你是一位专业营养师和厨师，擅长根据用户喜好创建家常菜谱。
请使用中文回复，确保菜谱实用、易操作。`;

export const RECIPE_USER_PROMPT = `请根据以下用户偏好生成一份家常菜谱：

用户偏好：
- 饮食限制：{dietaryRestrictions}
- 喜欢的食材：{favoriteIngredients}
- 不喜欢的食材：{dislikedIngredients}
- 菜系偏好：{favoriteCuisines}
- 辣度：{spiceLevel}
- 烹饪时间：{cookingTime}分钟
- 人数：{servings}人
- 预算等级：{budgetLevel}

请生成一份包含以下信息的菜谱（JSON 格式）：
{outputSchema}

注意：
1. 必须严格按照 JSON 格式返回
2. 确保菜谱符合用户的饮食限制
3. 避免使用用户不喜欢的食材
4. 烹饪时间应在用户期望范围内
5. 菜谱应该是家常、易操作的`;

export const RECIPE_OUTPUT_SCHEMA = {
  name: '菜名',
  description: '菜谱简介',
  ingredients: [
    {
      name: '食材名称',
      amount: '用量（如：200g, 1 勺等）',
    },
  ],
  instructions: ['步骤 1', '步骤 2', '步骤 3'],
  prepTime: '准备时间（分钟）',
  cookTime: '烹饪时间（分钟）',
  servings: '份量（人数）',
  difficulty: '难度（easy/medium/hard）',
  cuisine: '菜系（如：川菜、粤菜、意大利菜等）',
  tags: ['标签 1', '标签 2'],
  calories: '卡路里（可选）',
};

export function renderRecipePrompt(preferences: {
  dietaryRestrictions: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  favoriteCuisines: string[];
  spiceLevel: string;
  cookingTime: number;
  servings: number;
  budgetLevel: string;
}): string {
  const dietaryRestrictions =
    preferences.dietaryRestrictions.length > 0
      ? preferences.dietaryRestrictions.join(', ')
      : '无';
  const favoriteIngredients =
    preferences.favoriteIngredients.length > 0
      ? preferences.favoriteIngredients.join(', ')
      : '无特别偏好';
  const dislikedIngredients =
    preferences.dislikedIngredients.length > 0
      ? preferences.dislikedIngredients.join(', ')
      : '无';
  const favoriteCuisines =
    preferences.favoriteCuisines.length > 0
      ? preferences.favoriteCuisines.join(', ')
      : '无特别偏好';

  return RECIPE_USER_PROMPT.replace('{dietaryRestrictions}', dietaryRestrictions)
    .replace('{favoriteIngredients}', favoriteIngredients)
    .replace('{dislikedIngredients}', dislikedIngredients)
    .replace('{favoriteCuisines}', favoriteCuisines)
    .replace('{spiceLevel}', preferences.spiceLevel)
    .replace('{cookingTime}', preferences.cookingTime.toString())
    .replace('{servings}', preferences.servings.toString())
    .replace('{budgetLevel}', preferences.budgetLevel)
    .replace('{outputSchema}', JSON.stringify(RECIPE_OUTPUT_SCHEMA, null, 2));
}
