import { render } from '@testing-library/react';

import ContainerForGraphics from './g';

describe('ContainerForGraphics', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ContainerForGraphics
        updateResize={false}
        dataStepsDistribution={undefined}
        optionsStepsDistribution={undefined}
        dataTimeDistribution={undefined}
        optionsTimeDistribution={undefined}
        dataScore={undefined}
        optionsScore={undefined}
        dataStepsDirection={undefined}
        optionsStepsDirection={undefined}
        dataStepsMode={undefined}
        optionsStepsMode={undefined}
        dataTimeDirection={undefined}
        optionsTimeDirection={undefined}
        dataTimeMode={undefined}
        optionsTimeMode={undefined}
        dataCadenceDirection={undefined}
        optionsCadenceDirection={undefined}
        dataCadenceMode={undefined}
        optionsCadenceMode={undefined}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
