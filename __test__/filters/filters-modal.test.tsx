import { render, screen } from '../test-utils';
import '@testing-library/jest-dom';
import FiltersModal from 'components/filters/FiltersModal';

describe('filters modal', () => {
  it('should render correctly', () => {
    render(
      <div id='modal-root'>
        <FiltersModal show={true} close={jest.fn()} />
      </div>
    );
    const buttonText = screen.getByRole('button', { name: /wstecz/i });
    expect(buttonText).toBeInTheDocument();
  });

  it('should NOT render correctly', () => {
    render(
      <div id='modal-root'>
        <FiltersModal show={false} close={jest.fn()} />
      </div>
    );
    const buttonText = screen.queryByRole('button', { name: /wstecz/i });
    expect(buttonText).not.toBeInTheDocument();
  });
});
