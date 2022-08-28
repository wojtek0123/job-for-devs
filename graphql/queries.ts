import { gql } from '@apollo/client';

export const Get = gql`
  query Example {
    example {
      id
    }
  }
`;
