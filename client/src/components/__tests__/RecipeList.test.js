import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecipeList from '../RecipeList';
import { deleteRecipe } from '../../api';

jest.mock('../../api');

describe('RecipeList', () => {
  const mockRecipes = [
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' }
  ];

  const mockOnRecipeDeleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of recipes', () => {
    render(<RecipeList recipes={mockRecipes} onRecipeDeleted={mockOnRecipeDeleted} />);
    
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
  });

  it('deletes recipe when delete button is clicked', async () => {
    deleteRecipe.mockResolvedValueOnce();

    render(<RecipeList recipes={mockRecipes} onRecipeDeleted={mockOnRecipeDeleted} />);

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteRecipe).toHaveBeenCalledWith(1);
      expect(mockOnRecipeDeleted).toHaveBeenCalledWith(1);
    });
  });
}); 