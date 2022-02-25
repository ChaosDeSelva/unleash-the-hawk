import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders add hawk button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Add Hawk/i);
  expect(linkElement).toBeInTheDocument();
});
