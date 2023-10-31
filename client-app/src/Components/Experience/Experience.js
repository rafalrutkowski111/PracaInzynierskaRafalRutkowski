import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const Button = styled(Form.Control)`
  width:250px;
  background-color: green;
  color: white;
`

const Experience = () => {

    const addNewExperience = () => {
        window.location.pathname = '/inzRafalRutkowski/experience/addExperience';
    }

    return (
        <>
            <p>lista wszystkich poziomów doświaczenia</p>
            < ButtonContainer >
                <Button
                    type="submit"
                    id="button"
                    value="Dodaj poziom doświaczenia"
                    onClick={() => { addNewExperience(); }}
                />
            </ButtonContainer >
        </>


    )
}

export default Experience;