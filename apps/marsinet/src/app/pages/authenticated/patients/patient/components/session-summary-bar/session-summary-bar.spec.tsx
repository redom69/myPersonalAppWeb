import { render } from '@testing-library/react';

import SessionSummaryBar from './session-summary-bar';

describe('SessionSummaryBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SessionSummaryBar
        total_sessions={0}
        total_steps={0}
        total_time={0}
        average_steps_session={0}
        average_time_session={0}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
