import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const ButtonContainer = styled.div`
  widht:60%;
  height:50%;
  display: flex;
  justify-content: center;
`
const Button = styled(Form.Control)`
  width:100px;
  background-color: white; 
  color: black; 
  border: 1px solid #cccccc;
`
const ButtonWrapper = styled.div`
  &:hover ${Button} {
    background-color: #e6e6e6;
    color: black;
    border: 1px solid #adadad;
  }
`


const Toolbar = () => {

const logout = () =>{
  // na razie czyszcze sesje bo nie mam dodanych tokenów po stronie fronta i wszystko opiera sie na sesji
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userHashToken");
  window.location.reload();
}

  return (
    <>
      <Navbar collapseOnSelect bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/inzRafalRutkowski/calendar">Praca inżynierska Rafał Rutkowski</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/inzRafalRutkowski/calendar">Harmonogram</Nav.Link>
            <Nav.Link href="/inzRafalRutkowski/employee">Pracownicy</Nav.Link>
            <Nav.Link href="/inzRafalRutkowski/specialization">Specjalizacje</Nav.Link>
            <Nav.Link href="/inzRafalRutkowski/experience">Poziomy doświaczenia</Nav.Link>
          </Nav>
        </Container>
            <ButtonContainer>
              <ButtonWrapper>
                <Button
                  type="submit"
                  id="button"
                  value="Wyloguj"
                  onClick={() => {logout() }}
                />
              </ButtonWrapper>
            </ButtonContainer>
      </Navbar>
    </>
  );
}

export default Toolbar;