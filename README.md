# Task Manager Application

This project is a task management application consisting of a backend Node.js server and a frontend React application. The backend connects to a MongoDB database, and Docker Compose is used to manage the services.

## Prerequisites

Before you begin, ensure you have met the following requirements:

1. **Docker and Docker Compose**: 
   - **Windows**: Install Docker Desktop which includes Docker Compose. [Download Docker Desktop](https://www.docker.com/products/docker-desktop).
   - **macOS**: Install Docker Desktop from the Docker website. [Download Docker Desktop](https://www.docker.com/products/docker-desktop).
   - **Linux**: Install Docker and Docker Compose. You can find installation instructions on the Docker [official website](https://docs.docker.com/compose/install/).

2. **Git** (optional, for cloning the repository):
   - Install Git from [git-scm.com](https://git-scm.com/).

3. **Basic Knowledge**:
   - Familiarity with Docker, Docker Compose, Node.js, and React.

## Project Structure

The project consists of the following directories:

- `task-manager-backend/` - The backend Node.js server.
- `task-manager-frontend/` - The frontend React application.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**:
   ```sh
   git clone <repository-url>
   cd <repository-folder>

2. **Build and Start the Services**:
   ```sh
   docker-compose up --build

3. **Access the Application**:
   ```sh
   http://localhost:3000


## Configuration

The project uses Docker Compose to manage the services. Configuration can be found in the docker-compose.yml file.

- `MongoDB` - Initialized with a default username (admin) and password (password). Update these credentials in the docker-compose.yml file as needed.
- `Backend` - Connects to MongoDB using the MONGO_URI environment variable.
- `Frontend` - Connects to the backend API using the REACT_APP_API_BASE_URL environment variable.


## Stopping the Services

This command will stop and remove all containers, networks, and volumes defined in the docker-compose.yml file.

   ```sh
   docker-compose down

