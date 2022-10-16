import { render, screen } from '../test-utils';
import ComapnyInfo from 'components/offer-form/CompanyInfo';

const formData = {
  category: '',
  technologies: [],
  minSalary: '',
  maxSalary: '',
  exactSalary: '',
  location: '',
  typeOfDayJob: '',
  seniority: '',
  benefits: '',
  jobTitle: '',
  description: '',
  obligations: '',
  requirements: '',
  advantages: '',
  companyName: 'Frontend devs',
  city: 'warszawa',
  street: '',
  building: '',
  house: '',
};

describe('Company info component', () => {
  it('should have company name "Frontend devs"', () => {
    render(<ComapnyInfo formData={formData} onThirdStep={jest.fn()} />);
    const inputLabel = screen.getByLabelText(/nazwa firmy/i);
    expect(inputLabel).toHaveValue('Frontend devs');
  });

  it('should have button have class "bg-green-500"', () => {
    render(<ComapnyInfo formData={formData} onThirdStep={jest.fn()} />);
    const button = screen.getByRole('button', { name: /warszawa/i });
    expect(button).toHaveClass('bg-green-500');
  });
});
