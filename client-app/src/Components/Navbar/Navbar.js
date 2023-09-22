import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Toolbar = () => {

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="calendar">Praca inżynierska Rafał Rutkowski</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="calendar">Harmonogram</Nav.Link>
            <Nav.Link href="employee">Pracownicy</Nav.Link>
            <Nav.Link href="specialization">Specjalizacje</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Toolbar;