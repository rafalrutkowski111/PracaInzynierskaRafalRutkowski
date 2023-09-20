import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import AddJob from '../Job/AddJob';

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

const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {

  const addNewJob = () =>{
    window.location.pathname = '/inzRafalRutkowski/AddJob';
    // przejście do nowej strony
  }

  return (
    <div>
      < Calendar
        localizer={localizer}
        //events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      < ButtonContainer >
        <Button
          type="submit"
          id="button"
          value="Dodaj pracę"
          onClick={() => { addNewJob(); }}
        />
      </ButtonContainer >

    </div >
  )
}






export default MyCalendar