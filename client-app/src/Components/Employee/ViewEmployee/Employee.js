import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AlertAction } from './AlertActionModal';
import Typography from '@mui/joy/Typography';
import * as dayjs from 'dayjs'
import { ConfirmModal } from '../../Global/ConfirmModal';
import { EditEmployee } from './EditModal';

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const ButtonBootstrap = styled(Form.Control)`
  width:150px;
  background-color: green;
  color: white;
`
const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:5%;
`
const H1Container = styled.h1`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`
const TextFieldContaioner = styled.div`
    margin-top: 5%;
    margin-bottom: 1%;
`

const removeStartText = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Czy na pewno chcesz usunąć pracownika?</p>
    </Typography>
  )
}
const removeFinishText = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Poprawnie usunięto pracownika.</p>
    </Typography>
  )
}
const removeFinishTextAndUpdateWorks = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Poprawnie usunięto pracownika i zaktualizowwano prace w których uczestniczył.</p>
    </Typography>
  )
}
const editStartText = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Czy na pewno chcesz edytować pracownika?</p>
    </Typography>
  )
}
const editFinishTextAndUpdateWorks = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Poprawnie zaktualizowano dane pracownika i prace w których uczestniczył.</p>
    </Typography>
  )
}
const editFinishText = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Poprawnie zaktualizowano dane pracownika.</p>
    </Typography>
  )
}

const Employee = () => {

  const [dataListEmployee, setDataListEmployee] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchSurname, setSearchSurname] = useState('');
  const [searchSpecialization, setSearchSpecialization] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [employeInJobList, setEmployeInJobList] = useState({ employeeModifylist: [{ jobName: '', removeSpecialist: false }] });
  const [modalOpenAlert, setModalOpenAlert] = useState(false)
  const [message, setMessage] = useState();
  const [isRemove, setIsRemove] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false)
  const [nameEmployee, setNameEmployee] = useState('')
  const [employeeId, setEmployeeId] = useState()
  const [editModal, setEditModal] = useState(false)

  //te są do edycji
  const [dataListSpecializationAndExperience, setDataListSpecializationAndExperience] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dataSpecialization, setDataSpecialization] = useState([]);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios.get('http://localhost:5000/api/Employee/getEmployees', { params: { employerId: userId } })
      .then(response => {
        setDataListEmployee(response.data)
      })
  }, [])

  const addNewEmployee = () => {
    window.location.pathname = '/inzRafalRutkowski/employee/addEmployee';
  }
  const searchNewEmployee = () => {
    window.location.pathname = '/inzRafalRutkowski/employee/searchEmployee';
  }

  const removeEmployee = (id, item) => {
    setNameEmployee(item.name + " " + item.surname)
    setEmployeeId(id)


    axios.post('http://localhost:5000/api/Employee/checkEmployeeWork',
      { employeeId: id, isEdit: false })
      .then(response => {
        setEmployeInJobList(response.data)
        setIsRemove(true)
        setMessage(removeStartText)
        setModalOpenAlert(true)
      })
  }
  const editEmployee = (id, item) => {
    setNameEmployee(item.name + " " + item.surname)
    setEmployeeId(id)

    axios.get('http://localhost:5000/api/Employee/getEmployeeToEdit', { params: { employeeId: id } })
      .then(response => {
        setName(response.data.name)
        setSurname(response.data.surname)
        setDataListSpecializationAndExperience(response.data.dataListSpecializationAndExperience)

        axios.get('http://localhost:5000/api/Specialization', { params: { employerId: userId } })
          .then(response2 => {
            let tempDataSpecialization = response2.data
            response.data.dataListSpecializationAndExperience.map(x => {
              const index = tempDataSpecialization.findIndex(x2 => x2.id === x.specializationId)
              tempDataSpecialization.splice(index, 1)
            })
            setDataSpecialization(tempDataSpecialization)
            setEditModal(true)
          })
      })
  }

  const editWorks = () => {

    setModalOpenAlert(false)
    const data = employeInJobList


    if (isRemove === true) //usuwanie pracownika
    {
      axios.delete('http://localhost:5000/api/Employee', { params: { employeeId: employeeId } })
        .then(() => {
          const index = dataListEmployee.findIndex(x => x.employeeId === employeeId)
          const updateDataListEmployee = dataListEmployee.slice(0, index).concat(dataListEmployee.slice(index + 1))
          setDataListEmployee(updateDataListEmployee)
        })
    }
    else //edycja pracownika
    {
      axios.post('http://localhost:5000/api/employee/editEmployee', {
        employerId: userId, name: name, surname: surname, employeeId: employeeId,
        isEmployed: true, listSpecializationAndExperience: dataListSpecializationAndExperience
      }).then(() => {
        axios.get('http://localhost:5000/api/Employee/getEmployees', { params: { employerId: userId } })
          .then(response => {
            setDataListEmployee(response.data)
            setEditModal(false)
          })
      })
    }

    if (employeInJobList.modifyWorks === true) {
      data.employeeModifylist.map(x => {
        axios.get('http://localhost:5000/api/Job/GetLastUpdate', { params: { jobId: x.jobId } })
          .then(response => {

            let dataEmployeeWithSpecialization = []
            let dataStart
            let dataEnd
            let dataListSpecialization = []
            let listEmployeeAddToJobEdit = []
            let startDataInUpdate
            let listEmployeeAddToJob = []
            let endWorkDay
            let title
            let city
            let street
            let number
            let zip
            let name
            let surname

            if (data.removeSpecialist) //przy usuwaniu + przy edycji jeżeli specjalista zejdzie poniżej wymaganej wartośći
              response.data.listEmployeeAddToJob.map(x => {
                if (x.responsiblePersonEmployeeId !== null && x.responsiblePersonEmployeeId != employeeId &&
                  dataEmployeeWithSpecialization.find(x2 => x2.employeeId === x.responsiblePersonEmployeeId) === undefined) {
                  dataEmployeeWithSpecialization.push({
                    employeeId: x.responsiblePersonEmployeeId,
                    haveSpecialist: true,
                    name: x.responsiblePersonName,
                    surname: x.responsiblePersonSurname,
                    specializationName: x.specializationName,
                    specializationId: x.specializationId,
                  })
                }
              })
            else
              response.data.listEmployeeAddToJob.map(x => {
                if (x.responsiblePersonEmployeeId !== null &&
                  dataEmployeeWithSpecialization.find(x2 => x2.employeeId === x.responsiblePersonEmployeeId) === undefined) {
                  dataEmployeeWithSpecialization.push({
                    employeeId: x.responsiblePersonEmployeeId,
                    haveSpecialist: true,
                    name: x.responsiblePersonName,
                    surname: x.responsiblePersonSurname,
                    specializationName: x.specializationName,
                    specializationId: x.specializationId
                  })
                }
              })

            dataStart = dayjs(response.data.start);
            dataEnd = dayjs(response.data.end);
            title = response.data.title
            city = response.data.city
            street = response.data.street
            number = response.data.number
            zip = response.data.zip
            name = response.data.name
            surname = response.data.surname

            let needChangeHours = false

            if (dayjs(response.data.timeAddHistory).format('YYYY/MM/DD') < dayjs(new Date()).format('YYYY/MM/DD')
              && dayjs(response.data.start).format('YYYY/MM/DD') < dayjs(new Date()).format('YYYY/MM/DD')) // sprawdzanie czy obliczać przerobione godziny
              needChangeHours = true

            if (dayjs(response.data.start).format('YYYY/MM/DD') <= dayjs(new Date()).format('YYYY/MM/DD')) // sprawdzanie czy zmienic date rozpoczećia algorytmu
              startDataInUpdate = dayjs(new Date()).add(1, "day")
            else startDataInUpdate = dayjs(response.data.start)

            let day = 0;
            let date1 = dayjs(response.data.timeAddHistory)

            let wasUpdate = false

            if (response.data.listEmployeeAddToJob.find(x => x.finishWorkHours !== 0) !== undefined)
              wasUpdate = true
            else needChangeHours = true

            if (!wasUpdate) date1 = dayjs(response.data.start) //sprawdzanie czy choć raz był update
            else if (dayjs(response.data.timeAddHistory).format('YYYY/MM/DD') <= dayjs(response.data.start).format('YYYY/MM/DD')) // sprawdzanie od którego czasu obliczać godziny
              date1 = dayjs(response.data.start)

            let date2 = dayjs(new Date())

            if (date1.day() === 5 && // jeżeli w piatek zmienilismy i jest weekend
              (date1.add(1, 'day').format('YYYY/MM/DD') === date2.format('YYYY/MM/DD')
                || date1.add(2, 'day').format('YYYY/MM/DD') === date2.format('YYYY/MM/DD')))
              needChangeHours = false

            while (date1.format('YYYY/MM/DD') < date2.format('YYYY/MM/DD')) {

              if (date1.day() !== 6 && date1.day() !== 0)
                day++

              date1 = date1.add(1, 'day')
            }

            listEmployeeAddToJobEdit = response.data.listEmployeeAddToJob
            if (needChangeHours) {
              listEmployeeAddToJobEdit = response.data.listEmployeeAddToJob.map(x => {

                let workAllEmployeeInSpecializationIn1h = 0;

                x.employeeInJobList.map(x => {
                  workAllEmployeeInSpecializationIn1h += (x.experienceValue / 100)
                })
                x.finishWorkHours += (workAllEmployeeInSpecializationIn1h * 8 * day)
                return x
              })
            }
            else listEmployeeAddToJobEdit = response.data.listEmployeeAddToJob

            axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
              .then(response2 => {

                axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: x.jobId } })
                  .then(response3 => {

                    let tempResponseData = response3.data.listEmployeeAddToJob
                    tempResponseData.map(data => {
                      dataListSpecialization.push({
                        SpecializationId: data.specializationId, Hours: data.hoursStart,
                        SpecializationName: data.specializationName, disableUpdate: true,
                        finishWorkHours: listEmployeeAddToJobEdit.find(x => x.specializationId === data.specializationId).finishWorkHours
                      })

                      const i = response2.data.findIndex(x => x.id === data.specializationId)
                      response2.data.splice(i, 1)
                    })

                    axios.post('http://localhost:5000/api/Job/JobSpecialization',
                      {
                        JobSpecialization: dataListSpecialization, EmployerId: userId, start: dayjs(dataStart), end: dayjs(dataEnd), isUpdate: true, jobId: x.jobId,
                        dataEmployeeWithSpecialization: dataEmployeeWithSpecialization, removeSpecialist: data.removeSpecialist, employeeId: employeeId
                      })
                      .then(response4 => {
                        dataEmployeeWithSpecialization = response4.data.specializationList

                        if (isRemove) { //przy usuwaniu nie bierzemy pod obliczenia pracownika(jest w tej liscie bo lista jest pobierana z histori)
                          listEmployeeAddToJobEdit.map(x => {
                            var index = x.employeeInJobList.findIndex(x2 => x2.employeeId === employeeId)

                            if (index !== -1) {
                              x.employeeInJobList.splice(index, 1)
                            }
                          })
                        }

                        axios.post('http://localhost:5000/api/Job/JobEmployee',
                          {
                            listJobSpecializationEmployeeDTO: dataEmployeeWithSpecialization, JobSpecialization: dataListSpecialization, EmployerId: userId,
                            start: dayjs(startDataInUpdate), end: dayjs(dataEnd), EmployeeWithoutEmployer: false, IsUpdate: true,
                            ListEmployeeAddToJob: listEmployeeAddToJobEdit, justEdit: true, realStart: dataStart
                          })
                          .then(response5 => {
                            listEmployeeAddToJob = response5.data.listEmployeeInJob


                            dataEmployeeWithSpecialization.map(data => {
                              data.hours = dataListSpecialization.find(x => x.SpecializationId === data.specializationId).Hours
                              data.nameSurname = data.name + " " + data.surname
                            })

                            axios.post('http://localhost:5000/api/Job/UpdateTimeJob',
                              {
                                listEmployeeInJobDTOList: listEmployeeAddToJob, start: dayjs(dataStart),
                                listSpecialisationListEmployeeRemoveDTO: dataEmployeeWithSpecialization
                              })
                              .then(response6 => {
                                endWorkDay = response6.data.endWorkDay; listEmployeeAddToJob = response6.data.listEmployeeInJob

                                listEmployeeAddToJob.map(x => {
                                  const temp = dataEmployeeWithSpecialization.find(x2 => x2.specializationId === x.specializationId);
                                  x.responsiblePersonName = temp.name;
                                  x.responsiblePersonSurname = temp.surname
                                  x.responsiblePersonEmployeeId = temp.employeeId

                                  let listWithFinishWorkHours = listEmployeeAddToJobEdit.find(x2 => x2.specializationId === x.specializationId)

                                  if (listWithFinishWorkHours != undefined)
                                    x.finishWorkHours = listWithFinishWorkHours.finishWorkHours
                                  else x.finishWorkHours = 0;
                                })

                                //dodanie wykonanych prac
                                if (dataListSpecialization != undefined)
                                  dataListSpecialization.map(x => {
                                    if (listEmployeeAddToJob.find(x2 => x2.specializationId == x.SpecializationId) == undefined) {
                                      listEmployeeAddToJob.push({
                                        finishWorkHours: x.finishWorkHours,
                                        hoursStart: x.Hours,
                                        specializationId: x.SpecializationId,
                                        specializationName: x.SpecializationName,
                                        employeeInJobList: []
                                      })
                                    }
                                  })

                                //edycja pracy
                                let currentDate = new Date().toJSON().slice(0, 10);
                                
                                var estimate = { //w maperze pozniej konwertujemy to więc nie może być nullwoalne
                                  nameJob: '',
                                  addressJob: '',
                                  investor: '',
                                  typeJob: '',
                                  moneyPerHour: 0,
                                  createDate: currentDate,
                                  create: '',
                                  phone: '',
                                  fullCost: 0,
                                  listCost: [{ specializationName: "brak", cost: 0 }]
                                }


                                axios.post('http://localhost:5000/api/Job/editJob', {
                                  title: title, desc: "description", listEmployeeAddToJob: listEmployeeAddToJob, color: "",
                                  start: dayjs(dataStart), end: dayjs(dataEnd), EmployerId: userId, currentEnd: dayjs(endWorkDay),
                                  jobId: x.jobId, city: city, street: street, number: number, zip: zip,
                                  name: name, surname: surname, estimate: estimate, isEstimate: false
                                })
                                  .then(() => {
                                    if (isRemove === true)
                                      setMessage(removeFinishTextAndUpdateWorks)
                                    else setMessage(editFinishTextAndUpdateWorks)

                                    setConfirmModal(true)
                                  }
                                  )
                              })
                          })
                      })
                  })
              })
          })
      })
    }
    else {
      if (isRemove === true)
        setMessage(removeFinishText)
      else setMessage(editFinishText)

      setConfirmModal(true)
    }


  }

  const renerModalAlertAction = () => {
    return (
      <AlertAction setModalOpenAlert={setModalOpenAlert} modalOpenAlert={modalOpenAlert} nameTitle={"Pracownik " + nameEmployee} message={message}
        isRemove={isRemove} employeInJobList={employeInJobList} editWorks={editWorks} />
    )
  }
  const renderConfirmModal = () => {
    return (
      <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} message={message}
        nameTitle={"Pracownik " + nameEmployee} />
    )
  }
  const renderEditEmployeeModal = () => {
    return (
      <EditEmployee nameEmployee={nameEmployee} name={name} setName={setName} surname={surname} setSurname={setSurname}
        dataListSpecializationAndExperience={dataListSpecializationAndExperience} editModal={editModal} setModalOpenAlert={setModalOpenAlert}
        setDataListSpecializationAndExperience={setDataListSpecializationAndExperience} employeeId={employeeId}
        dataSpecialization={dataSpecialization} setDataSpecialization={setDataSpecialization} setEditModal={setEditModal}
        setEmployeInJobList={setEmployeInJobList} setIsRemove={setIsRemove} setMessage={setMessage} editStartText={editStartText} />
    )
  }

  return (
    <>
      {renerModalAlertAction()}
      {renderConfirmModal()}
      {renderEditEmployeeModal()}

      <TittleContainer>
        <h1>Pracownicy</h1>
      </TittleContainer>

      <Container>
        <TextFieldContaioner>
          <TextField
            onChange={(e) => setSearchName(e.target.value)}
            id="outlined-basic"
            label="Imie"
            variant="outlined" />
          <TextField
            onChange={(e) => setSearchSurname(e.target.value)}
            id="outlined-basic"
            label="Nazwisko"
            variant="outlined" />
          <TextField
            onChange={(e) => setSearchSpecialization(e.target.value)}
            id="outlined-basic"
            label="Specjalizacja"
            variant="outlined" />
          <TextField
            onChange={(e) => setSearchExperience(e.target.value)}
            id="outlined-basic"
            label="Doświadczenie"
            variant="outlined" />
        </TextFieldContaioner>

        <Sheet sx={{ height: 300, overflow: 'auto' }}>
          <Table
            stickyHeader
            stripe="odd"
            variant="outlined">
            <thead>
              <tr>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Specjalizacja</th>
                <th>Doświadczenie</th>
                <th>Edycja</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {dataListEmployee.filter((item) => {
                return searchName.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(searchName)
              })
                .filter((item) => {
                  return searchSurname.toLowerCase() === ''
                    ? item
                    : item.surname.toLowerCase().includes(searchSurname) || item.surname.includes(searchSurname)
                }).filter((item) => {
                  return searchSpecialization.toLowerCase() === ''
                    ? item
                    : item.specializationName.toLowerCase().includes(searchSpecialization) || item.specializationName.includes(searchSpecialization)
                }).filter((item) => {
                  return searchExperience.toLowerCase() === ''
                    ? item
                    : item.experienceName.toLowerCase().includes(searchExperience) || item.experienceName.includes(searchExperience)
                }).map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.specializationName}</td>
                    <td>{item.experienceName}</td>
                    <td>
                      <Button
                        disabled={item.employerId === null ? true : false}
                        onClick={() => editEmployee(item.employeeId, item)}
                        startIcon={<ManageAccountsIcon />}>Edycja
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={item.employerId === null ? true : false}
                        onClick={() => removeEmployee(item.employeeId, item)}
                        startIcon={<PersonRemoveIcon />}>Usuń
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Sheet>
      </Container>

      < ButtonContainer >
        <ButtonBootstrap
          type="submit"
          id="button"
          value="Dodaj pracownika"
          onClick={() => { addNewEmployee(); }}
        />
        <ButtonBootstrap
          type="submit"
          id="button"
          value="Szukaj pracownika"
          onClick={() => { searchNewEmployee(); }}
        />
      </ButtonContainer >
    </>
  )
}

export default Employee;