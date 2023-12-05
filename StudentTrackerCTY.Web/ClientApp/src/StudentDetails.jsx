import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddNotes from "./AddNotes";
import Upload from "./UploadFile";
const StudentDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isEditMode, setIsEditMode] = useState(false)
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        gradeEnteredPrimary: '',
        homeNumber: '',
        motherName: '',
        fatherName: '',
        motherCell: '',
        fatherCell: '',
        address: {
            id: '',
            address: '',
            city: '',
            state: '',
            zipCode: ''
        },
        notes: []
    })
    const [originalStudent, setOriginalStudent] = useState()

    const getStudentsDetails = async () => {
        //fix query string
        const { data } = await axios.get(`/api/students/getstudentbyid?id=${id}`)
        setStudent(data)
        setOriginalStudent(data)
    }

    useEffect(() => {
        getStudentsDetails()
    }, [])

    // const onEditModeChange = () => {
    //     setIsEditMode(!isEditMode)
    //     console.log(isEditMode)
    // }

    const onStudentChange = e => {
        const copy = { ...student }
        copy[e.target.name] = e.target.value
        setStudent(copy)
    }

    const onAddressDetailChange = e => {
        const address = { ...student.address }
        address[e.target.name] = e.target.value
        setStudent({ ...student, address })
        console.log(student)
    }
    const onDeleteClick = async () => {
        console.log(student)
        await axios.post('/api/students/DeleteStudent', { id: student.id })
        navigate('/')
    }
    const onUpdateClick = async () => {
        await axios.post('/api/students/editstudent', student)
        navigate("/")
    }
    const onCancelClick = () => {
        setIsEditMode(false)
        setStudent(originalStudent)
    }

    const onSubmitNote = async (note) => {
        await axios.post('/api/students/AddNote', { studentId: student.id, text: note })
        await getStudentsDetails()
    }

    const onDeleteNoteClick = async(note) => {
        await axios.post('/api/students/deletenote', note)
        await getStudentsDetails()
    }
    // const onUpload = async() => {
    //     window.location.href='/api/students/view'

    // }
    return (<>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-10">
                    <h1>{student.firstName} {student.lastName}</h1>
                </div>
                {!isEditMode && <><div className="col-md-1">
                    <button className="btn btn-outline-dark" onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
                </div>

                    <div className="col-md-1">
                        <button className="btn btn-outline-danger" onClick={onDeleteClick}>Delete</button>
                    </div></>}

                {isEditMode && <><div className="col-md-1">
                    <button className="btn btn-outline-secondary" onClick={onCancelClick}>Cancel</button>
                </div>

                    <div className="col-md-1">
                        <button className="btn btn-outline-primary" onClick={onUpdateClick}>Update</button>
                    </div></>}

            </div>

            <h4>Grade: {new Date().getMonth() > 9 ? parseInt(new Date().getFullYear()) - student.yearEnteredPrimary : parseInt(new Date().getFullYear()) - student.yearEnteredPrimary}</h4>

            {isEditMode ? <><div className="row mt-3">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Mother's Name</label>
                    <input type="text" className="form-control" placeholder="Mother's Name" onChange={onStudentChange} name='motherName' value={student.motherName} id="inputEmail4" />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Father's Name</label>
                    <input type="text" className="form-control" placeholder="Father's Name" onChange={onStudentChange} name='fatherName' value={student.fatherName} id="inputPassword4" />
                </div>

            </div>

                <div className="row mt-3">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4">Mother's Cell</label>
                        <input type="text" className="form-control" placeholder="Mother's Cell" onChange={onStudentChange} name='motherCell' value={student.motherCell} id="inputEmail4" />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4">Home Number</label>
                        <input type="text" className="form-control" placeholder="Home Number" onChange={onStudentChange} name='homeNumber' value={student.homeNumber} id="inputEmail4" />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4">Father's Cell</label>
                        <input type="text" className="form-control" placeholder="Father's Cell" onChange={onStudentChange} name='fatherCell' value={student.fatherCell} id="inputEmail4" />
                    </div>
                </div>




                <div className="form-group mt-3">
                    <label htmlFor="inputAddress">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Address"
                        name='address'
                        value={student.address.address}
                        onChange={onAddressDetailChange}
                    />
                </div>

                <div className="row mt-3">
                    <div className="col-7">
                        <input type="text" className="form-control" placeholder="City" name='city' value={student.address.city} onChange={onAddressDetailChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="State" name='state' value={student.address.state} onChange={onAddressDetailChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Zip" name='zipCode' value={student.address.zipCode} onChange={onAddressDetailChange} />
                    </div>
                </div>
                {/* <div className="row mt-3">
                    <div className="col-3"><button className="btn btn-dark" onClick={onCancelClick}>Cancel</button></div>
                    <div className="col-md-5"><button className="btn btn-dark" onClick={onUpdateClick}>Update</button></div>
                </div> */}
            </>

                : <>
                    <div className="row mt-3">
                        <div className="col-md-6"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <label>Mother's Name:   </label>
                            <span>   {' ' + student.motherName}</span>
                        </div>
                        <div className="col-md-6"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <label>Father's Name:   </label>
                            <h4>  {student.fatherName}</h4>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-4"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <label>Mother's Cell:   </label>
                                <h4>  {student.motherCell}</h4>
                            </div>
                            <div className="col-md-4"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <label>Home Number:   </label>
                                <h4>  {student.homeNumber}</h4>
                            </div>
                            <div className="col-md-4"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <label>Father's Cell:   </label>
                                <h4>  {student.fatherCell}</h4>
                            </div>
                        </div>

                        {/* <div>
                            <label htmlFor="inputEmail4">Mother's Name:</label>
                            <h3>{student.motherName}</h3>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Father's Name</label>
                            <input type="text" className="form-control" placeholder="Father's Name" onChange={onStudentChange} name='fatherName' value={student.fatherName} id="inputPassword4" />
                        </div> */}

                    </div>

                    {/* <div className="row mt-3">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Mother's Cell</label>
                            <input type="text" className="form-control" placeholder="Mother's Cell" onChange={onStudentChange} name='motherCell' value={student.motherCell} id="inputEmail4" />
                        </div>

                       

                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Home Number</label>
                            <input type="text" className="form-control" placeholder="Home Number" onChange={onStudentChange} name='homeNumber' value={student.homeNumber} id="inputEmail4" />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4">Father's Cell</label>
                            <input type="text" className="form-control" placeholder="Father's Cell" onChange={onStudentChange} name='fatherCell' value={student.fatherCell} id="inputEmail4" />
                        </div>
                    </div> */}


                    <div className="row mt-3">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <label>Address:   </label>
                            <h4>  {student.address.address} {student.address.city} {student.address.state} {student.address.zipCode}</h4>
                        </div>

                    </div>

                    {/* <div className="row mt-3">
                        <div className="col-6">
                            <button className="btn btn-dark" onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
                        </div>

                        <div className="col-6">
                            <button className="btn btn-dark" onClick={onDeleteClick}>Delete</button>
                        </div>
                    </div> */}

                    {/* <div className="form-group mt-3">
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputAddress"
                                placeholder="Address"
                                name='address'
                                value={student.address.address}
                                onChange={onAddressDetailChange}
                            />
                        </div> */}

                    {/* <div className="row mt-3">
                            <div className="col-7">
                                <input type="text" className="form-control" placeholder="City" name='city' value={student.address.city} onChange={onAddressDetailChange} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="State" name='state' value={student.address.state} onChange={onAddressDetailChange} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Zip" name='zipCode' value={student.address.zipCode} onChange={onAddressDetailChange} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3"><button className="btn btn-dark" onClick={onCancelClick}>Cancel</button></div>
                            <div className="col-md-5"><button className="btn btn-dark" onClick={onUpdateClick}>Update</button></div>
                        </div> */}
                    {/* {!!student.notes.length && <><div className="mt-2">
                        <h4>Notes:</h4>
                    </div>
                        {student.notes.map(n => <div className="row">
                            <div className="col-md-8 card card-body bg-light">
                                <div className="mt-1">{n.text}</div>
                                <div className="offset-11"><button className="btn btn-danger" onClick={() => onDeleteNoteClick(n)}>Delete</button></div>
                            </div>
                        </div>)}

                    </>} */}

                    <AddNotes studentId={student.id}
                        onAddNote={onSubmitNote}
                        notes={student.notes}
                        onDeleteNote={onDeleteNoteClick}/>
                        <Upload/>
                </>}

        </div >


    </>)
}

export default StudentDetails
