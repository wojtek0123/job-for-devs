import '@testing-library/jest-dom';
import { render, screen } from './test-utils';
import DisplayOffers from 'components/display-offers/DisplayOffers';

describe('DisplayOffers component', () => {
  it('should render "Brak ofert do wyświetlenia"', () => {
    render(
      <DisplayOffers
        offers={[]}
        error={undefined}
        loading={false}
        showUtilities={false}
      />
    );
    const heading = screen.getByText('Brak ofert do wyświetlenia');
    expect(heading).toBeInTheDocument();
  });

  it('should render an error', () => {
    render(
      <DisplayOffers
        offers={[]}
        error={new Error('Something went wrong')}
        loading={false}
        showUtilities={false}
      />
    );

    const errorMessage = screen.getByText(
      'Przepraszamy za problemy! Błąd przy wczytywaniu danych.'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render loading skeleton', () => {
    render(
      <DisplayOffers
        offers={[]}
        error={undefined}
        loading={true}
        showUtilities={false}
      />
    );

    const skeleton = screen.getByTestId('skeleton1');

    expect(skeleton).toBeInTheDocument();
  });

  it('should render a offer', () => {
    const offer = [
      {
        id: '1',
        city: 'Warszawa',
        companyName: 'Frontenders',
        exactSalary: '10000',
        jobTitle: 'Junior Frontend Developer',
        createdAt: '',
        location: 'stacjonarnie',
        maxSalary: '',
        minSalary: '',
        technologies: ['typescript', 'react', 'angular'],
        typeOfDayJob: 'pełny etat',
        seniority: 'junior',
        category: 'frontend',
      },
    ];

    render(
      <DisplayOffers
        offers={offer}
        error={undefined}
        loading={false}
        showUtilities={false}
      />
    );

    const jobTitle = screen.getByText('Junior Frontend Developer');
    expect(jobTitle).toBeInTheDocument();
  });

  // it('should render utilities', () => {
  //   const offer = [
  //     {
  //       id: '1',
  //       city: 'Warszawa',
  //       companyName: 'Frontenders',
  //       exactSalary: '10000',
  //       jobTitle: 'Junior Frontend Developer',
  //       createdAt: '',
  //       location: 'stacjonarnie',
  //       maxSalary: '',
  //       minSalary: '',
  //       technologies: ['typescript', 'react', 'angular'],
  //       typeOfDayJob: 'pełny etat',
  //       seniority: 'junior',
  //       category: 'frontend',
  //     },
  //   ];

  //   render(
  //     <DisplayOffers
  //       offers={offer}
  //       error={undefined}
  //       loading={false}
  //       showUtilities={true}
  //     />
  //   );

  //   const buttonTitle = screen.getByTitle(/usuń/i);
  //   expect(buttonTitle).toBeInTheDocument();
  // });
});
