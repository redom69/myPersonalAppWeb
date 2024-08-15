import { render } from '@testing-library/react';

import GraphDistributionSteps from './gds';

describe('GraphDistributionSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphDistributionSteps
        updateResize={false}
        data={undefined}
        options={undefined}
        languageChanged={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
