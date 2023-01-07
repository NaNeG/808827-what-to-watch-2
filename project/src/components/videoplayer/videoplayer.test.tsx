import { render } from '@testing-library/react';
import Videoplayer from './videoplayer';

describe('videoplayer tests', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should play when data is loaded', async () => {
    render(
      <Videoplayer
        poster=''
        videoLink=''
      />,
    );

    await new Promise((r) => setTimeout(r, 1000));

    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });
});
