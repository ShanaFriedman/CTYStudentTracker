import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    useEffect(() => {
        const getAllStudents = async () => {
            const { data } = await axios.get('/api/students/getallstudents')
            console.log(`data: ${data}`)
            setStudents(data)
        }
        getAllStudents()
        console.log(students)
    }, [])

    const onRowClick = (id) => {
        navigate(`/studentDetails/${id}`) 
        console.log(id)
    }

    // console.log(new Date())
    // const date = new Date()
    // console.log(date.getFullYear())

    return (<>
        <>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.sort(function(a, b) {
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
            </table>

        </>


    </>)
}
export default Home