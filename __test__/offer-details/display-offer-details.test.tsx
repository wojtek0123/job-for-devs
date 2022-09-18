import { render, screen } from '@testing-library/react';
import DisplayOfferDetails from 'components/offer-details/DisplayOfferDetails';
import '@testing-library/jest-dom';

const offer1 = {
  id: '1',
  category: 'frontend',
  technologies: ['typescript', 'react'],
  minSalary: '6000',
  maxSalary: '9000',
  exactSalary: '',
  location: 'stacjonarnie',
  typeOfDayJob: 'pełny etat',
  seniority: 'regular',
  benefits: '',
  jobTitle: 'Regular Frontend Developer',
  description: '',
  obligations: 'obligations',
  requirements: 'requirements',
  advantages: 'advantages',
  companyName: 'Coders',
  city: 'Warszawa',
  street: 'Mickiewicza',
  building: '102',
  house: '',
  createdAt: '2022.06.30T14:00:00UTCZ',
};

const offer2 = {
  id: '2',
  category: 'frontend',
  technologies: ['typescript', 'react'],
  minSalary: '',
  maxSalary: '',
  exactSalary: '12000',
  location: 'stacjonarnie',
  typeOfDayJob: 'pełny etat',
  seniority: 'regular',
  benefits: '',
  jobTitle: 'Regular Frontend Developer',
  description: '',
  obligations: 'obligations',
  requirements: 'requirements',
  advantages: 'advantages',
  companyName: 'Coders',
  city: 'Warszawa',
  street: 'Mickiewicza',
  building: '102',
  house: '54',
  createdAt: '2022.06.30T14:00:00UTCZ',
};

describe('Display offer details component', () => {
  it('should render "return button"', () => {
    render(<DisplayOfferDetails offer={offer1} review={false} />);
    const buttonText = screen.getByRole('button', { name: /powrót/i });
    expect(buttonText).toBeInTheDocument();
  });

  it('should NOT render "return button"', () => {
    render(<DisplayOfferDetails offer={offer1} review={true} />);
    const buttonText = screen.queryByText(/powrót/i);
    expect(buttonText).not.toBeInTheDocument();
  });

  it('shoud render "minSalary - maxSalary"', () => {
    render(<DisplayOfferDetails offer={offer1} review={false} />);
    const text = screen.getByText(/6000 - 9000 PLN/i);
    expect(text).toBeInTheDocument();
  });

  it('shoud render "exactSalary"', () => {
    render(<DisplayOfferDetails offer={offer2} review={false} />);
    const text = screen.getByText('12000 PLN');
    expect(text).toBeInTheDocument();
  });

  it('should render correctly', () => {
    render(<DisplayOfferDetails offer={offer1} review={false} />);
    const heading = screen.getByRole('heading', {
      name: /regular frontend developer/i,
    });
    expect(heading).toBeInTheDocument();

    const altText = screen.getByAltText(
      /Grupa pracownika myśli razem jak rozwiązać problem/i
    );
    expect(altText).toBeInTheDocument();
  });

  it('should redner "buildingNumber/houseNumber"', () => {
    render(<DisplayOfferDetails offer={offer2} review={false} />);
    const address = screen.getByText(/102\/54/);
    expect(address).toBeInTheDocument();
  });

  it('should render "buildingNumber"', () => {
    render(<DisplayOfferDetails offer={offer1} review={false} />);
    const address = screen.getByText(/102/);
    expect(address).toBeInTheDocument();
  });
});
