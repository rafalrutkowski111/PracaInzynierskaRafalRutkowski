import axios from "axios";
import * as dayjs from 'dayjs'

const ViewEmployeeDetails = (props) => {

    axios.get('http://localhost:5000/api/Employee/employeeSearch', { params: { id: props.idEmployee } })
        .then(response => {
            props.setDataEmployee(response.data)
        })
    if (props.isViewSpecialist) {
        props.setViewSpecialist(true)
        props.setIdSpecializationToChangeEmployee(props.idSpecialization)
    }
    else props.setViewSpecialist(false)
    props.setModalOpenViewEmployee(true)
}

const VerificationEmployeeToJob = (props) => {
    axios.post('http://localhost:5000/api/Job/JobEmployee',
        {
            listJobSpecializationEmployeeDTO: props.listJobSpecializationEmployeeDTO, JobSpecialization: props.dataListSpecialization, EmployerId: props.userId,
            start: dayjs(props.dataStart), end: dayjs(props.dataEnd), EmployeeWithoutEmployer: false, IsUpdate: props.isUpdate,
            ListEmployeeAddToJob: props.listEmployeeAddToJob, justEdit: props.justEdit, realStart: props.realStart

        })
        .then(response2 => {
            props.setListEmployeeAddToJob(response2.data.listEmployeeInJob) //lista pracowników których ostatecznie dodamy
            updateDataEmployeeWithSpecialization({
                dataEmployeeWithSpecialization: props.dataEmployeeWithSpecialization,
                dataListSpecialization: props.dataListSpecialization,
                setDataEmployeeWithSpecialization: props.setDataEmployeeWithSpecialization
            }); // aktualizacja specjalistów, też dane do rozpoczecia pracy

            
            axios.post('http://localhost:5000/api/Job/UpdateTimeJob',
                {
                    listEmployeeInJobDTOList: response2.data.listEmployeeInJob, start: props.isUpdate === true ? props.realStart : dayjs(props.dataStart),
                     listSpecialisationListEmployeeRemoveDTO: props.dataEmployeeWithSpecialization
                })
                .then(response => { props.setEndDayWork(response.data.endWorkDay); props.setListEmployeeAddToJob(response.data.listEmployeeInJob) })

            if (props.isUpdate === true)
                props.setStartDayWork(dayjs(response2.data.start).format('DD/MM/YYYY'))
            else props.setStartDayWork(props.dataStart.format('DD/MM/YYYY'))

            if (response2.data.canStartWork === true) {
                props.setModalOpenSummary(true) //podsumowanie
            }
            else {
                axios.post('http://localhost:5000/api/Job/JobEmployee',
                    {
                        listJobSpecializationEmployeeDTO: props.listJobSpecializationEmployeeDTO, JobSpecialization: response2.data.specializationList, EmployerId: props.userId,
                        start: dayjs(props.dataStart), end: dayjs(props.dataEnd), EmployeeWithoutEmployer: true
                    },)
                    .then(response => {
                        if (response.data.canStartWork === true) {
                            props.setSearchEmployeeJob(response.data.listEmployeeInJob)
                            props.setModalOpen(false)
                            props.setModalOpenEmployeeList(true)
                        }
                        else { props.setModalOpenNotEnoughEmployee(true) }
                    })
            }
        })
} 

const updateDataEmployeeWithSpecialization = (props) => {
    const updatedataEmployeeWithSpecialization = props.dataEmployeeWithSpecialization.map(data => {

        data.hours = props.dataListSpecialization.find(x => x.SpecializationId === data.specializationId).Hours
        data.nameSurname = data.name + " " + data.surname

        //poniższy kod dodaje właściwość do ukrycia jej w specjalziacji jeżeli nie będzie wykonywana już żadna praca
        let specializationTemp = props.dataListSpecialization.find(x => x.SpecializationId === data.specializationId)
        if (specializationTemp.finishWorkHours != undefined) {
            if (specializationTemp.Hours == specializationTemp.finishWorkHours.toFixed(0))
                data.hide = true
        }


        return data
    })

    props.setDataEmployeeWithSpecialization(updatedataEmployeeWithSpecialization)
}

export { ViewEmployeeDetails };
export { VerificationEmployeeToJob };