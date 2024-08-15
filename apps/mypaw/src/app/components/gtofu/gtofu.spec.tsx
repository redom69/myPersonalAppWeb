import { render } from '@testing-library/react';

import GraphTimeOfUse from './graph-time-of-use';

describe('GraphTimeOfUse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphTimeOfUse
        updateResize={false}
        data={undefined}
        options={undefined}
        languageChanged={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
