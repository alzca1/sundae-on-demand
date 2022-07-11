import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../../entry/OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

/* Lo que vamos a hacer es construir un test con 
llamadas al mock server que van a dar un error
500 y que por tanto van a activar la aparición
de alerts */

test('handles error for scoops and topping routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
