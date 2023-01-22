import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showNewHabitModal: false,
    toggleEmptyDiv: true,
}


// modalSlice contains store, actions and reducers for toggling the state of modal and empty div
const modalSlice = createSlice({
    name: 'newHabitModal',
    initialState,
    reducers: {
        handleShow: (state) => {
            state.showNewHabitModal = true;
        },
        handleClose: (state) => {
            state.showNewHabitModal = false;
        },
        showEmptyDiv: (state) => {
            state.toggleEmptyDiv = true;
        },
        hideEmptyDiv: (state) => {
            state.toggleEmptyDiv = false;
        }
    },
})


export const { handleShow, handleClose, showEmptyDiv, hideEmptyDiv } = modalSlice.actions

export default modalSlice.reducer
