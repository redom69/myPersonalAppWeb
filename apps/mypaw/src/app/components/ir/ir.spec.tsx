import { render } from '@testing-library/react';

import IncidentReport from './ir';

describe('IncidentReport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IncidentReport />);
    expect(baseElement).toBeTruthy();
  });
});
