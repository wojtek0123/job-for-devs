export enum Offer {
  Category = 'category',
  Technologies = 'technologies',
  MinSalary = 'minSalary',
  MaxSalary = 'maxSalary',
  ExactSalary = 'exactSalary',
  Location = 'location',
  WorkingHour = 'workingHour',
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

export interface FormData {
  category: string;
  technologies: string[];
  minSalary: string;
  maxSalary: string;
  exactSalary: string;
  location: string;
  workingHour: string;
  seniority: string;
  benefits: string;
  jobTitle: string;
  description: string;
  obligation: string;
  requirements: string;
  advantages: string;
  companyName: string;
  city: string;
  street: string;
  building: string;
  house: string;
}

export interface SecondStepError {
  obligation: string;
  requirements: string;
}

export interface FirstStepError {
  category: string;
  technologies: string;
  minSalary: string;
  location: string;
  seniority: string;
  jobTitle: string;
}

export interface ThirdStepError {
  companyName: string;
  city: string;
  street: string;
  building: string;
}
