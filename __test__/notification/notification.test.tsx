import { screen, render } from '@testing-library/react';
import Notification from 'components/notification/Notification';
import '@testing-library/jest-dom';

describe('Notification component', () => {
  it('should render error message correctly', () => {
    render(
      <Notification message='Something went wrong' isError={true} show={true} />
    );
    const message = screen.getByText(/something went wrong/i);
    expect(message).toHaveClass('bg-red-500');
  });

  it('should render NOT error message correctly', () => {
    render(
      <Notification message='Everything is fine' isError={false} show={true} />
    );
    const message = screen.getByText(/Everything is fine/i);
    expect(message).toHaveClass('bg-green-500');
  });

  it('should NOT render', () => {
    render(
      <Notification
        message='Something went wrong'
        isError={true}
        show={false}
      />
    );
    const message = screen.queryByText(/something went wrong/i);
    expect(message).not.toBeInTheDocument();
  });
});
