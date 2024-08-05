import { render } from '@testing-library/react';

import AccountNotYetActivated from './account-not-yet-activated';

describe('AccountNotYetActivated', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AccountNotYetActivated is_active={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
