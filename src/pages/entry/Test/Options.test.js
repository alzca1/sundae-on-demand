import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  // renderizamos el componente <Options /> con la prop
  // optionType que será igual a "scoops"
  render(<Options optionType='scoops' />);

  // seleccionamos todas las imágenes cuyo nombre contenga la palabra
  // "scoop"
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  // hacemos una aserción de que el array de imágenes tenga una longitud
  // de 2 elementos (el número de bolas diferentes que tenemos configurado
  // en el mock server)
  expect(scoopImages).toHaveLength(2);

  // mapeamos scoopImages para que nos devuelva un array con los
  // elementos que contengan la propiedad "alt"
  const altText = scoopImages.map((element) => element.alt);
  // hacemos una aserción para comprobar que el array resultante
  // de altText contiene la estructura que describimos debajo de
  // estas líneas.
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType='toppings' />);

  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });

  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
