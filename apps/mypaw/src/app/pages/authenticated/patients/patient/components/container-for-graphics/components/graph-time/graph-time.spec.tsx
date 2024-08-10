import { render } from '@testing-library/react';

import GraphTime from './graph-time';

describe('GraphTime', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphTime updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
