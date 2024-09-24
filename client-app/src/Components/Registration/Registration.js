import styled from 'styled-components';
import { Button, ButtonWrapper, CenterContainer, Label } from '../Styled/StyledGlobal';
import TextField from '@mui/material/TextField';

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 5%;
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
                <CenterContainer>
                    <TextField
                        //onChange={}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row>
                <Label htmlFor="email">Email</Label>
                <CenterContainer>
                    <TextField
                        //onChange={}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row>
                <Label htmlFor="password">Hasło</Label>
                <CenterContainer>
                    <TextField
                        //onChange={}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row>
                <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                <CenterContainer>
                    <TextField
                        //onChange={}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row>
                <CenterContainer>
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
                </CenterContainer>
            </Row>
        </MainCompontent>
    )
}

export default Registration;