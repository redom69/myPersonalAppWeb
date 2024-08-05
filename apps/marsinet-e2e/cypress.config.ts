import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { prisma } from '@marsinet/server';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on, config) {
      // Consolidate task handlers into one `on('task', ...)` call
      on('task', {
        async deleteUser({ email }) {
          try {
            await prisma.user.delete({ where: { email } });
            return true;
          } catch (error) {
            console.error(`Failed to delete user: ${error.message}`);
            return false;
          }
        },
      });

      return config;
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'src/support/e2e.ts',
    fixturesFolder: 'src/fixtures',
    defaultCommandTimeout: 6000,
    pageLoadTimeout: 60000,
  },
  retries: {
    runMode: 2,
    openMode: 1,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    apiUrl: 'http://localhost:3334',
  },
  reporter: 'spec',
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  projectId: '7mua5v',
});
