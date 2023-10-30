import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import 'moment/locale/pl';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Calendar.css"
import React, { useCallback } from 'react'

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 1%;
  display: flex;
  justify-content: center;
`
const Button = styled(Form.Control)`
  width:150px;
  background-color: green;
  color: white;
`
const H1Container = styled.h3`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

const localizer = momentLocalizer(moment)

function eventAgenda({ event }) {
  return (
    <span>
      <b>{event.title}</b>
      <p>{event.desc}</p>
    </span>
  )
}

function eventColor({ event }) {
  return (
    <div style={{ background: event.color, color: 'white', padding: "2px 5px" }}>{event.title}</div>
  )
}

const components = {

  agenda: {
    event: eventAgenda,
  },
  month: {
    event: eventColor,
  },
  week: {
    event: eventColor,
  },
  day: {
    event: eventColor,
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


const MyCalendar = (props) => {

  const [events, setEvents] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const [selectJob, setSelectJob] = useState("Nie wybrano pracy");
  const [disableButtonUpdateJob, setisableButtonUpdateJob] = useState(true);
  const [eventData, setEventData] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/api/Job', { params: { userId: userId } })
      .then(response => {
        setEvents(response.data)
      })
  }, [])

  const addNewJob = () => {
    window.location.pathname = '/inzRafalRutkowski/AddJob';
  }
  const updateJob = () => {
    console.log(events)
    window.location.pathname = '/inzRafalRutkowski/updateJob';
  }

  const eventSelect = useCallback(
    (event) => {
      console.log(event)
      setEventData(event)
      setSelectJob(event.title)
      setisableButtonUpdateJob(false)
    }
  )
  // const eventPropGetter = useCallback(
  //   (event, start, end, isSelected) => ({
  //     ...(isSelected && {
  //       className: 'newStyle',
  //     }),

  //     ...(event.color == event.color && {
  //       className: 'myStyle',
  //     }),

  //     // ...(event.color == event.color && {
  //     //   style: {
  //     //     backgroundColor: event.color,
  //     //   },
  //     // }),


  //   }),
  //   []
  // )

  return (
    <div>
      < Calendar
        //eventPropGetter={eventPropGetter}
        onSelectEvent={eventSelect}
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
      <H1Container>
        {selectJob}
      </H1Container>
      < ButtonContainer >
        <Button
          type="submit"
          id="button"
          value="Dodaj pracę"
          onClick={() => { addNewJob(); }}
        />
        <Button
          disabled={disableButtonUpdateJob}
          type="submit"
          id="button"
          value="Edytuj pracę"
          onClick={() => { updateJob(eventData); }} //przechodzimy do nowej strony, zrobić żeby przechodziło do strony potomnej i przesyłało propsy
        />
      </ButtonContainer >

    </div >
  )
}






export default MyCalendar