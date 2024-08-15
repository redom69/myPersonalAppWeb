
# Monorepo - My Personal Web Application

This is a monorepo for the **My Personal Web Application**. The monorepo includes a backend API built with **Node.js**, **NestJS**, **Prisma**, and **PostgreSQL**, as well as a frontend developed with **React** and **TypeScript**.

## Monorepo Structure

This monorepo is organized as follows:

- **api/**: Contains the backend of the application. Developed with Node.js, NestJS, and Prisma.
- **mypaw/**: Contains the frontend of the application. Developed with React and TypeScript.

## Prerequisites

Before you can run the application, make sure you have the following prerequisites installed in your development environment:

- **Node.js**: v14.x or higher
- **npm**: v6.x or higher (usually comes with Node.js)
- **NX**: Tool for managing monorepos (`npm install -g nx`)
- **PostgreSQL**: Relational database for the API

## Project Setup

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

```bash
npm install
```

### Database Configuration

Make sure PostgreSQL is running, and create a database for the project. Then, create a `.env` file in the `api/` folder with the following variables:

```env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://postgres:pass@postgres:6543/postgres"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://postgres:pass@postgres:6543/postgres"

jwtSecretKey=your-key
```

### Prisma Migrations

To set up the database with Prisma, run:

```bash
npx prisma migrate dev --schema=api/prisma/schema.prisma
```

This will apply the necessary migrations and configure the database.

## Running the Project

### Serve the API

To run the API server, use the following command:

```bash
nx serve api
```

This will start the server in development mode and serve it at the specified address (by default at `http://localhost:3000`).

### Serve the Frontend Application

To run the frontend server, use the following command:

```bash
nx serve mypaw
```

This will start the frontend application in development mode and serve it at the specified address (by default at `http://localhost:4200`).

### Building the Application

To build the application for both the API and the frontend, run the following commands:

```bash
npx nx build api --skip-nx-cache --max-workers=1 --prod
npx nx build mypaw --skip-nx-cache --max-workers=1 --prod
```

This will generate optimized production versions of both parts of the application.

## Deployment

To deploy the application in a production environment, follow these steps:

1. Build the application (as shown in the previous section).
2. Configure your server to serve the generated files and run the necessary servers (Node.js for the backend and a static server for the frontend).
3. Ensure the correct environment variables are set in production, especially those related to database connections and other sensitive credentials.

## Contributions

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes to your branch (`git push origin feature/new-feature`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. For more details, see the `LICENSE` file.

## Contact

If you have any questions or suggestions, feel free to open an issue in the repository or contact the development team directly.

---

Thank you for using **My Personal Web Application**!
