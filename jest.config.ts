import { getJestProjects } from '@nx/jest';

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // otras configuraciones globales...
  projects: getJestProjects(),
};
