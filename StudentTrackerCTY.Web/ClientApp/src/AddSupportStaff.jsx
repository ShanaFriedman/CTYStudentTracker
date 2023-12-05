import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSupportStaff = () => {
    const navigate = useNavigate()
    const [supportStaff, setSupportStaff] = useState({
        name: '',
        agency: ''
    })

    const onSupportStaffChange = e => {
        const copy = {...setSupportStaff}
        copy[e.target.name] = e.target.value 
        setSupportStaff(copy)
    }

    const onAddSupportStaff = async() => {
        await axios.post('/api/students/addsupportstaff', supportStaff)
        navigate('/supportstaff')
    }

    return <></>
}

export default AddSupportStaff