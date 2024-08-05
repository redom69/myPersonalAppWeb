import { render } from '@testing-library/react';

import GraphScore from './graph-score';

describe('GraphScore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GraphScore updateResize={false} data={undefined} options={undefined} />
    );
    expect(baseElement).toBeTruthy();
  });
});
