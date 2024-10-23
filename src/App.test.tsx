import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithQueryClient } from './test-utils';
import App from './App';

test('renders main component', () => {
  renderWithQueryClient(<App />);
  const linkElement = screen.getByTestId("app-component");
  expect(linkElement).toBeInTheDocument();
});