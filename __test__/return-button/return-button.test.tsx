import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReturnButton from 'components/return-button/ReturnButton';

describe('Return button component', () => {
	it('should render correctly', () => {
		render(<ReturnButton />);
		const spanText = screen.getByText(/powrót/i);
		expect(spanText).toBeInTheDocument();
	})
})