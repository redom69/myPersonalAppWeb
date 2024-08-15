import { render } from '@testing-library/react';

import GraphNumbersOfSteps from './gnos';

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
