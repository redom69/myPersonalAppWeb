# Marsinet

## Project Description

Marsinet is a virtual platform designed for collecting data from all MarsiBionics devices.

## Technologies Used

- **React** - [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Node.js** - [Node.js Documentation](https://nodejs.org/en/docs/)
- **TypeScript** - [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Prisma** - [Prisma Documentation](https://www.prisma.io/docs/)
- **NestJS** - [NestJS Documentation](https://docs.nestjs.com/)
- **NX** - [NX Documentation](https://nx.dev/)
- **PrimeReact** - Used for icons - [PrimeReact Documentation](https://www.primefaces.org/primereact/)

## Prerequisites

Before cloning and running the project, make sure you have the following tools installed:

- Node.js version 18+ - [Download Node.js](https://nodejs.org/)
- React version 18+

For more information on the required versions, check the `package.json` file.

## Installation Instructions

1. **Clone the repository**:

   ```sh
   git clone https://github.com/marsi-bionics/mn_monorepo.git
   ```

2. **Navigate to the project directory**:

   ```sh
   cd mn_monorepo
   ```

3. **Install dependencies**:

   ```sh
   npm install
   ```

4. **Configure Prisma**:

   ```sh
   #For Mac or Linux
   bash reload.prisma.sh
   ```

   ```sh
   #For Windows
   ./reload.prisma.sh
   ```

   Ensure the model points to the correct development or local database. (databaseUrlLocal)

5. **Run the API and the web application**:

   ```sh
   nx serve api
   nx serve marsinet
   ```

or

```sh
npx nx serve api
npx nx serve marsinet
```

The API will be available on port `3334` and the web application on port `4200`.

## Production Mode

1. **Connect to the virtual machine**:

   ```sh
   ssh -i /Users/daniel-hdez/Documents/marsinet/scripts/marsinet_key.pem marsinet@23.97.232.108
   ```

   Ensure the key has execution permissions:

   ```sh
   chmod 600 /Users/daniel-hdez/Documents/marsinet/scripts/marsinet_key.pem
   chmod 600 ~/.ssh/config
   ```

2. **Deploy to production**:

   - Navigate to the `marisnet-prod` directory inside the virtual machine.
   - Use the deployment scripts:

     ```sh
     bash deploy-dev.sh
     bash deploy-prod.sh
     ```

   - Ensure you are on the `develop` branch for development deployments and that the `schema.prisma` file points to the correct database.
   - For production, verify that `schema.prisma` points to the production database, update the frontend URL in the `.env` file, and the API URL in `environment.prod.ts`.

## Project Architecture

The project architecture is a monorepo that contains both the API and the web application. Everything is deployed on an Azure virtual machine with Nginx. The database is PostgreSQL hosted on Azure, with separate instances for development, production, and local environments.

For more information about the database architecture, refer to the SharePoint at `Tech-Explorer/Software/_Resources/Data Model/model_v4`.

### Directory Structure

```
├── apps
│   ├── api
│   │   └── src
│   ├── api-e2e
│   │   └── src
│   ├── marsinet
│   │   └── src
│   ├── marsinet-e2e
│   │   └── src
│   ├── marsinet-report
│   │   └── src
│   └── marsinet-report-e2e
│       └── src
├── backups
├── coverage
│   └── lcov-report
│       ├── api
│       ├── marsinet
│       └── marsinet-report
├── dist
│   ├── apps
│   │   ├── api
│   │   └── marsinet-report
│   └── libs
│       └── commons
├── docs
├── hasura
│   ├── dev
│   │   ├── metadata
│   │   ├── migrations
│   │   └── seeds
│   └── prod
│       ├── metadata
│       ├── migrations
│       └── seeds
├── libs
│   ├── commons
│   │   └── src
│   ├── server
│   │   └── src
│   └── web-commons
│       └── src
├── nginx
│   └── conf.d
│       └── marsinet-report
├── prisma
├── scripts
├── tmp
│   └── libs
│       └── commons
└── tools
```

### File Organization

```
/apps
  /api                 # API code
  /api-e2e             # End-to-end tests for the API
  /marsinet            # Marsinet frontend code
  /marsinet-e2e        # End-to-end tests for Marsinet
  /marsinet-report     # Marsinet report code
  /marsinet-report-e2e # End-to-end tests for Marsinet report

/backups               # Backup files and directories
/coverage              # Code coverage reports
/dist                  # Distribution files
/docs                  # Documentation files
/hasura
  /dev                 # Hasura metadata, migrations, and seeds for development
  /prod                # Hasura metadata, migrations, and seeds for production

/libs
  /commons             # Shared library code
  /server              # Server-side code
  /web-commons         # Shared web code

/nginx
  /conf.d              # Nginx configuration files

/prisma                # Prisma configuration and migration files
/scripts               # Useful scripts for various tasks
/tmp                   # Temporary files and directories
/tools                 # Tools and utilities
```

### Design Pattern

- Follow the project directory architecture when developing new features.
- Use Agile methodology for all implementations.
- Ensure all implementations include associated tests that pass the GitHub Actions checks.

## Testing

To run the tests, use the following command:

```sh
cd apps/api && npm run test
```

```sh
cd apps/marsinet && npm run test
```

Tests are named in the `/*.spec.ts` directory. If you want to check the test coverage instead of running npm run test you must run npm run coverage.

## Environment Variables

Set up the following environment variables in a `.env` file at the root of the project:

```
# Nx 18 enables using plugins to infer targets by default
# This is disabled for existing workspaces to maintain compatibility
# For more info, see: https://nx.dev/concepts/inferred-tasks
NX_ADD_PLUGINS=false

# Azure AD Configuration for Key Vault access
AZURE_KEY_VAULT_NAME=Marsinet
AZURE_TENANT_ID=a24ea924-0ef9-493d-b65b-2e09e21a6031
AZURE_CLIENT_ID=68ddb509-0bcd-4048-82d9-54879bc3ff02
AZURE_CLIENT_SECRET=TIB8Q~XkPG.kyLqO6heT3FmKLA858n_k~NigZahL

# URL for the frontend
# URL_FRONTED=https://marsinet.com
URL_FRONTED=https://develop.marsinet.com
```

## Contributions

If you want to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a pull request.
