import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  test('renders the App component and displays title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Finely/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the Input component', () => {
    render(<App />);
    const inputSection = screen.getByLabelText(/transaction type/i);
    expect(inputSection).toBeInTheDocument();
  });
});
