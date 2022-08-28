import { context } from './context';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { resolvers, typeDefs } from './schema';

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context,
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = { api: { bodyParser: false } };
