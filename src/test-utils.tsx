import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';


const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        
        retry: false, 
      },
    },
  });
};

const renderWithQueryClient = (ui: React.ReactElement, { queryClient = createTestQueryClient(), ...renderOptions } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
    renderOptions,
  );
};

export * from '@testing-library/react';
export { renderWithQueryClient }; 