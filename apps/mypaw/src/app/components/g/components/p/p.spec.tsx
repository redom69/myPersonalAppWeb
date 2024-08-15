import { render } from '@testing-library/react';

import GraphScore from './p';

describe('GraphScore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphScore updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
