import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from "react-router-dom";
import StudentTable from "./StudentTable";

const GetStudentsByClass = () => {
    const { classNumber } = useParams()
    const { grade } = useParams()

    const [students, setStudents] = useState([])

    useEffect(() => {
        const getStudents = async () => {
            // const { data } = await axios.get('/students/getstudentsbyclass', {
            //     params: {
            //         className,
            //         grade
            //     },
            // })
            //const { data } = await axios.get(`/api/students/getstudentsbyclass`, {params: {classNumber, grade}})
            const { data } = await axios.get(`/api/students/getstudentsbyclass?grade=${grade}&classNumber=${classNumber}`)
            setStudents(data)
            console.log(data)
        }
        getStudents()
    },[])

    return (<>
        <>
        <StudentTable students={students}/>
            {/* <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.sort(function (a, b) {
                        return (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0;
                    }).map(s =>
                        <tr onClick={() => onRowClick(s.id)}>
                            <td>{s.firstName}</td>
                            <td>{s.lastName}</td>
                            <td>
                                {new Date().getMonth() > 9 ? parseInt(new Date().getFullYear()) - s.yearEnteredPrimary : parseInt(new Date().getFullYear()) - s.yearEnteredPrimary}
                            </td>
                        </tr>
                    )}

                </tbody>
            </table> */}

        </>


    </>)

}

export default GetStudentsByClass