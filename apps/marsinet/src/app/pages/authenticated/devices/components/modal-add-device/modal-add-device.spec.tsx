import { render } from '@testing-library/react';

import ModalAddDevice from './modal-add-device';

describe('ModalAddDevice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ModalAddDevice
        visible={false}
        setVisible={function (visible: boolean): void {
          throw new Error('Function not implemented.');
        }}
        createDeviceFunction={function (values): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
