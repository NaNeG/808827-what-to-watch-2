import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const {container} = render(<LoadingScreen />);

    expect(container.getElementsByClassName('wave').length).toBe(10);
  });
});
