import { render } from '@testing-library/react';

import AddDeviceToInstitution from './add-device-to-institution';

describe('AddDeviceToInstitution', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddDeviceToInstitution
        visible={false}
        setVisible={function (visible: boolean): void {
          throw new Error('Function not implemented.');
        }}
        addDeviceToInstitutionFunction={function (values): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
