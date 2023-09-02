# Habit Tracker React

A Habit Tracker React app where we can define habits and track them.

## Features

- Add multiple habits to track.
- User can give Name, Category and Time for a Habit.
- Track each habit everyday. These are the 3 statuses of a habit:
  - Done - Mark the habit as done for a day
  - Not done - Mark the habit as not done for a day
  - None - User did not take any action on a habit for a day
- A view to show all current habits. Given an add button where you can add a new
  habit to track.
- A view to display 7 days of each habit where:
  - Today is highlighted where user can mark todays habit.
  - Previous 6 days and the status of that habit for each day are shown.
  - A user can toggle between the three (above mentioned) statuses of a habit
    i.e. user can change today’s status as done, not done or none anytime.
  - Also user can change any of the previous days status i.e. user can
    change the status of a habit for yesterday, day before yesterday or any
    previous 6 days as well.
  - User cant change status for future days.

## Deployment

To deploy this project run

```bash
npm run deploy
```

Hosted on

https://ishaan-gupta-dev.github.io/habit-tracker-react-app/

## Tech Stack

React, React-Bootstrap, Redux, Redux Toolkit
