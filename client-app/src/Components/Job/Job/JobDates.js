import styled from "styled-components";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs'

const DataContainer = styled.div`
    margin-top:2%;
    margin-bottom:3%;
    display: flex;
    justify-content: center;
`
const JobDate = (props) => {

    var changeStartWork = false

    if (dayjs(props.dataStart).format('YYYY/MM/DD') <= dayjs(new Date()).format('YYYY/MM/DD'))
        changeStartWork = true;

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
        if (props.isUpdate === true && date.format('YYYY/MM/DD') === dayjs(new Date()).format('YYYY/MM/DD')) return true
        return day === 0 || day === 6;
    };

    const endValidation = (date) => {
        const day = date.day();

        if (props.isUpdate === true && date.format('YYYY/MM/DD') === dayjs(new Date()).format('YYYY/MM/DD')) return true
        if (props.dataStart !== '') 
            return props.dataStart >= date || day === 0 || day === 6;
        return day === 0 || day === 6;
    };
    return (
        <DataContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={props.isUpdate !== true ? null : dayjs(props.dataStart)}
                    disablePast={props.isUpdate !== true ? null : dayjs(props.dataEnd)}
                    label="Data rozpoczęcia projektu"
                    shouldDisableDate={startValidation}
                    onChange={(e) => changeStartDate(e)}
                    disabled={props.isUpdate !== true ? null : changeStartWork ? true : false}
                />
                <DatePicker
                    value={props.isUpdate !== true ? null : dayjs(props.dataEnd)}
                    disablePast={props.isUpdate !== true ? null : dayjs(props.dataEnd)}
                    label="Data zakończenia projektu"
                    shouldDisableDate={endValidation}
                    onChange={(e) => changeEndDate(e)}
                />
            </LocalizationProvider>
        </DataContainer>
    )
}

export default JobDate