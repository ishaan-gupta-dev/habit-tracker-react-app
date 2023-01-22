import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux'
import { handleShow } from '../features/modalSlice';

function MyNavbar() {
    const dispatch = useDispatch();
    // show the modal on click
    const showNewHabitModal = () => {
        dispatch(handleShow());
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Habit Tracker</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link onClick={showNewHabitModal}>New Habit</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export { MyNavbar };