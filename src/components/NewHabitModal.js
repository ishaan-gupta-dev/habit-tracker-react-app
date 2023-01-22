import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { handleClose } from '../features/modalSlice';
import { saveNewHabit } from '../features/habitsSlice';
import '../styles/NewHabitModal.css'
import { Button, Modal, Container, Col, Row, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewHabitModal() {

    // hooks for state managment
    const [habitName, setHabitName] = useState('')
    const [habitCat, setHabitCat] = useState('')
    const [habitTime, setHabitTime] = useState('')
    /* const [habitFreq, setHabitFreq] = useState({}) */ // hook for habit frequency, not used now, might develop later
    const dispatch = useDispatch()
    const closeNewHabitModal = () => {  // close modal after saving
        dispatch(handleClose());
    }
    const { showNewHabitModal } = useSelector((state) => state.modal) // get state for modal show


    // dynamic update value of input on change
    function handleChange(e) {
        if (e.target.name === "habitName") {
            setHabitName(e.target.value);
        } else if (e.target.name === "habitCat") {
            setHabitCat(e.target.value);
        } else if (e.target.name === "habitTime") {
            setHabitTime(e.target.value);
        }
        else if (e.target.name === "habitFreq") {
            setHabitFreq(e.target.value);
        }
    }

    // save new habit to state
    function saveNewHabitFunc() {
        // to clear the form on submit
        setHabitName('');
        setHabitCat('');
        setHabitTime('');
        dispatch(saveNewHabit({ habitName, habitCat, habitTime })); // save new habit to redux state
        closeNewHabitModal();
        toast.success('Good luck on your new Habit!', { // toast the message
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

    }

    return (
        <>
            <Modal show={showNewHabitModal} onHide={closeNewHabitModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Habit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='mt-4 ms-2'>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="habitName">
                                <Form.Label column sm={3}>
                                    Habit Name
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" name="habitName" value={habitName} onChange={(e) => handleChange(e)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="habitCat">
                                <Form.Label column sm={3}>
                                    Category
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" name="habitCat" value={habitCat} onChange={(e) => handleChange(e)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="habitTime">
                                <Form.Label column sm={3}>
                                    What Time?
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="time" name="habitTime" value={habitTime} onChange={(e) => handleChange(e)} />
                                </Col>
                            </Form.Group>
                            {/* form for habit frequency, might develop later */}
                            {/* <Form.Group as={Row} className="mb-3" controlId="habitFreq">
                                <Form.Label column sm={2}>
                                    How many days a weeK?
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="week" name="habitFreq" value={habitFreq} onChange={(e) => handleChange(e)} />
                                </Col>
                            </Form.Group> */}
                        </Form>
                    </Container>
                    <div id="modal-quotes-div"><span id="quotes-body">Quality is not an act, it is a habit. </span><span id="quotes-author">-Aristotle</span></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={saveNewHabitFunc} type="submit">
                        Save Habit
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}

export { NewHabitModal };