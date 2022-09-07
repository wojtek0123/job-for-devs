import { gql } from '@apollo/client';
import { Offer, Application } from '@prisma/client';
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

  type Application {
    id: String
    name: String
    email: String
    message: String
  }

  type User {
    id: String
    name: String
    email: String
    offers: [Offer]
    applications: [Application]
  }

  type Query {
    offers: [Offer]
    userId(email: String): User
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
      userId: String
    ): Offer
    apply(
      email: String
      name: String
      message: String
      offerId: String
      userId: String
    ): Application
  }
`;

export const resolvers = {
  Query: {
    offers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.offer.findMany();
    },
    userId: (_parent: any, args: { email: string }, context: Context) => {
      return context.prisma.user.findUnique({ where: { email: args.email } });
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
          userId: args.userId,
        },
      });
    },
    apply: (_parent: any, args: Application, context: Context) => {
      return context.prisma.application.create({
        data: {
          email: args.email,
          name: args.name,
          message: args.message,
          offerId: args.offerId,
          userId: args.userId,
        },
      });
    },
  },
};
