import axios from "axios";

const ViewEmployeeDetails = (props) => {

    axios.get('http://localhost:5000/api/Employee/employeeSearch', { params: { id: props.idEmployee } })
        .then(response => {
            props.setDataEmployee(response.data)
        })
    if (props.isViewSpecialist)
        props.setViewSpecialist(true)
    else props.setViewSpecialist(false)
    props.setModalOpenViewEmployee(true)
}

export { ViewEmployeeDetails };