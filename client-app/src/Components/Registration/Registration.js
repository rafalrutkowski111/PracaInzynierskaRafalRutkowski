import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { Button, ButtonWrapper, ButtonContainer, Label } from '../Styled/StyledGlobal';
import { redirect } from 'react-router-dom';

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 10%;
`
const Row = styled.div`
width: 60%;
    margin-bottom: 3%;
`
const ColumnSpace = styled.div`
width: 20px;
`

const Registration = () => {
    return (
        <MainCompontent>
            <Row>
                <Label htmlFor="login">Login</Label>
                <Form.Control
                    type="text"
                    id="login"
                //onChange={(e) => { setLogin(e.target.value) }}
                />
            </Row>
            <Row>
                <Label htmlFor="login">Email</Label>
                <Form.Control
                    type="text"
                    id="login"
                //onChange={(e) => { setLogin(e.target.value) }}
                />
            </Row>
            <Row>
                <Label htmlFor="password">Hasło</Label>
                <Form.Control
                    type="password"
                    id="password"
                //onChange={(e) => { setPassword(e.target.value) }}
                />
            </Row>
            <Row>
                <Label htmlFor="password">Potwierdź hasło</Label>
                <Form.Control
                    type="password"
                    id="password"
                //onChange={(e) => { setPassword(e.target.value) }}
                />
            </Row>
            <Row>
                <ButtonContainer>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Dalej"
                        //onClick={() => {doLogin();}}
                        />
                    </ButtonWrapper>
                    <ColumnSpace></ColumnSpace>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Powrót"
                            onClick={() => window.location.pathname = '/'} 
                        />
                    </ButtonWrapper>
                </ButtonContainer>
            </Row>
        </MainCompontent>
    )
}

export default Registration;