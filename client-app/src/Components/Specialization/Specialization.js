import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const Button = styled(Form.Control)`
  width:150px;
  background-color: green;
  color: white;
`
const Specialization = () => {

      const addNewSpecialization = () => {
        window.location.pathname = '/inzRafalRutkowski/addSpecialization';
      }

    return (
        <>lista wszystkich specjalizacji

        

            < ButtonContainer >
                <Button
                    type="submit"
                    id="button"
                    value="Dodaj specjalizacje"
                    onClick={() => { addNewSpecialization(); }}
                />
            </ButtonContainer >
        </>
    )
}

export default Specialization;