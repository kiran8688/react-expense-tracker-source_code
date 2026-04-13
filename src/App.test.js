import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders the application title "Finely"', () => {
    render(<App />);
    const titleElement = screen.getByText(/Finely/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the Input component (indicated by "Recent Activity" heading)', () => {
    render(<App />);
    const recentActivityHeading = screen.getByText(/Recent Activity/i);
    expect(recentActivityHeading).toBeInTheDocument();
  });
});
