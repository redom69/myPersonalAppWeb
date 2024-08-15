import { render } from '@testing-library/react';

import GraphStepsDistribution from './graph-steps-distribution';

describe('GraphStepsDistribution', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphStepsDistribution
        updateResize={false}
        data={undefined}
        options={undefined}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
