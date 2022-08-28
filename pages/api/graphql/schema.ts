import { gql } from '@apollo/client';
import { Context } from './context';

export const typeDefs = gql`
  type Offer {
    id: String
  }

  type Query {
    offers: Offer
  }
`;
export const resolvers = {
  Query: {
    offers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.offer.findMany();
    },
  },
};
