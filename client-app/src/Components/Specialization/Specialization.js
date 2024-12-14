import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from "@mui/material";
import Typography from '@mui/joy/Typography';
import { ConfirmModal } from '../Global/ConfirmModal';
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const ButtonBootstrap = styled(Form.Control)`
  width:200px;
  background-color: green;
  color: white;
`
const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:5%;
`
const TextFieldContaioner = styled.div`
    margin-top: 5%;
    margin-bottom: 1%;
`

const editText = () => {
  return (
    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
      <p>Zmiany zostały poprawanie dodane do systemu.</p>
    </Typography>
  )
}
const errorText = () => {
  return (
      <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
          <p>Przynajmniej jeden z pracowników ma ustawiony ten poziom doświadczenia.</p>
          <p>W przypadku chęci zmiany wartości należy poszukać go wśród pracowników oraz go zmienić, aby nikt nie.</p>
      </Typography>
  )
}
const removeText = () => {
  return (
      <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
          <p>Element został poprawnie usunięty.</p>
      </Typography>
  )
}
const Specialization = () => {
  const [listSpecializations, setListSpecializations] = useState([])
  const [searchName, setSearchName] = useState('');
  const [confirmModal, setConfirmModal] = useState(false)
  const [message, setMessage] = useState();

  const userId = sessionStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/specialization', { params: { employerId: userId } })
      .then(response => {
        setListSpecializations(response.data)
        console.log(response.data)
      })
  }, [])

  const addNewSpecialization = () => {
    navigate("/specialization/addSpecialization")
  }

  const changeName = (e, itemChange) => {
    const updateListSpecialization = listSpecializations.map(item => {
      if (item.id === itemChange.id) {
        item.name = e.target.value
        if (e.target.value === '') {
          item.errorName = true
          item.helperTextName = "Nazwa nie może być pusta"
        }
        else {
          item.errorName = false
          item.helperTextName = ""
        }
      }
      return item
    })
    setListSpecializations(updateListSpecialization)
  }

  const editSpecialization = (name, specializationId) => {

    let item = listSpecializations.find(x => x.id === specializationId)
    if (item.errorName === true) return

    console.log("test")
    console.log(name)
    console.log(specializationId)

    axios.post('http://localhost:5000/api/specialization', { name: name, id: specializationId })
      .then(
        setConfirmModal(true),
        setMessage(editText)
      )

  }

  const removeExperiance = (specializationId) => {
    axios.get('http://localhost:5000/api/specialization/checkCanModify', { params: { specializationId: specializationId, employerId: userId} })
        .then(response => {
            if (response.data === 0) {
                axios.delete('http://localhost:5000/api/specialization', { params: { specializationId: specializationId } })
                    .then(
                        setConfirmModal(true),
                        setMessage(removeText)
                    )
                let index = listSpecializations.findIndex(x => x.id === specializationId);
                let updateListSpecializations = listSpecializations.slice(0, index).concat(listSpecializations.slice(index + 1))
                setListSpecializations(updateListSpecializations)
            }
            else if(response.data === 1) {
                setConfirmModal(true)
                setMessage(errorText)
            }
        })
  }

  const renderConfirmModal = () => {
    return (
      <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} messageConfirmModal={message} nameTitleConfirmModal={"Specjalizacja"} />
    )
  }

  return (
    <>

      {renderConfirmModal()}

      <TittleContainer>
        <h1>Specjalizacje</h1>
      </TittleContainer>


      <Container>
        <TextFieldContaioner>
          <TextField
            onChange={(e) => setSearchName(e.target.value)}
            id="outlined-basic"
            label="Nazawa"
            variant="outlined" />
        </TextFieldContaioner>

        <Sheet sx={{ height: 300, overflow: 'auto' }}>
          <Table
            stickyHeader
            stripe="odd"
            variant="outlined">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Edycja</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {listSpecializations.filter((item) => {
                return searchName.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(searchName) || item.name.includes(searchName)
              }).map((item) => (
                <tr>
                  <td>
                    <TextField
                      error={item.errorName}
                      helperText={item.helperTextName}
                      disabled={item.employerId === null ? true : false}
                      value={item.name}
                      onChange={(e) => changeName(e, item)}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      style={{ width: 200 }}
                    />
                  </td>
                  <td>
                    <Button
                      disabled={item.employerId === null ? true : false}
                      onClick={() => editSpecialization(item.name, item.id)}
                      startIcon={<ManageAccountsIcon />}>Edycja
                    </Button>
                  </td>
                  <td>
                    <Button
                      disabled={item.employerId === null ? true : false}
                      onClick={() => removeExperiance(item.id)}
                      startIcon={<PersonRemoveIcon />}>Usuń
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Container >

      < ButtonContainer >
        <ButtonBootstrap
          type="submit"
          id="button"
          value="Dodaj specjalizacje"
          onClick={() => { addNewSpecialization(); }}
        />

      </ButtonContainer >
    </>
  )
}

export default Specialization;