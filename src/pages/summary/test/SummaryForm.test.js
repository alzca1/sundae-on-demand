import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('Summary form enables button when acceptance checkbox is ticked', () => {
  test('A checkbox is present and is unchecked by default', () => {
    render(<SummaryForm />);

    const acceptanceCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

    expect(acceptanceCheckbox).not.toBeChecked();
  });

  test('A button is present but is disabled by default', () => {
    render(<SummaryForm />);
    const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
    expect(confirmOrderButton).toBeDisabled();
  });

  test('A checkbox gets ticked when clicking on it', async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const acceptanceCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

    expect(acceptanceCheckbox).not.toBeChecked();

    await user.click(acceptanceCheckbox);

    expect(acceptanceCheckbox).toBeChecked();
  });

  test('When the unchecked checkbox is ticked, the button gets enabled and viceversa', async () => {
    render(<SummaryForm />);

    const acceptanceCheckbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
    const confirmOrderButton = screen.getByRole('button', { name: 'Confirm order' });

    expect(acceptanceCheckbox).not.toBeChecked();
    expect(confirmOrderButton).toBeDisabled();

    await userEvent.click(acceptanceCheckbox);

    expect(acceptanceCheckbox).toBeChecked();
    expect(confirmOrderButton).toBeEnabled();

    await userEvent.click(acceptanceCheckbox);

    expect(confirmOrderButton).toBeDisabled();
  });

  test('Popover responds to hover', async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    // popover starts out hidden
    // Este es un test negativo, dado que si no codificamos nada el test va a salir
    // siempre como "passed".
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
    // al tratarse de un test negativo, vamos a probar que el test falla mediante
    // la aserción de que nullPopover debería aparecer en el documento:
    // => => => expect(nullPopover).toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    // el popover debería aparecer cuando pasemos el ratón por encima de los
    // "terms and conditions". Vamos a capturar ese elemento en una constante y lo vamos
    // a usar para nuestra aserción

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    user.hover(termsAndConditions);

    // definimos de nuevo el popover dado que esta vez ya no será null. Lo capturamos
    // mediante getByText dado que esperamos que esta vez la query no venga vacía.
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();
    // popover dissapears when we mouse out

    user.unhover(popover);

    // en este punto, dado que el evento de hover/unhover tendrá un comportamiento asíncrono (que
    // hemos reflejado al inicio del test incluyendo async a la función flecha), vamos a usar
    // el método de testing-library waitForElementToBeRemoved() en vez de usar el expect.not.ToBeInTheDocument

    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
  });
});
