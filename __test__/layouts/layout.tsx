import { screen, render } from '@testing-library/react';
import Layout from 'components/layouts/layout';

describe('layout component', () => {
  it('should render "main" header correctly', () => {
    render(<Layout children={<></>} typeHeader={'main'} />);
    const loginText = screen.getByText(/zaloguj/i);
    expect(loginText).toBeInTheDocument();

    const firstStep = screen.queryByRole('button', { name: /szczegóły/i });
    expect(firstStep).not.toBeInTheDocument();
  });

  it('should render "new-offer" header correctly', () => {
    render(<Layout children={<></>} typeHeader={'main'} />);
    const firstStep = screen.getByRole('button', { name: /szczegóły/i });
    expect(firstStep).toBeInTheDocument();

    const loginText = screen.queryByText(/zaloguj/i);
    expect(loginText).not.toBeInTheDocument();
    const logoutText = screen.queryByText(/wyloguj/i);
    expect(logoutText).not.toBeInTheDocument();
  });
});
