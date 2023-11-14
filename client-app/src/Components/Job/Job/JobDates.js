import styled from "styled-components";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs'
import { useState } from "react";

const DataContainer = styled.div`
    margin-top:2%;
    margin-bottom:3%;
    display: flex;
    justify-content: center;
`
const JobDate = (props) => {
    console.log(props.start)

    const changeStartDate = (e) => {
        props.setDataStart(e)

        if (props.dataListSpecialization.length - 1 >= 0 && e !== "" && props.dataEnd !== "" && props.title !== "")
            props.setOpenAddEmployee(false)
        else props.setOpenAddEmployee(true)
    }

    const changeEndDate = (e) => {
        props.setDataEnd(e)

        if (props.dataListSpecialization.length - 1 >= 0 && props.dataStart !== "" && e !== "" && props.title !== "")
            props.setOpenAddEmployee(false)
        else props.setOpenAddEmployee(true)
    }

    const startValidation = (date) => {
        const day = date.day();
        return day === 0 || day === 6;
    };

    const endValidation = (date) => {
        const day = date.day();

        if (props.dataStart !== '') {
            return props.dataStart >= date || day === 0 || day === 6;
        }
        return day === 0 || day === 6;
    };
    return (
        <DataContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={props.isUpdate !== true ? null : dayjs(props.dataStart)}
                    label="Data rozpoczęcia projektu"
                    disablePast
                    shouldDisableDate={startValidation}
                    onChange={(e) => changeStartDate(e)}
                />
                <DatePicker
                    value={props.isUpdate !== true ? null : dayjs(props.dataEnd)}
                    shouldDisableDate={endValidation}
                    disablePast
                    label="Data zakończenia projektu"
                    onChange={(e) => changeEndDate(e)}
                />
            </LocalizationProvider>
        </DataContainer>
    )
}

export default JobDate