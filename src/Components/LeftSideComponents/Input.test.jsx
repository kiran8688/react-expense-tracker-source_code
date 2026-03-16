import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('renders empty tracker UI when no transactions exist', () => {
    render(<Input />);

    // The initial state of tracker is [], so it should display the empty state message
    const emptyStateMessage = screen.getByText(/Currently no transaction Recorded/i);
    expect(emptyStateMessage).toBeInTheDocument();
  });
});
