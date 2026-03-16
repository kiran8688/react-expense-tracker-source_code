import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  let originalRandom;

  beforeAll(() => {
    // Mock Math.random to have predictable IDs
    originalRandom = Math.random;
    let counter = 1;
    Math.random = jest.fn(() => (0.123456789 + counter++ * 0.000000001));
  });

  afterAll(() => {
    Math.random = originalRandom;
  });

  beforeEach(() => {
    // We need to clear DOM since the component uses direct DOM queries (document.querySelector)
    document.body.innerHTML = '';
  });

  it('renders initial state correctly', () => {
    const { container } = render(<Input />);

    // Attach to body because Input component uses document.querySelector to find these!
    // Testing library does this internally in modern versions, but due to direct DOM access
    // we make sure it's in the document exactly as expected by document.querySelector
    if(!document.body.contains(container)) document.body.appendChild(container);

    expect(screen.getByText(/NEW LOG/i)).toBeInTheDocument();
    expect(screen.getByText(/DATA FEED/i)).toBeInTheDocument();

    // "No sector activity detected" text should be present since tracker is empty
    expect(screen.getByText(/No sector activity detected/i)).toBeInTheDocument();

    // The balances should be 0.00
    // DisplaySec1 shows total, income, expense
    expect(screen.getAllByText(/\$0\.00/i).length).toBeGreaterThan(0);
  });

  it('adds a new transaction with given inputs', async () => {
    const { container } = render(<Input />);
    if(!document.body.contains(container)) document.body.appendChild(container);

    const nameInput = document.querySelector('#name-input');
    const amountInput = document.querySelector('#amount-input');
    const dateInput = document.querySelector('#date-input');
    const button = screen.getByText(/Initialize Entry/i);

    // Set values - fireEvent.change works on the element directly
    fireEvent.change(nameInput, { target: { value: 'Test Income' } });
    fireEvent.change(amountInput, { target: { value: '150' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-15' } });

    // Click the button
    fireEvent.click(button);

    // Check if the transaction appears in the list (DisplaySec2 renders it)
    expect(screen.getByText('Test Income')).toBeInTheDocument();
    expect(screen.getByText('2023-10-15')).toBeInTheDocument();

    // Total should update (150.00)
    // There are multiple places with $150.00, we'll check broadly
    expect(screen.getAllByText(/\$150\.00/i).length).toBeGreaterThan(0);

    // Check if inputs are cleared
    expect(nameInput.value).toBe('');
    expect(amountInput.value).toBe('');
    expect(dateInput.value).toBe('');
  });

  it('calculates correct totals with multiple transactions', () => {
    const { container } = render(<Input />);
    if(!document.body.contains(container)) document.body.appendChild(container);

    const nameInput = document.querySelector('#name-input');
    const amountInput = document.querySelector('#amount-input');
    const dateInput = document.querySelector('#date-input');
    const button = screen.getByText(/Initialize Entry/i);

    // Add Income
    fireEvent.change(nameInput, { target: { value: 'Salary' } });
    fireEvent.change(amountInput, { target: { value: '500' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-01' } });
    fireEvent.click(button);

    // Add Expense
    fireEvent.change(nameInput, { target: { value: 'Groceries' } });
    fireEvent.change(amountInput, { target: { value: '-150' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-05' } });
    fireEvent.click(button);

    // The list should display both
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();

    // NET INFLOW: +$500.00
    // We expect there's at least one match for +$500.00 (the text might be spread out in elements)
    expect(screen.getAllByText(/\+\$500\.00/i).length).toBeGreaterThan(0);

    // NET OUTFLOW: -$150.00
    expect(screen.getAllByText(/\-\$150\.00/i).length).toBeGreaterThan(0);

    // CORE ASSET STATUS (Balance): $350.00
    // Check for the 350.00 text, it might not have exactly '$' attached in the same node depending on structure
    expect(screen.getByText(/\$350\.00/i)).toBeInTheDocument();
  });

  it('handles default values when inputs are empty or invalid', () => {
    const { container } = render(<Input />);
    if(!document.body.contains(container)) document.body.appendChild(container);

    const button = screen.getByText(/Initialize Entry/i);

    // Click without filling any inputs
    fireEvent.click(button);

    // Default name is "default-transaction"
    expect(screen.getByText('default-transaction')).toBeInTheDocument();

    // Default amount is 0.00
    // We can check there's a new entry that has 0.00 amount
    // NET INFLOW and NET OUTFLOW will be 0.00
    expect(screen.getAllByText(/\$0\.00/i).length).toBeGreaterThan(0);

    // Default date is today's date formatted as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    expect(screen.getByText(today)).toBeInTheDocument();
  });

  it('deletes a transaction properly', () => {
    const { container } = render(<Input />);
    if(!document.body.contains(container)) document.body.appendChild(container);

    const nameInput = document.querySelector('#name-input');
    const amountInput = document.querySelector('#amount-input');
    const button = screen.getByText(/Initialize Entry/i);

    // Add a transaction
    fireEvent.change(nameInput, { target: { value: 'To Be Deleted' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(button);

    // Verify it's there
    expect(screen.getByText('To Be Deleted')).toBeInTheDocument();
    expect(screen.queryByText(/No sector activity detected/i)).not.toBeInTheDocument();

    // Find and click the delete button (trash icon button)
    // The button has aria-label="Delete Entry" in DisplaySec2
    const deleteButton = screen.getByLabelText('Delete Entry');
    fireEvent.click(deleteButton);

    // Verify it's gone
    expect(screen.queryByText('To Be Deleted')).not.toBeInTheDocument();
    expect(screen.getByText(/No sector activity detected/i)).toBeInTheDocument();
  });
});
