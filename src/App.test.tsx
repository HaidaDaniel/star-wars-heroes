import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithQueryClient } from './test-utils';
import App from './App';
import { fetchStarWarsData } from './api/api';

jest.mock('./api/api', () => ({
  fetchStarWarsData: jest.fn(),
}));



describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders loading state', () => {
    (fetchStarWarsData as jest.Mock).mockReturnValue(new Promise(() => {}));

    renderWithQueryClient(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    (fetchStarWarsData as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    renderWithQueryClient(<App />);

    expect(await screen.findByText(/error fetching data/i)).toBeInTheDocument();
  });

  test('renders no data available state', async () => {
    (fetchStarWarsData as jest.Mock).mockResolvedValue(null);

    renderWithQueryClient(<App />);

    expect(await screen.findByText(/no data available/i)).toBeInTheDocument();
  });

  test('renders main component with data', async () => {
    const mockData = { films: { 1: { id: "1", title: "A New Hope" } } }; 

    (fetchStarWarsData as jest.Mock).mockResolvedValue(mockData);

    renderWithQueryClient(<App />);

    expect(await screen.findByTestId("app-component")).toBeInTheDocument();
   
  });
});