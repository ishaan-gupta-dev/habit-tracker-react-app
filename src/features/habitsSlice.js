import { createSlice, current } from '@reduxjs/toolkit';
let id = 0;
// get and set habits from local storage if exists
const habitsFromLocalStorage = localStorage.getItem("habits")
    ? JSON.parse(localStorage.getItem('habits'))
    : [];
let habits = [...habitsFromLocalStorage]
const initialState = {
    habits: habits,
}


// habitsSlice defines actions and reducers and return new state for the various habits changes
const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        saveNewHabit: (state, { payload }) => {
            // adding date to habit
            const today = new Date();
            let day = today.getDate() - today.getDay();
            const month = today.getMonth();
            const year = today.getFullYear();
            // adding week details array to habit for tracking
            let weekDetails = [{
                WeekId: 1,
                weekName: "Monday",
                dd: day,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            {
                WeekId: 2,
                weekName: "Tuesday",
                dd: day + 1,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            {
                WeekId: 3,
                weekName: "Wednesday",
                dd: day + 2,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            {
                WeekId: 4,
                weekName: "Thursday",
                dd: day + 3,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            {
                WeekId: 5,
                weekName: "Friday",
                dd: day + 4,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            {
                WeekId: 6,
                weekName: "Saturday",
                dd: day + 5,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            {
                WeekId: 7,
                weekName: "Sunday",
                dd: day + 6,
                mm: month,
                yyyy: year,
                isDone: "",
            },
            ];
            // adding id and week details to habit
            let newHabit = { ...payload, habitId: id++, weekDetails: weekDetails };
            state.habits = [...state.habits, newHabit];

            habits = [...habits, newHabit];
            window.localStorage.setItem('habits', JSON.stringify(habits)) // set updated habits in local storage
        },
        deleteHabit: (state, action) => {
            state.habits = state.habits.filter((habit) => habit.habitId !== action.payload)
            window.localStorage.setItem('habits', JSON.stringify(state.habits)) // set updated habits in local storage
            // if no habits in state, clear local storage so that no habits are loaded
            if (state.habits.length === 0) {
                window.localStorage.clear();
            }
            id--;
        },
        changeStatus: (state, { payload }) => {
            state.habits.forEach((habit) => {
                if (habit.habitId === payload.habitId) { // if habit id from payload matched habit id in state, check further
                    habit.weekDetails.forEach((week) => {
                        if (week.WeekId === payload.details[0].weekId) { // if week id of payload matches week id of habit in state 
                            week.isDone = payload.details[0].isDone // change status to value from payload
                        }
                    })
                }
            })
            window.localStorage.setItem('habits', JSON.stringify(state.habits)) // set updated habits in local storage
        },
    },
})


export const { saveNewHabit, deleteHabit, changeStatus } = habitsSlice.actions

export default habitsSlice.reducer
