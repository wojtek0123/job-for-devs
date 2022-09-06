import { gql } from '@apollo/client';

export const GET_OFFERS = gql`
  query Offers {
    offers {
      id
      city
      companyName
      exactSalary
      jobTitle
      location
      maxSalary
      minSalary
      technologies
      typeOfDayJob
      seniority
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
    ) {
      id
      advantages
      benefits
      building
      category
      city
      companyName
      description
      exactSalary
      house
      jobTitle
      location
      maxSalary
      minSalary
      obligations
      requirements
      seniority
      street
      technologies
      typeOfDayJob
    }
  }
`;
