import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { FiltersContextProvider } from '../context/filters-context';
import { MockedProvider } from '@apollo/client/testing';
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom';

const logInUser = {
  user: {
    name: 'user',
    email: 'test@test.com',
    image: '',
  },
  accessToken: 'WEtad3AqOStDZDB9Pz50Yygsfg==',
  expires: '2032-09-20T20:00:00.UTCZ',
};

const AllTheProviders: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <SessionProvider session={logInUser}>
      <MockedProvider>
        <FiltersContextProvider>{children}</FiltersContextProvider>
      </MockedProvider>
    </SessionProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render };
