import { gql } from '@apollo/client';
import { Offer } from '@prisma/client';
import { Context } from './context';

export const typeDefs = gql`
  type Offer {
    id: String
    category: String
    location: String
    jobTitle: String
    companyName: String
    typeOfDayJob: String
    seniority: String
    street: String
    building: String
    house: String
    city: String
    minSalary: String
    maxSalary: String
    exactSalary: String
    technologies: [String]
    description: String
    obligations: String
    requirements: String
    advantages: String
    benefits: String
  }

  type Query {
    offers: [Offer]
  }

  type Mutation {
    addOffer(
      category: String
      location: String
      jobTitle: String
      companyName: String
      typeOfDayJob: String
      seniority: String
      street: String
      building: String
      house: String
      city: String
      minSalary: String
      maxSalary: String
      exactSalary: String
      technologies: [String]
      description: String
      obligations: String
      requirements: String
      advantages: String
      benefits: String
    ): Offer
  }
`;

export const resolvers = {
  Query: {
    offers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.offer.findMany();
    },
  },
  Mutation: {
    addOffer: (_parent: any, args: Offer, context: Context) => {
      return context.prisma.offer.create({
        data: {
          category: args.category,
          location: args.location,
          jobTitle: args.jobTitle,
          companyName: args.companyName,
          typeOfDayJob: args.typeOfDayJob,
          seniority: args.seniority,
          street: args.street,
          building: args.building,
          house: args.house,
          city: args.city,
          minSalary: args.minSalary,
          maxSalary: args.maxSalary,
          exactSalary: args.exactSalary,
          technologies: args.technologies,
          description: args.description,
          obligations: args.obligations,
          requirements: args.requirements,
          advantages: args.advantages,
          benefits: args.benefits,
        },
      });
    },
  },
};
