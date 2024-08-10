import { render } from '@testing-library/react';

import GraphSteps from './graph-steps';

describe('GraphSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphSteps updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
