import { render } from '@testing-library/react';

import GraphCadence from './c';

describe('GraphCadence', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphCadence updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
