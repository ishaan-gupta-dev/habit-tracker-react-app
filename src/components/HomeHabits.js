import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WeekView } from "./WeekView";
import { deleteHabit } from "../features/habitsSlice";
import { showEmptyDiv, hideEmptyDiv } from '../features/modalSlice';
import calendar from '../assets/gifs/calendar.gif';
import deleteBtn from '../assets/gifs/delete.gif';
import clockImage from '../assets/gifs/clock.gif';
import '../styles/HomeHabits.css';
import { Row, Col, ListGroup, Button, Badge, Accordion, useAccordionButton, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Homehabits() {
    const dispatch = useDispatch();
    const { habits } = useSelector((state) => state.habits) // get habits from redux state
    const { toggleEmptyDiv } = useSelector((state) => state.modal) // get empty div state from redux
    const [activeEventKeyState, setActiveEventKeyState] = useState(""); // hook for active event key state used in accordion
    // hide the empty div when habits are loaded in DOM
    useEffect(() => {
        if (Object.keys(habits).length > 0) {
            dispatch(hideEmptyDiv());
        } else {
            dispatch(showEmptyDiv());
        }
    })

    function accordionFunc(id) {   // set the active event key for that particular habit using habit id
        if (activeEventKeyState === id) {
            setActiveEventKeyState("");
        } else {
            setActiveEventKeyState(id);
        }

    }


    function ContextAwareToggle({ children, eventKey, callback, activeEventKey }) { // custom aware toggle to toggle the accordion and show the button change
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );

        const isCurrentEventKey = activeEventKey === eventKey;

        return (
            <button
                type="button"
                style={{ backgroundColor: isCurrentEventKey ? '#9eedf0' : 'transparent' }}
                onClick={decoratedOnClick}
                className="week-view-btn"
            >
                {children}
            </button>
        );
    }
    function deleteHabitFunc(habitId) { // delete the habit from state using habit id
        dispatch(deleteHabit(habitId));
        toast.success('Habit deleted!', { // toast the message
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

    // to display the count of days habits have been done
    function DaysCompleted({ habit }) {
        const today = new Date();
        const todayDay = today.getDay();
        let count = 0;
        for (let i = 0; i < habit.weekDetails.length; i++) {
            if (habit.weekDetails[i].isDone === true) {
                count++;
            }
        }
        return (
            <Container>
                <h6>{count}/ {todayDay + 1} days completed</h6>
            </Container>

        )
    }
    return (
        <>
            <Container className="text-center mt-5" style={{ display: toggleEmptyDiv ? 'block' : 'none' }}>
                <h1>Add Habits to show here!</h1>
            </Container>
            <ListGroup as="ol" numbered>
                {habits.map((habit, index) => (
                    <Accordion key={index}>
                        <ListGroup.Item as="li" variant="dark" action key={index} className="m-2">
                            <Row>
                                <Col md={4} className='habit-name'> <h3><Badge pill bg="dark">Name</Badge> {habit.habitName} </h3></Col>
                                <Col md={4} className='habit-cat'><h3><Badge pill bg="primary">Category</Badge> {habit.habitCat}</h3></Col>
                                <Col md={1} className='habit-time'><h5><img src={clockImage} style={{ height: "40px", width: "40px" }}></img><Badge pill bg="info">{habit.habitTime}</Badge></h5></Col>
                                <Col md={2} className='d-flex justify-content-end' >
                                    <span onClick={() => accordionFunc(habit.habitId)}>
                                        <img src={calendar} alt="calendar" style={{ height: "40px", width: "40px" }} ></img>
                                        <ContextAwareToggle className="week-view-btn border-0" variant="outline-secondary" eventKey={habit.habitId} activeEventKey={activeEventKeyState}>
                                            <h6>
                                                Week View
                                            </h6>
                                        </ContextAwareToggle>
                                    </span>
                                </Col>
                                <Col md={1} className='d-flex justify-content-end'><Button className="delete-btn bg-transparent  border-0" variant="outline-danger" onClick={() => deleteHabitFunc(habit.habitId)}><img src={deleteBtn} alt="delete" style={{ height: "50px", width: "40px" }} ></img></Button></Col>
                            </Row>
                            <Row>
                                <DaysCompleted habit={habit} />
                            </Row>
                            <Accordion.Collapse eventKey={habit.habitId}>
                                <WeekView habit={habit} key={habit.habitId} />
                            </Accordion.Collapse>
                        </ListGroup.Item>
                    </Accordion>
                ))
                }
            </ListGroup >
            <ToastContainer />
        </>
    )
}

export { Homehabits };