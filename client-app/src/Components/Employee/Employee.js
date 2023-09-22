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
const Employee = () => {

      const addNewEmployee = () => {
        window.location.pathname = '/inzRafalRutkowski/addEmployee';
      }

    return (
        <>lista pracowników

        

            < ButtonContainer >
                <Button
                    type="submit"
                    id="button"
                    value="Dodaj pracownika"
                    onClick={() => { addNewEmployee(); }}
                />
            </ButtonContainer >
        </>
    )
}

export default Employee;