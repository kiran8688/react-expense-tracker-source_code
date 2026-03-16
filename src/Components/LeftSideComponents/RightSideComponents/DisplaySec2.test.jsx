import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplaySec2 from './DisplaySec2';

describe('DisplaySec2 Component', () => {
  const defaultProps = {
    dispName: 'Test Transaction',
    dispDate: '2023-10-27',
    dispAmount: '50.00',
    trash: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders income transaction properly', () => {
    render(<DisplaySec2 {...defaultProps} dispAmount="100.00" />);

    // Check for text content
    expect(screen.getByText('Test Transaction')).toBeInTheDocument();
    expect(screen.getByText('2023-10-27')).toBeInTheDocument();

    // Check for amount formatted correctly
    expect(screen.getByText('+$100.00')).toBeInTheDocument();

    // Check for arrow symbol
    expect(screen.getByText('↑')).toBeInTheDocument();

    // Check classes for income (neon-green)
    const amountElement = screen.getByText('+$100.00');
    expect(amountElement).toHaveClass('text-neon-green');
  });

  it('renders expense transaction properly', () => {
    render(<DisplaySec2 {...defaultProps} dispAmount="-50.00" />);

    // Check for amount formatted correctly
    expect(screen.getByText('-$50.00')).toBeInTheDocument();

    // Check for arrow symbol
    expect(screen.getByText('↓')).toBeInTheDocument();

    // Check classes for expense (neon-pink)
    const amountElement = screen.getByText('-$50.00');
    expect(amountElement).toHaveClass('text-neon-pink');
  });

  it('calls trash callback when delete button is clicked', () => {
    render(<DisplaySec2 {...defaultProps} />);

    const deleteButton = screen.getByLabelText('Delete Entry');
    fireEvent.click(deleteButton);

    expect(defaultProps.trash).toHaveBeenCalledTimes(1);
  });
});