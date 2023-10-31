import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Toolbar = () => {

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/inzRafalRutkowski/calendar">Praca inżynierska Rafał Rutkowski</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/inzRafalRutkowski/calendar">Harmonogram</Nav.Link>
            <Nav.Link href="/inzRafalRutkowski/employee">Pracownicy</Nav.Link>
            <Nav.Link href="/inzRafalRutkowski/specialization">Specjalizacje</Nav.Link>
            <Nav.Link href="/inzRafalRutkowski/experience">Poziomy doświaczenia</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Toolbar;