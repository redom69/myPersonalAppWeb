import { render } from '@testing-library/react';

import GraphTimeOfUse from './gtofu';

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
