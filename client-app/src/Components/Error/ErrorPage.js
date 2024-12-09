import styled from "styled-components"
import { CenterContainer, ButtonWithoutBorder, ButtonWithoutBorderWrapper } from '../Styled/StyledGlobal';
import { useNavigate } from "react-router-dom";

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 10%;
`
const Row = styled.div`
width: 60%;
    margin-bottom: 3%;
`

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <MainCompontent>
                <Row><CenterContainer>Nie znaleziono strony Eroor 404</CenterContainer> </Row>
                <Row>
                    <CenterContainer>
                        <ButtonWithoutBorderWrapper>
                            <ButtonWithoutBorder
                                type="submit"
                                id="button"
                                value="Strona główna"
                                onClick={() => navigate("/")}
                            />
                        </ButtonWithoutBorderWrapper>
                    </CenterContainer>
                </Row>
            </MainCompontent >
        </>
    )
}

export default ErrorPage