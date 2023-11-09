import { v4 as uuidv4 } from 'uuid';

const eventAgenda = ({ event }) => {
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

      <div style={{ display: "none" }} id={idRandom}> <p>{event.desc}</p></div>

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