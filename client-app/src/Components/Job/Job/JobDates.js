import styled from "styled-components";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs'

const DataContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`
const JobDate = (props) => {

    var changeStartWork = false

    if (dayjs(props.dataStart).format('YYYY/MM/DD') <= dayjs(new Date()).format('YYYY/MM/DD'))
        changeStartWork = true;

    const changeStartDate = (e) => {
        props.setDataStart(e)

        if (e === null) {
            props.setErrorDataStartLabel("Data nie może być pusta");
            props.setErrorDataStart(true);
        }
        else if (e.$d === "Invalid Date") {
            props.setErrorDataStartLabel("Niepoprawna data");
            props.setErrorDataStart(true);
        }
        else if(e > props.dataEnd && props.dataEnd != null)
        {
            props.setErrorDataStartLabel("Data rozpoczęcia nie może być większa niż zakończenia");
            props.setErrorDataStart(true);
        }
        else {
            props.setErrorDataStartLabel("");
            props.setErrorDataStart(false);
        }
    }

    const changeEndDate = (e) => {
        props.setDataEnd(e)

        if (e === null) {
            props.setErrorDataEndLabel("Data nie może być pusta");
            props.setErrorDataEnd(true);
        }
        else if (e.$d === "Invalid Date") {
            props.setErrorDataEndLabel("Niepoprawna data");
            props.setErrorDataEnd(true);
        }
        else {
            props.setErrorDataEndLabel("");
            props.setErrorDataEnd(false);
        }

        if(props.dataStart < e && props.dataStart != null)
        {
            props.setErrorDataStartLabel("");
            props.setErrorDataStart(false);
        }
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
                    slotProps={{
                        textField: {
                            helperText: props.errorDataStartLabel,
                            error: props.errorDataStart
                        },
                    }}
                    value={props.isUpdate !== true ? null : dayjs(props.dataStart)}
                    disablePast={props.isUpdate !== true ? null : dayjs(props.dataEnd)}
                    label="Data rozpoczęcia projektu"
                    shouldDisableDate={startValidation}
                    onChange={(e) => changeStartDate(e)}
                    disabled={props.isUpdate !== true ? null : changeStartWork ? true : false}
                />
                <DatePicker
                    slotProps={{
                        textField: {
                            helperText: props.errorDataEndLabel,
                            error: props.errorDataEnd
                        },
                    }}
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