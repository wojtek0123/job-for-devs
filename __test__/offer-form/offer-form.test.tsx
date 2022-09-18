import { render, screen } from '../test-utils';
import OfferForm from 'components/offer-form/OfferForm';

describe('Offer form component', () => {
  it('should render "pole wymagane"', () => {
    render(<OfferForm onOffer={jest.fn()} />);
    const text = screen.getByText(/pole wymagane/i);
    expect(text).toBeInTheDocument();
  });
});
