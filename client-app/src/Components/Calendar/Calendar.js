import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import 'moment/locale/pl';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Calendar.css"
import React, { useCallback } from 'react'
import calendarComponent from './CalendarComponent';
import * as dayjs from 'dayjs'

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

const MyCalendar = () => {

  const [events, setEvents] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const [selectJob, setSelectJob] = useState("Nie wybrano pracy");
  const [disableButtonUpdateJob, setisableButtonUpdateJob] = useState(true);
  const [eventData, setEventData] = useState();
  const localizer = momentLocalizer(moment)

  useEffect(() => {
    axios.get('http://localhost:5000/api/Job', { params: { userId: userId } })
      .then(response => {
        setEvents(response.data)
      })
  }, [])

  const addNewJob = () => {
    window.location.pathname = '/inzRafalRutkowski/calendar/addJob';
  }
  const updateJob = () => {
    window.location.pathname = '/inzRafalRutkowski/calendar/updateJob/' + eventData.id;
  }

  const eventSelect = useCallback(
    (event) => {
      console.log(event)
      if (dayjs(event.currentEnd).format('YYYY/MM/DD') > dayjs(new Date()).format('YYYY/MM/DD')) {
        setisableButtonUpdateJob(false)
      }
      else setisableButtonUpdateJob(true)
      setEventData(event)
      setSelectJob(event.title)
    }
  )
  return (
    <div>
      < Calendar
        onSelectEvent={eventSelect}
        components={calendarComponent}
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
          onClick={() => { updateJob(); }}
        />
      </ButtonContainer >

    </div >
  )
}

export default MyCalendar