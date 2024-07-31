# Simple Task Manager

Welcome to my Simple Task Manager! This was my solo project for the Joy of Coding Academy, required before internship. This project showcases a robust and user-friendly task management application built using cutting-edge technologies. This application allows users to manage their tasks efficiently with features like task creation, editing, deletion, and completion tracking.

Video walkthrough of the Task Manager https://www.loom.com/share/5ee16b52359d4674a1699b98f360a71d

## Features

- **User Authentication**: Secure user registration and login system.
- **Task Management**: Add, edit, delete, and complete tasks.
- **Task Filtering and Sorting**: Search tasks and sort by due date.
- **Dynamic Theme Switching**: Toggle between dark mode and pastel mode.
- **Font Switching**: Dynamically switch between default font and Google's Roboto font.
- **Completion Pop-up**: Celebrate task completions with a congratulatory pop-up and GIF.
- **Task Completion Counter**: Track the number of tasks completed by the user.

## Technologies Used

### Frontend

- **[Next.js](https://nextjs.org/)**: A powerful React framework for server-side rendering and static site generation.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom user interfaces.
- **[Radix UI](https://www.radix-ui.com/)**: A set of accessible and unstyled UI components for building high-quality design systems and web applications.
- **[Google Fonts](https://fonts.google.com/)**: Used to dynamically switch fonts to enhance user experience.

### Backend

- **[Prisma](https://www.prisma.io/)**: A next-generation ORM for Node.js and TypeScript. Prisma helps in querying the database in a type-safe manner.
- **[MySQL](https://www.mysql.com/)**: A reliable and widely-used relational database management system.

### Authentication and State Management

- **Context API**: Used for managing global state, such as user authentication and task completion count.
- **Local Storage**: Persist user session and task completion count across sessions.

### Development and Deployment Tools

- **[Visual Studio Code](https://code.visualstudio.com/)**: Code editor with powerful extensions for better development experience.
- **[GitHub](https://github.com/)**: Version control and collaboration platform.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/simple-task-manager.git
   ```

2. Navigate to the project directory:

   ```bash
   cd simple-task-manager
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the database:

   - Ensure you have MySQL installed and running.
   - Create a `.env` file and add your database connection string.

5. Run Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **User Authentication**: Sign up or log in to start managing your tasks.
- **Task Management**: Add, edit, delete, and complete tasks.
- **Filter and Sort**: Use the search bar to filter tasks and the sort button to sort tasks by due date.
- **Theme and Font Switching**: Toggle between dark mode and pastel mode, and switch the site font to Roboto for a personalized experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
