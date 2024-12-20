import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { getRecipes } from '../api';

jest.mock('../api');

describe('App', () => {
  const mockRecipes = [
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders recipes on mount', async () => {
    getRecipes.mockResolvedValueOnce(mockRecipes);

    render(<App />);

    expect(screen.getByText('Recipe Builder')).toBeInTheDocument();

    await waitFor(() => {
      expect(getRecipes).toHaveBeenCalled();
      expect(screen.getByText('Recipe 1')).toBeInTheDocument();
      expect(screen.getByText('Recipe 2')).toBeInTheDocument();
    });
  });
}); 