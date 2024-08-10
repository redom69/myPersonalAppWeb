import { render } from '@testing-library/react';

import GraphCadence from './graph-cadence';

describe('GraphCadence', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphCadence updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
