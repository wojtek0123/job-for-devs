import { screen, render } from '@testing-library/react';
import NewOfferHeader from 'components/layouts/NewOfferHeader';
import '@testing-library/jest-dom';

describe('New offer header component', () => {
  it('should render correctly', () => {
    render(<NewOfferHeader />);
    const title = screen.getByRole('heading', { name: /job for devs/i });
    expect(title).toBeInTheDocument();

    const stepNumber = screen.getByText(/1/);
    expect(stepNumber).toBeInTheDocument();

    const stepInformation = screen.getByRole('button', {
      name: /opis oferty/i,
    });
    expect(stepInformation).toBeInTheDocument();
  });
});
