import { render } from '@testing-library/react';

import GraphDistribution from './graph-distribution';

describe('GraphDistribution', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphDistribution
        updateResize={false}
        data={undefined}
        options={undefined}
        languageChanged={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
