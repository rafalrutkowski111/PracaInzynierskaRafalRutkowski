import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import 'moment/locale/pl';

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

const myEventsList = [
  {
    start: moment("2023-09-21T10:00:00").toDate(),
    end: moment("2023-09-24T15:00:00").toDate(),
    title: "Test event2",
  },
  {
    start: moment("2023-09-20T08:00:00").toDate(),
    end: moment("2023-09-20T16:00:00").toDate(),
    title: "Test event3",
  },
  {
    start: moment("2023-09-21T08:00:00").toDate(),
    end: moment("2023-09-25T16:00:00").toDate(),
    title: "Test event3",
  },
  {
    start: moment("2023-09-20T08:00:00").toDate(),
    end: moment("2023-09-20T16:00:00").toDate(),
    title: "Test event4",
  },
  {
    start: moment("2023-09-20T08:00:00").toDate(),
    end: moment("2023-09-20T16:00:00").toDate(),
    title: "Test event5",
    desc: "aaaaaaaaaaaaaa",
  },
  {
    start: new Date(2023, 8, 19, 7, 30, 0), //07:30 AM //miesiac do tyłu w tym formacie pewnei styczen to 0
    end: new Date(2023, 8, 30, 11, 0, 0), //11:00 AM  
    title: "Test event67",
    desc: "asdasdasdasdasd",
  },
]


function EventAgenda({ event }) {
  return (
    <span>
      <b>{event.title}</b>
      <p>{event.desc}</p>
    </span>
  )
}

const components = {
  agenda: {
    event: EventAgenda,
  },
}

const messagesPl = {
  next: "Następny",
  previous: "Poprzedni",
  today: "Dziś",
  month: "Miesiąc",
  week: "Tydzień",
  day: "Dzień",
  agenda: "Terminarz",
  date: "Data",
  time: "Czas",
  event: "Wydarzenie",
  allDay: "Cały dzień"
}


const MyCalendar = (props) => {

  const addNewJob = () => {
    window.location.pathname = '/inzRafalRutkowski/AddJob';
  }

  return (
    <div>
      < Calendar
        components={components}
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        culture='pl'
        style={{ height: 600 }}
        messages={messagesPl}
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