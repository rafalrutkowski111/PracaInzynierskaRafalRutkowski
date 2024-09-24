import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import {CenterContainer } from '../Styled/StyledGlobal';

const ButtonWithoutBorder = styled(Form.Control)`
    border:none;
    width:100px;
    background-color: #f8f8f8; 
    color: black; 
`
const ButtonWithoutBorderWrapper = styled.div`
  &:hover ${ButtonWithoutBorder} {
    border:none;
    color: black;
    text-shadow: 1px 1px 10px #000000;
    background-color: #f8f8f8; 
  }
`
const NavLink = styled(Nav.Link)`
`
const NavLinkWrapper  = styled.div`
  &:hover ${NavLink} {
    color: black;
  }
`
const NavbarBrand = styled(Navbar.Brand)`
`
const NavbarBrandWrapper = styled.div`
  &:hover ${NavbarBrand} {
      color: #575757;
  }
`
const ColumnSpace = styled.div`
width: 30px;
`

const Toolbar = (props) => {

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
          <NavbarBrandWrapper><NavbarBrand href="/inzRafalRutkowski/calendar">{props.userName}</NavbarBrand></NavbarBrandWrapper>
          <Nav className="me-auto">
            <NavLinkWrapper><NavLink href="/inzRafalRutkowski/calendar">Harmonogram</NavLink></NavLinkWrapper>
            <NavLinkWrapper><NavLink href="/inzRafalRutkowski/employee">Pracownicy</NavLink></NavLinkWrapper>
            <NavLinkWrapper><NavLink href="/inzRafalRutkowski/specialization">Specjalizacje</NavLink></NavLinkWrapper>
            <NavLinkWrapper><NavLink href="/inzRafalRutkowski/experience">Poziomy doświaczenia</NavLink></NavLinkWrapper>
          </Nav>
        </Container>
        <Navbar.Collapse className="justify-content-end">
            <CenterContainer>
              <ButtonWithoutBorderWrapper>
                <ButtonWithoutBorder
                  type="submit"
                  id="button"
                  value="Wyloguj"
                  onClick={() => {logout() }}
                />
              </ButtonWithoutBorderWrapper>
            </CenterContainer>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Toolbar;