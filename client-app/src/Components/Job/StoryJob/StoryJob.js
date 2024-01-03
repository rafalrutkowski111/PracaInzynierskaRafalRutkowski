import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as dayjs from 'dayjs'

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:5%;
`
const StoryContainer = styled.div`
    display: flex;
    justify-content: center;
`
const StoryTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom:2%;
`

const StoryJob = () => {

    const [title, setTitle] = useState('');
    const [listStoryJob, setListStoryJob] = useState([{ timeAddHistory: '', listEmployeeAddToJob: [] }]);

    const params = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetAllUpdate', { params: { jobId: params.id } })
            .then(response => {
                setTitle(response.data[0].title)
                setListStoryJob(response.data)
                console.log(response.data)
            })
    }, [])

    const showHide = (id) => {
        var x = document.getElementById(id);

        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    // moze sformatowac wygląd ,zrobic jakeiś tabelki czy coś żeby to ładnie wyglądało
    return (
        <>
            <TittleContainer>
                <h1>Historia pracy {title}</h1>
            </TittleContainer>

            {listStoryJob.map(x =>
            (
                <>
                    <span>
                        <StoryTitleContainer>
                            <div onClick={() => showHide(x.id)}>{dayjs(x.timeAddHistory).format('YYYY/MM/DD-HH:mm:ss')}</div>
                        </StoryTitleContainer>
                        <div style={{ display: "none" }} id={x.id}>
                            <StoryContainer>
                                <p>Termin rozpoczęcia pracy: {dayjs(x.start).format('DD/MM/YYYY')}</p>
                            </StoryContainer>
                            <StoryContainer>
                                <p>Termin zakończenia pracy: {dayjs(x.end).format('DD/MM/YYYY')}</p>
                            </StoryContainer>
                            <StoryContainer>
                                <b><p style={{ color: x.color }}>Czas zakończenia pracy:
                                    {dayjs(x.currentEnd).year() === 2100 ? " Brak" : " " + dayjs(x.currentEnd).format('DD/MM/YYYY-HH.mm')}</p></b>
                            </StoryContainer>
                            <StoryContainer>
                                <p>Specjalizacje </p>
                            </StoryContainer>
                            {x.listEmployeeAddToJob.map((data) =>
                                <div>
                                    <StoryContainer>
                                        <b>{data.specializationName}</b>
                                    </StoryContainer>
                                    <StoryContainer>
                                        <p>Termin zakończenia:
                                            {data.end === null ?
                                                <b> "Praca zakończona"</b> :
                                                dayjs(data.end).year() === 2100 ? " Brak" : " " + dayjs(data.end).format('DD/MM/YYYY-HH.mm')}
                                        </p>
                                    </StoryContainer>
                                    <StoryContainer>
                                        <p>Ilość wykonanej pracy:
                                            {" " + data.finishWorkHours.toFixed(0)}</p>
                                    </StoryContainer>
                                    {data.end === null ? null :
                                        <>
                                            <StoryContainer>
                                                <p>Oosba odpowiedzialna za specjalizację: {data.responsiblePersonName + " " + data.responsiblePersonSurname}</p>
                                            </StoryContainer>

                                            <p><StoryContainer>Pracownicy</StoryContainer> <br />
                                                {data.employeeInJobList.map((data2) =>
                                                    <StoryContainer>
                                                        <div>
                                                            {data2.name + " " + data2.surname + ": " + data2.experienceName}
                                                        </div>
                                                    </StoryContainer>
                                                )}</p>
                                        </>
                                    }

                                </div>
                            )}
                        </div>
                    </span>
                </>
            ))}
        </>
    )
}

export default StoryJob;