# Trigger Tracker

Trigger Tracker is a web application designed to help users track their triggers related to negative habits, addictions, and bad behaviors. It provides insightful data visualization and reminders to support self-awareness and personal growth.

## Features

- User authentication (Sign Up, Log In, Log Out)
- Habit and trigger tracking
- Data visualization with charts and graphs
- Personalized reports (daily, weekly, monthly)
- Notifications and reminders
- User profile customization

## Technology Stack

- **Frontend**: React.js, Redux, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Auth
- **Data Visualization**: Recharts or Chart.js
- **Hosting**: Vercel (Frontend), AWS or DigitalOcean (Backend)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Firebase account for authentication

### Installation

1. Clone the repository:
```
git clone [https://github.com/yourusername/trigger-tracker.git](https://github.com/Monametsi-s/trigger-tracker)
cd trigger-tracker
```

2. Install dependencies:
```
npm install
```

3. Set up Firebase:
   - Create a Firebase project.
   - Get the configuration object and add it to `src/services/firebase.js`.

4. Run the application:
```
npm start
```

## Project Structure

```
trigger-tracker/
├── public/          
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Screens or pages
│   ├── services/       # API calls and Firebase configuration
│   ├── context/        # Context API or Redux setup
│   ├── hooks/          # Custom hooks
│   ├── assets/         # Images, icons, etc.
│   └── utils/          # Utility functions
└── package.json
```

## Contribution

Feel free to fork this project and make pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
