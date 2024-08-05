import { get_patients } from './patient';

describe('Patient workflow', () => {
  it('Should list patients', async () => {
    const patients = await get_patients();
    expect(patients).not.toBeNull();
    expect(patients).toHaveProperty('length');
  });
  it.todo('Should get patient by id');
  it.todo('Should create patient');
  it.todo('Should update patient');
  it.todo('Should delete patient');
  it.todo('Should list patient sessions');
  it.todo('Should get patient session by id');
});
