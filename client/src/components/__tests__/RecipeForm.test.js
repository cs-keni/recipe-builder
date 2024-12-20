import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeForm from '../RecipeForm';
import { addRecipe, generateRecipe } from '../../api';

// Mock the API calls
jest.mock('../../api');

describe('RecipeForm', () => {
  const mockOnRecipeAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form inputs and buttons', () => {
    render(<RecipeForm onRecipeAdded={mockOnRecipeAdded} />);
    
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredients')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
    expect(screen.getByText('Add Recipe')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const mockRecipe = {
      name: 'Test Recipe',
      ingredients: 'Test Ingredients',
      instructions: 'Test Instructions'
    };

    addRecipe.mockResolvedValueOnce({ ...mockRecipe, id: 1 });

    render(<RecipeForm onRecipeAdded={mockOnRecipeAdded} />);

    await userEvent.type(screen.getByPlaceholderText('Name'), mockRecipe.name);
    await userEvent.type(screen.getByPlaceholderText('Ingredients'), mockRecipe.ingredients);
    await userEvent.type(screen.getByPlaceholderText('Instructions'), mockRecipe.instructions);

    fireEvent.click(screen.getByText('Add Recipe'));

    await waitFor(() => {
      expect(addRecipe).toHaveBeenCalledWith(mockRecipe);
      expect(mockOnRecipeAdded).toHaveBeenCalledWith({ ...mockRecipe, id: 1 });
    });
  });

  it('generates recipe instructions when clicking generate button', async () => {
    const mockInstructions = 'Generated Instructions';
    generateRecipe.mockResolvedValueOnce({ instructions: mockInstructions });

    render(<RecipeForm onRecipeAdded={mockOnRecipeAdded} />);

    await userEvent.type(screen.getByPlaceholderText('Ingredients'), 'Test Ingredients');
    fireEvent.click(screen.getByText('Generate'));

    await waitFor(() => {
      expect(generateRecipe).toHaveBeenCalledWith('Test Ingredients');
      expect(screen.getByPlaceholderText('Instructions')).toHaveValue(mockInstructions);
    });
  });
}); 