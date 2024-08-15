import { render } from '@testing-library/react';

import AccountNotYetActivated from './anya';

describe('AccountNotYetActivated', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AccountNotYetActivated is_active={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
