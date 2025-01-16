import * as React from 'react';
import styled from 'styled-components'
import { ButtonWithoutBorder, ButtonWithoutBorderWrapper } from '../Styled/StyledGlobal';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Elementy jeden pod drugim */
  justify-content: center; /* Wyśrodkowanie w pionie */
  align-items: center; /* Wyśrodkowanie w poziomie */
  width: 100vw; /* Pełna szerokość okna przeglądarki */
  height: 100vh; /* Pełna wysokość okna przeglądarki */
  margin: 0; /* Usuń marginesy */
  gap: 20px; /* Odstęp między elementami */
`;

const ConfirmEmail = () => {

    const navigate = useNavigate();

    return (
        <Container>
                <h2>Email został poprawnie potwierdzony.</h2>

                <ButtonWithoutBorderWrapper>
                    <ButtonWithoutBorder
                        type="submit"
                        id="button"
                        value="Logowanie"
                        onClick={() => navigate("/login")}
                    />
                </ButtonWithoutBorderWrapper>
        </Container>
    )
}

export default ConfirmEmail