import { gql } from '@apollo/client';

export const GET_OFFERS = gql`
  query Offers {
    offers {
      id
      city
      companyName
      exactSalary
      jobTitle
      createdAt
      location
      maxSalary
      minSalary
      technologies
      typeOfDayJob
      seniority
    }
  }
`;

export const GET_USER_ID = gql`
  query UserId($email: String) {
    userId(email: $email) {
      id
    }
  }
`;

export const ADD_OFFER = gql`
  mutation AddOffer(
    $category: String
    $location: String
    $jobTitle: String
    $companyName: String
    $typeOfDayJob: String
    $seniority: String
    $street: String
    $building: String
    $house: String
    $city: String
    $minSalary: String
    $maxSalary: String
    $exactSalary: String
    $technologies: [String]
    $description: String
    $obligations: String
    $requirements: String
    $advantages: String
    $benefits: String
    $userId: String
  ) {
    addOffer(
      category: $category
      location: $location
      jobTitle: $jobTitle
      companyName: $companyName
      typeOfDayJob: $typeOfDayJob
      seniority: $seniority
      street: $street
      building: $building
      house: $house
      city: $city
      minSalary: $minSalary
      maxSalary: $maxSalary
      exactSalary: $exactSalary
      technologies: $technologies
      description: $description
      obligations: $obligations
      requirements: $requirements
      advantages: $advantages
      benefits: $benefits
      userId: $userId
    ) {
      id
    }
  }
`;

export const ADD_APPLICATION = gql`
  mutation Apply(
    $email: String
    $name: String
    $message: String
    $userId: String
    $offerId: String
  ) {
    apply(
      email: $email
      name: $name
      message: $message
      userId: $userId
      offerId: $offerId
    ) {
      id
    }
  }
`;

export const EDIT_NAME = gql`
  mutation ChangeName($userId: String, $name: String) {
    changeName(userId: $userId, name: $name) {
      name
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation DeleteOffer($id: String) {
    deleteOffer(id: $id) {
      id
    }
  }
`;
