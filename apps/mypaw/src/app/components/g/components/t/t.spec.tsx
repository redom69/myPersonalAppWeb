import { render } from '@testing-library/react';

import GraphTime from './t';

describe('GraphTime', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphTime updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
