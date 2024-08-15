import { render } from '@testing-library/react';

import GraphStepsDistribution from './sd';

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
