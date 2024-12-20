import { getRecipes, addRecipe, deleteRecipe, generateRecipe } from '../api';

describe('API functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('getRecipes fetches recipes from API', async () => {
    const mockRecipes = [{ id: 1, name: 'Recipe 1' }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipes
    });

    const result = await getRecipes();
    expect(result).toEqual(mockRecipes);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/api/recipes');
  });

  it('addRecipe posts new recipe to API', async () => {
    const mockRecipe = { name: 'New Recipe', ingredients: 'Test', instructions: 'Test' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockRecipe, id: 1 })
    });

    const result = await addRecipe(mockRecipe);
    expect(result).toEqual({ ...mockRecipe, id: 1 });
    expect(fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/api/recipes',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockRecipe)
      })
    );
  });
}); 