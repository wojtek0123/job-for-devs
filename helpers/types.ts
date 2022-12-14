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
  Obligation = 'obligations',
  Requirements = 'requirements',
  Advantages = 'advantages',
  CompanyName = 'companyName',
  City = 'city',
  Street = 'street',
  BuildingNumber = 'building',
  HouseNumber = 'house',
}

export interface OfferDataDetails {
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
  createdAt: string;
}

export interface OfferData {
  [index: string]: string | string[];
  id: string;
  city: string;
  companyName: string;
  exactSalary: string;
  jobTitle: string;
  createdAt: string;
  location: string;
  maxSalary: string;
  minSalary: string;
  technologies: string[];
  typeOfDayJob: string;
  seniority: string;
  category: string;
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

export interface INotification {
  message: string;
  isError: boolean;
}

export interface IUserID {
  userId: {
    id: string;
  };
}
