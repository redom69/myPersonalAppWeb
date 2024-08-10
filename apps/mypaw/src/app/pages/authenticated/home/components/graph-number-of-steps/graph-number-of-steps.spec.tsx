import { render } from '@testing-library/react';

import GraphNumberOfSteps from './graph-number-of-steps';

describe('GraphNumberOfSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphNumberOfSteps
        updateResize={false}
        data={undefined}
        options={undefined}
        languageChanged={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
