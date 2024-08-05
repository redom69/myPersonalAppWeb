import { render } from '@testing-library/react';

import GraphNumbersOfSteps from './graph-numbers-of-steps';

describe('GraphNumbersOfSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphNumbersOfSteps
        updateResize={false}
        data={undefined}
        options={undefined}
        languageChanged={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
