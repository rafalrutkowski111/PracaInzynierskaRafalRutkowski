import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import 'moment/locale/pl';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  allDay: "Cały dzień",
  showMore: total => `+${total} więcej`,
}

 // https://www.youtube.com/watch?v=ZFhDJAOd9Tg&list=PLAH22H3_Ih9EVU8RqQM7DK3SLJb9HSwWQ&ab_channel=CodingGalore
 // zmiana koloru 25minuta
  //ograniczyć terminarz od 8 do 16
 
const MyCalendar = (props) => {

  const [events, setEvents] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios.get('http://localhost:5000/api/Job', { params: { userId: userId } })
      .then(response => {
        setEvents(response.data)
      })
  }, [])

  const addNewJob = () => {
    window.location.pathname = '/inzRafalRutkowski/AddJob';
  }


  return (
    <div>
      < Calendar
        components={components}
        localizer={localizer}
        events={events}
        startAccessor={(event) => { return new Date(event.start) }}
        endAccessor={(event) => { return new Date(event.currentEnd) }}
        culture='pl'
        style={{ height: 600 }}
        messages={messagesPl}
        min={moment("1999-01-01T08:00:00").toDate()}
        max={moment("2200-01-10T16:00:00").toDate()}
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