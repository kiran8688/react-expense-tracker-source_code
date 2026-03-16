import React from 'react';
import { render } from '@testing-library/react';
import DisplaySec1 from './DisplaySec1';
import '@testing-library/jest-dom';

describe('DisplaySec1', () => {
  it('renders positive balance correctly', () => {
    const { container } = render(<DisplaySec1 dispBalAmt={100} Income={200} Expense={100} />);

    // Check positive balance text
    expect(container).toHaveTextContent('$100');

    // With the new Expense Tracker Pro design, balance element has ID 'balance-amount' and no longer uses .text-neon-blue
    const balanceElement = container.querySelector('#balance-amount');
    expect(balanceElement).toBeInTheDocument();
    expect(balanceElement.textContent).toBe('$100.00');
  });

  it('renders negative balance correctly', () => {
    const { container } = render(<DisplaySec1 dispBalAmt={-50.5} Income={50} Expense={100.5} />);

    // With the new Expense Tracker Pro design, balance element has ID 'balance-amount' and no longer uses .text-neon-pink
    const balanceElement = container.querySelector('#balance-amount');
    expect(balanceElement).toBeInTheDocument();
    expect(balanceElement.textContent).toBe('-$50.50');
  });
});
