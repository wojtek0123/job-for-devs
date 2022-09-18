import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Capsules from 'components/capsules/Capsules';

const array = ['JavaScript'];
const selectedItem = '';

describe('capsules component', () => {
  it('should display correct one capsule', () => {
    render(
      <Capsules array={array} selectedItem={selectedItem} onClick={jest.fn()} />
    );
    const capsuleText = screen.getByRole('button', {
      name: /javascript/i,
    });
    expect(capsuleText).toBeInTheDocument();
  });

  it('should render nothing', () => {
    render(<Capsules array={[]} selectedItem={''} onClick={jest.fn()} />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
