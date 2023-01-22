import { useDispatch } from 'react-redux';
import { changeStatus } from "../features/habitsSlice";
import tickImage from '../assets/gifs/tick.gif'
import crossImage from '../assets/gifs/cross.gif'
import alertImage from '../assets/gifs/none.gif'
import '../styles/WeekView.css';
import { Card, Button, Col, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WeekView({ habit }) {
    const habitWeekDetails = habit.weekDetails; // get week details array from habits
    // get Today's date
    const today = new Date();
    const todayDate = today.getDate();
    const dispatch = useDispatch();

    function markAsDoneFunc(args) { // mark habit as done on click
        if (args[2] > todayDate) { // if future day, toast warn and return
            toast.warn('Cannot change status for future days!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        dispatch(changeStatus({
            habitId: args[0],
            details: [
                {
                    weekId: args[1],
                    isDone: true
                }
            ]
        }))
    }
    function markAsNotDoneFunc(args) { // mark habit as not done on click
        if (args[2] > todayDate) { // if future day, toast warn and return
            toast.warn('Cannot change status for future days!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        dispatch(changeStatus({
            habitId: args[0],
            details: [
                {
                    weekId: args[1],
                    isDone: false
                }
            ]
        }))
    }
    function markAsNoneFunc(args) { // mark habit as none on click
        if (args[2] > todayDate) { // if future day, toast warn and return
            toast.warn('Cannot change status for future days!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        dispatch(changeStatus({
            habitId: args[0],
            details: [
                {
                    weekId: args[1],
                    isDone: ""
                }
            ]
        }))
    }
    return (
        <>
            <Row xs={7} md={7} className="g-2">
                {habitWeekDetails.map((week, idx) => (
                    < Col key={idx} >
                        <Card style={{ width: '12rem' }} className={week.dd === todayDate ? 'today-card' : 'not-today'}>
                            <Card.Body className={week.dd === todayDate ? 'today-card-body' : 'not-today'}>
                                <Card.Title className='text-center'>{week.weekName}</Card.Title>
                                <Card.Text className='text-center date-para'>
                                    {week.dd}/{week.mm + 1}/{week.yyyy}
                                </Card.Text>
                                <Container className='text-center'>
                                    {week.isDone === "" && (
                                        <OverlayTrigger key='top' placement='bottom' overlay={
                                            <Tooltip id='tooltip-top'> None! </Tooltip>
                                        }>
                                            <Button className='bg-transparent  border-0' size="sm" onClick={() => markAsDoneFunc([habit.habitId, week.WeekId, week.dd])}>
                                                <img src={alertImage} style={{ height: "50px", width: "50px" }}></img>
                                            </Button>
                                        </OverlayTrigger>
                                    )}
                                    {week.isDone === true && (
                                        <OverlayTrigger key='top' placement='bottom' overlay={
                                            <Tooltip id='tooltip-top'> Done! </Tooltip>
                                        }>
                                            <Button className='bg-transparent  border-0' size="sm" onClick={() => markAsNotDoneFunc([habit.habitId, week.WeekId])}>
                                                <img src={tickImage} style={{ height: "50px", width: "50px" }}></img>
                                            </Button>
                                        </OverlayTrigger>
                                    )}
                                    {week.isDone === false && (
                                        <OverlayTrigger key='top' placement='bottom' overlay={
                                            <Tooltip id='tooltip-top'> Not Done! </Tooltip>
                                        }>
                                            <Button className='bg-transparent  border-0' size="sm" onClick={() => markAsNoneFunc([habit.habitId, week.WeekId])}>
                                                <img src={crossImage} style={{ height: "50px", width: "50px" }}></img>
                                            </Button>
                                        </OverlayTrigger>
                                    )}
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
                }
            </Row >
            <ToastContainer />
        </>
    );
}

export { WeekView };