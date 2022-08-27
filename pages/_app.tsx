import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
