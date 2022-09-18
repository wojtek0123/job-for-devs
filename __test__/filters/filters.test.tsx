import { render, screen } from '../test-utils';
import Filters from 'components/filters/Filters';
import '@testing-library/jest-dom';

describe('Filters component', () => {
  it('should render "filtruj"', () => {
    render(<Filters />);
    const buttonText = screen.queryByText(/filtruj/i);
    expect(buttonText).toBeInTheDocument();
  });
});
