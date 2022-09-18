import { screen, render } from '@testing-library/react';
import DisplayAsTextOrList from 'components/offer-details/DisplayAsTextOrList';
import '@testing-library/jest-dom';

describe('Display as text or list component', () => {
  it('should render string correctly', () => {
    render(<DisplayAsTextOrList text='Everything' />);
    const message = screen.getByText(/everything/i);
    expect(message).toBeInTheDocument();
  });

  it('should render list correctly', () => {
    render(<DisplayAsTextOrList text={`Everything \n is fine \n !`} />);
    const message = screen.getAllByRole('listitem');
    expect(message[0]).toBeInTheDocument();
  });
});
