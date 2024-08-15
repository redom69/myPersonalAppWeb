import { render } from '@testing-library/react';

import ModalAddClinic from './mac';

describe('ModalAddClinic', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ModalAddClinic
        visible={false}
        setVisible={function (visible: boolean): void {
          throw new Error('Function not implemented.');
        }}
        functionCreateClinic={function (values): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
