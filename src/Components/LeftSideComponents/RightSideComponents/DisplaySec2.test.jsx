import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DisplaySec2 } from './DisplaySec2';

describe('DisplaySec2 Component', () => {
  const defaultProps = {
    dispName: 'Test Transaction',
    dispDate: '2023-10-27',
    trash: jest.fn(),
  };

  test('renders a negative transaction correctly', () => {
    render(<DisplaySec2 {...defaultProps} dispAmount={-50} />);

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('id', 'dangerLi');
    expect(listItem).toHaveClass('border-danger');

    // Verify negative sign is displayed
    expect(screen.getByText(/-₹/i)).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  test('renders a positive transaction correctly', () => {
    render(<DisplaySec2 {...defaultProps} dispAmount={100} />);

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('id', 'successLi');
    expect(listItem).toHaveClass('border-success');

    // Verify positive sign is displayed
    expect(screen.getByText(/\+₹/i)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  test('calls trash function when delete button is clicked', () => {
    render(<DisplaySec2 {...defaultProps} dispAmount={50} />);

    const deleteButton = screen.getByLabelText(/Delete transaction/i);
    fireEvent.click(deleteButton);

    expect(defaultProps.trash).toHaveBeenCalledTimes(1);
  });

  test('falls back to raw date string if invalid date is provided', () => {
    const invalidDate = 'invalid-date-string';
    render(<DisplaySec2 {...defaultProps} dispAmount={50} dispDate={invalidDate} />);

    // Verify it displays the raw string instead of formatting
    expect(screen.getByText(invalidDate)).toBeInTheDocument();
  });
});
