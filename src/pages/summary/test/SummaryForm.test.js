import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('Summary form enables button when acceptance checkbox is ticked', () => {
  test('A checkbox is present and is unchecked by default', () => {
    render(<SummaryForm />);

    const acceptanceCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

    expect(acceptanceCheckbox).not.toBeChecked();

    // fireEvent.click(acceptanceCheckbox);
  });

  test('A button is present but is disabled by default', () => {
    render(<SummaryForm />);
    const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
    expect(confirmOrderButton).toBeDisabled();
  });

  test('When the unchecked checkbox is ticked, the button gets enabled and viceversa', () => {
    render(<SummaryForm />);

    const acceptanceCheckbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
    const confirmOrderButton = screen.getByRole('button', { name: 'Confirm order' });

    expect(acceptanceCheckbox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();

    fireEvent.click(acceptanceCheckbox);

    expect(acceptanceCheckbox).toBeChecked();
    expect(confirmOrderButton).toBeEnabled();

    fireEvent.click(acceptanceCheckbox);

    expect(confirmOrderButton).toBeDisabled();
  });
});

describe
