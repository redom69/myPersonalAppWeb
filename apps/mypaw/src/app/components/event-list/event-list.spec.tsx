import { render } from '@testing-library/react';

import EventList from './event-list';

describe('EventList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EventList
        alarms={[]}
        setUpdateAlarms={function (update: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
