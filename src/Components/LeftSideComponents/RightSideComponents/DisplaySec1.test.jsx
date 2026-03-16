import React from 'react';
import { render } from '@testing-library/react';
import DisplaySec1 from './DisplaySec1';
import '@testing-library/jest-dom';

describe('DisplaySec1', () => {
  it('renders positive balance correctly', () => {
    const { container } = render(<DisplaySec1 dispBalAmt={100} Income={200} Expense={100} />);

    // Check positive balance text
    expect(container).toHaveTextContent('$100');

    // Check positive balance class
    // Based on the code in the file:
    // <div className={`... ${isPositive ? 'text-neon-blue shadow-neon-blue' : 'text-neon-pink shadow-neon-pink'}`}>
    const balanceElement = container.querySelector('.text-neon-blue');
    expect(balanceElement).toBeInTheDocument();
  });

  it('renders negative balance correctly', () => {
    const { container } = render(<DisplaySec1 dispBalAmt={-50.5} Income={50} Expense={100.5} />);

    // Check negative balance text
    // Based on the code in the file:
    // {isPositive ? '' : '-'}${Math.abs(this.props.dispBalAmt).toFixed(2)}
    // -> -$50.50
    expect(container).toHaveTextContent('-$50.50');

    // Check negative balance class
    // Based on the code in the file:
    // <div className={`... ${isPositive ? 'text-neon-blue shadow-neon-blue' : 'text-neon-pink shadow-neon-pink'}`}>
    const balanceElement = container.querySelector('.text-neon-pink');
    expect(balanceElement).toBeInTheDocument();
  });
});
