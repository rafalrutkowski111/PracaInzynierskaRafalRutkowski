import { useParams } from "react-router-dom";

const UpdateJob = (props) => {

    const params = useParams()
    console.log(params)
    return (
        <>test + {params.id}</>
    )
}

export default UpdateJob;