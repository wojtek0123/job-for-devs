import {render, screen} from '@testing-library/react';
import ErrorMessage from 'components/offer-form/ErrorMessage';
import '@testing-library/jest-dom';

describe('Error message component', () => {
	it('should render "To pole jest wymagane"', () => {
		render(<ErrorMessage isVisible={true} expression='' />);
		const text = screen.getByText(/to pole jest wymagane/i);
		expect(text).toBeInTheDocument();
	})

	it('should render message which user provide', () => {
		render(<ErrorMessage message='Something went wrong' isVisible={true} expression='' />);
		const message = screen.getByText(/something went wrong/i);
		expect(message).toBeInTheDocument();
	})

	it('should render empty small tag with class text-red-600', () => {
		render(<ErrorMessage expression='' isVisible={false} />);
		const text = screen.queryByText(/to pole jest wymagane/i);
		expect(text).not.toBeInTheDocument();
	})
})