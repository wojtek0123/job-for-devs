export enum Offer {
  Category = 'category',
  Technologies = 'technologies',
  MinSalary = 'minSalary',
  MaxSalary = 'maxSalary',
  ExactSalary = 'exactSalary',
  Location = 'location',
  TypeOfDayJob = 'typeOfDayJob',
  Seniority = 'seniority',
  Benefits = 'benefits',
  JobTitle = 'jobTitle',
  Description = 'description',
  Obligation = 'obligation',
  Requirements = 'requirements',
  Advantages = 'advantages',
  CompanyName = 'companyName',
  City = 'city',
  Street = 'street',
  BuildingNumber = 'building',
  HouseNumber = 'house',
}

export interface OfferData {
  [index: string]: string | string[];
  id: string;
  category: string;
  technologies: string[];
  minSalary: string;
  maxSalary: string;
  exactSalary: string;
  location: string;
  typeOfDayJob: string;
  seniority: string;
  benefits: string;
  jobTitle: string;
  description: string;
  obligations: string;
  requirements: string;
  advantages: string;
  companyName: string;
  city: string;
  street: string;
  building: string;
  house: string;
}

export interface FormData {
  [index: string]: string | string[];
  category: string;
  technologies: string[];
  minSalary: string;
  maxSalary: string;
  exactSalary: string;
  location: string;
  typeOfDayJob: string;
  seniority: string;
  benefits: string;
  jobTitle: string;
  description: string;
  obligations: string;
  requirements: string;
  advantages: string;
  companyName: string;
  city: string;
  street: string;
  building: string;
  house: string;
}

export interface SecondStepError {
  [index: string]: string;
  obligations: string;
  requirements: string;
}

export interface FirstStepError {
  [index: string]: string;
  category: string;
  technologies: string;
  minSalary: string;
  location: string;
  seniority: string;
  jobTitle: string;
}

export interface ThirdStepError {
  [index: string]: string;
  companyName: string;
  city: string;
  street: string;
  building: string;
}
