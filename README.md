# DOTaskly - Task Management Application

DOTaskly is a modern task management application built with Symfony and React. It provides an intuitive interface for managing tasks through different states and organizing them in task lists.

## Features

### Task Lists
- Create and manage multiple task lists
- Each task list can contain multiple tasks
- Delete task lists when no longer needed
- Visual indication of selected task list

### Tasks
- Create tasks with title, description, progress, and due date
- Tasks are organized in three status columns:
  - Open: New tasks ready to be started
  - In Progress: Tasks currently being worked on
  - Done: Completed tasks
- Task Status Management:
  - Move tasks from "Open" to "In Progress" using the "Start" button
  - Move tasks from "In Progress" to "Done" using the "Done" button
  - Stop tasks and move them back to "Open" using the "Stop" button
  - Reopen completed tasks using the "Reopen" button
- Visual status indicators with color-coded borders:
  - Blue for Open tasks
  - Yellow for In Progress tasks
  - Green for Done tasks
- Track task progress percentage
- Set and display task due dates
- Delete tasks when they're no longer needed

## Technical Stack

### Backend
- Symfony 6.x
- PHP 8.x
- API Platform for GraphQL API
- Doctrine ORM for database management

### Frontend
- React
- Apollo Client for GraphQL integration
- Tailwind CSS for styling
- React Hooks for state management

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd todolist
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install JavaScript dependencies:
```bash
yarn install
```

4. Set up the database:
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

5. Build the frontend assets:
```bash
yarn build
```

6. Start the Symfony development server:
```bash
symfony server:start
```

## Development

### Frontend Development
The React application is located in the `assets/react` directory. Main components:
- `Dashboard.jsx`: Main application layout and task list management
- `Task.jsx`: Task display and status management
- `TaskForm.jsx`: Task creation form
- `TaskList.jsx`: Task list display and management

### Backend Development
The application uses API Platform with GraphQL. Main entities:
- `Task`: Represents a single task with properties like title, description, status, etc.
- `TaskList`: Represents a collection of tasks
- `User`: Handles user management and task ownership

### GraphQL Operations
The application supports the following GraphQL operations:
- Queries:
  - Get task lists
  - Get tasks for a specific list
- Mutations:
  - Create task list
  - Create task
  - Update task status
  - Delete task
  - Delete task list

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
