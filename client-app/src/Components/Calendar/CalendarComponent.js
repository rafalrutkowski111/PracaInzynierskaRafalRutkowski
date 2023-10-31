const eventAgenda = ({ event }) => {
    return (
      <span>
        <b>{event.title}</b>
        <p>{event.desc}</p>
      </span>
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