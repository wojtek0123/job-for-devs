import { gql } from '@apollo/client';
import { Offer, Application } from '@prisma/client';
import { Context } from './context';

import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    // return value.getTime(); // Convert outgoing Date to integer for JSON
    const date = new Date(value);
    return date.toISOString();
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const typeDefs = gql`
  scalar Date

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
    createdAt: Date
    updatedAt: Date
    userId: String
  }

  type Application {
    id: String
    name: String
    email: String
    message: String
    offer: Offer
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
    offer(offerId: String): Offer
    userId(email: String): User
    applications(userId: String): [Application]
    postedOffersByUser(userId: String): [Offer]
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
      createdAt: Date
    ): Offer
    apply(
      email: String
      name: String
      message: String
      offerId: String
      userId: String
    ): Application
    changeName(userId: String, name: String): User
    deleteOffer(id: String): Offer
  }
`;

export const resolvers = {
  Query: {
    offers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.offer.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    offer: (_parent: any, args: { offerId: string }, context: Context) => {
      return context.prisma.offer.findUnique({
        where: { id: args.offerId },
        select: {
          userId: true,
        },
      });
    },
    userId: (_parent: any, args: { email: string }, context: Context) => {
      return context.prisma.user.findUnique({ where: { email: args.email } });
    },
    applications: (
      _parent: any,
      args: { userId: string },
      context: Context
    ) => {
      return context.prisma.application.findMany({
        where: { userId: args.userId },
        select: {
          id: true,
          offer: {
            select: {
              id: true,
              city: true,
              companyName: true,
              exactSalary: true,
              jobTitle: true,
              createdAt: true,
              location: true,
              maxSalary: true,
              minSalary: true,
              category: true,
              technologies: true,
              typeOfDayJob: true,
              seniority: true,
            },
          },
        },
      });
    },
    postedOffersByUser: (
      _parent: any,
      args: { userId: string },
      context: Context
    ) => {
      return context.prisma.offer.findMany({
        where: { userId: args.userId },
        select: {
          id: true,
          city: true,
          companyName: true,
          exactSalary: true,
          jobTitle: true,
          createdAt: true,
          location: true,
          maxSalary: true,
          minSalary: true,
          technologies: true,
          category: true,
          typeOfDayJob: true,
          seniority: true,
        },
      });
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
    changeName: (
      _parent: any,
      args: { userId: string; name: string },
      context: Context
    ) => {
      return context.prisma.user.update({
        where: { id: args.userId },
        data: { name: args.name },
      });
    },
    deleteOffer: (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.offer.delete({
        where: { id: args.id },
        include: {
          application: true,
        },
      });
    },
  },
};
