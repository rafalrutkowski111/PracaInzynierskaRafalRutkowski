import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import axios from 'axios';

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 10%;
`
const Row = styled.div`
width: 60%;
    margin-bottom: 3%;
`
const CenteredLabel = styled(Form.Label)`
    font-weight:500;
    display: flex;
    justify-content: center;
`
const ButtonContainer = styled.div`
    widht:60%;
    display: flex;
    justify-content: center;
`
const Button = styled(Form.Control)`
    width:100px;
    background-color: green;
    color: white;
`
const Login = () => {
    const [login, setLogin] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const doLogin = () => {
        axios.get('http://localhost:5000/api/Employer/login', 
            {
                params: {login: login, password: password},
                withCredentials: true
            })
            .then(response => {
                sessionStorage.setItem("userId", response.data.userId)
                sessionStorage.setItem("userHashToken", response.data.hash);
                window.location.pathname = '/inzRafalRutkowski/';
            }).catch((error)=>{alert(error.response.data.message)})
    }


    return (
        <MainCompontent>
            <Row>
                <CenteredLabel htmlFor="login">Login</CenteredLabel>
                <Form.Control
                    type="text"
                    id="login"
                    onChange={(e) => { setLogin(e.target.value) }}
                />
            </Row>
            <Row>
                <CenteredLabel htmlFor="password">Hasło</CenteredLabel>
                <Form.Control
                    type="password"
                    id="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </Row>
            <ButtonContainer>
                <Button
                    type="submit"
                    id="button"
                    value="Zaloguj"
                    onClick={() => {doLogin();}}
                />
            </ButtonContainer>
        </MainCompontent>
    )
}

export default Login;