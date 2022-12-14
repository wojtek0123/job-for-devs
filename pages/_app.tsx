import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { FiltersContextProvider } from '../context/filters-context';
import { StepsContextProvider } from '../context/steps-context';

const client = new ApolloClient({
  uri: `${process.env.NEXTAUTH_URL ?? ''}/api/graphql`,
  cache: new InMemoryCache(),
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout): any {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <FiltersContextProvider>
          <StepsContextProvider>
            <>{getLayout(<Component {...pageProps} />)}</>
          </StepsContextProvider>
        </FiltersContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
