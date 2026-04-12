import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import Input from './Input';
import '@testing-library/jest-dom';

describe('Input Component - Filter Toggling', () => {
  test('initial state has "all" filter selected', () => {
    render(<Input />);
    const filterSection = screen.getByLabelText(/transaction filter/i);
    const allFilter = within(filterSection).getByRole('button', { name: /all/i });
    expect(allFilter).toHaveAttribute('aria-pressed', 'true');
  });

  test('toggling filters updates aria-pressed state', () => {
    render(<Input />);
    const filterSection = screen.getByLabelText(/transaction filter/i);
    const allFilter = within(filterSection).getByRole('button', { name: /^all$/i });
    const incomeFilter = within(filterSection).getByRole('button', { name: /^income$/i });
    const expenseFilter = within(filterSection).getByRole('button', { name: /^expense$/i });

    // Click Income
    fireEvent.click(incomeFilter);
    expect(incomeFilter).toHaveAttribute('aria-pressed', 'true');
    expect(allFilter).toHaveAttribute('aria-pressed', 'false');
    expect(expenseFilter).toHaveAttribute('aria-pressed', 'false');

    // Click Expense
    fireEvent.click(expenseFilter);
    expect(expenseFilter).toHaveAttribute('aria-pressed', 'true');
    expect(incomeFilter).toHaveAttribute('aria-pressed', 'false');
    expect(allFilter).toHaveAttribute('aria-pressed', 'false');

    // Click All
    fireEvent.click(allFilter);
    expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    expect(incomeFilter).toHaveAttribute('aria-pressed', 'false');
    expect(expenseFilter).toHaveAttribute('aria-pressed', 'false');
  });

  test('filters transactions correctly', () => {
    render(<Input />);

    // Add an income transaction
    const nameInput = screen.getByLabelText(/description/i);
    const amountInput = screen.getByLabelText(/amount/i);

    const typeSection = screen.getByLabelText(/transaction type/i);
    const typeIncome = within(typeSection).getByRole('button', { name: /^income$/i });

    fireEvent.click(typeIncome);

    const addBtnsIncome = screen.getAllByRole('button', { name: /add income/i });
    const addBtnIncome = addBtnsIncome[0]; // Get the main submit button, not the empty state one

    fireEvent.change(nameInput, { target: { value: 'Salary' } });
    fireEvent.change(amountInput, { target: { value: '5000' } });
    fireEvent.click(addBtnIncome);

    // Add an expense transaction
    const typeExpense = within(typeSection).getByRole('button', { name: /^expense$/i });
    fireEvent.click(typeExpense);

    const addBtnsExpense = screen.getAllByRole('button', { name: /add expense/i });
    const addBtnExpense = addBtnsExpense[0]; // Get the main submit button, not the empty state one

    fireEvent.change(nameInput, { target: { value: 'Groceries' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(addBtnExpense);

    // Default 'All' filter should show both
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    // Filter by Income
    const filterSection = screen.getByLabelText(/transaction filter/i);
    const incomeFilter = within(filterSection).getByRole('button', { name: /^income$/i });
    fireEvent.click(incomeFilter);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();

    // Filter by Expense
    const expenseFilter = within(filterSection).getByRole('button', { name: /^expense$/i });
    fireEvent.click(expenseFilter);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();

    // Back to All
    const allFilter = within(filterSection).getByRole('button', { name: /^all$/i });
    fireEvent.click(allFilter);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('type toggle updates state correctly', () => {
    render(<Input />);
    const typeSection = screen.getByLabelText(/transaction type/i);
    const typeExpense = within(typeSection).getByRole('button', { name: /^expense$/i });
    const typeIncome = within(typeSection).getByRole('button', { name: /^income$/i });

    // Initial is expense
    expect(typeExpense).toHaveAttribute('aria-pressed', 'true');
    expect(typeIncome).toHaveAttribute('aria-pressed', 'false');

    // Toggle to income
    fireEvent.click(typeIncome);
    expect(typeIncome).toHaveAttribute('aria-pressed', 'true');
    expect(typeExpense).toHaveAttribute('aria-pressed', 'false');

    // Toggle back to expense
    fireEvent.click(typeExpense);
    expect(typeExpense).toHaveAttribute('aria-pressed', 'true');
    expect(typeIncome).toHaveAttribute('aria-pressed', 'false');
  });
});
