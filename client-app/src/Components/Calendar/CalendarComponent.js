import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs'

const eventAgenda = ({ event }) => {
  console.log(event)
  const idRandom = uuidv4();

  const showHide = () => {
    var x = document.getElementById(idRandom);

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  return (
    <span>
      <div onClick={() => showHide()}>
        <b>{event.title}</b>
      </div>

      <div style={{ display: "none" }} id={idRandom}> 
      <br />
      <p>Termin rozpoczęcia pracy {dayjs(event.start).format('DD/MM/YYYY')}</p>
      <p>Termin zakończenia pracy {dayjs(event.end).format('DD/MM/YYYY')}</p>
      <b><p style={{ color: event.color}}>Czas zakończenia pracy {dayjs(event.currentEnd).format('DD/MM/YYYY-HH.mm')}</p></b>
      <p>Specjalizacje </p>
      {event.listEmployeeAddToJob.map((data)=>
      <div>
        <b>{data.specializationName}</b>
        <p>Termin zakończenia {dayjs(data.end).format('DD/MM/YYYY-HH.mm')}</p>
        <p>Oosba odpowiedzialna za specjalizację {data.responsiblePersonName + " " + data.responsiblePersonSurname}</p>
        <p>Pracownicy <br />
        {data.employeeInJobList.map((data2)=>
        <div>
          {data2.name + " " + data2.surname + " " + data2.experienceName}
        </div>
        )}</p>
      </div>
      )}
      </div>

    </span >
  )
}

const eventColor = ({ event }) => {
  return (
    <div style={{ background: event.color, color: 'white', padding: "2px 5px" }}>{event.title}</div>
  )
}

const calendarComponent = {
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

export default calendarComponent;