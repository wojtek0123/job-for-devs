import { screen, render } from '../test-utils';
import MainHeader from 'components/layouts/MainHeader';
import '@testing-library/jest-dom';

describe('main header component', () => {
  it('should render correctly', () => {
    render(<MainHeader />);
    const title = screen.getByRole('heading', { name: /job for devs/i });
    expect(title).toBeInTheDocument();

    const linkText = screen.getAllByRole('link', { name: /oferty/i });
    expect(linkText[0]).toBeInTheDocument();
    expect(linkText[1]).toBeInTheDocument();
  });

  it('should render "wyloguj" if the user is log in', () => {
		render(<MainHeader />);
		const buttonText = screen.getAllByRole('button', {name: /wyloguj/i})
		expect(buttonText[0]).toBeInTheDocument();
	})
});
