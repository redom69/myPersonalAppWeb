import { render } from '@testing-library/react';

import IncidentReport from './incident-report';

describe('IncidentReport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IncidentReport />);
    expect(baseElement).toBeTruthy();
  });
});
