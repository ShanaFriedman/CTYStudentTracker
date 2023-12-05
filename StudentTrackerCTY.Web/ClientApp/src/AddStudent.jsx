import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navitate = useNavigate()
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        yearEnteredPrimary: '',
        homeNumber: '',
        motherName: '',
        fatherName: '',
        motherCell: '',
        fatherCell: '',
        classNumber: ''
    })
    const [addressDetails, setAddressDetails] = useState({
       
        address: '',
        city: '',
        state: '',
        zipCode: ''
    }

    )
    //maybe do loop (in useEffect)
    //const yearOptions = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

    const getYearList = () => {
        let startYear = new Date().getMonth() > 8 ? new Date().getFullYear() + 1 : new Date().getFullYear()
        const yearOptions = [startYear]
        for(let i = 1; i <= 10; i++){
            yearOptions.push(startYear - i)
            if(startYear - i <= 2018){
                break
            }
        }
        return yearOptions
    }

    const onStudentChange = (e) => {
        const copy = { ...student }
        copy[e.target.name] = e.target.value
        setStudent(copy)
        console.log(student)
    }

    const onAddressDetailChange = e => {
        const copy = { ...addressDetails }
        copy[e.target.name] = e.target.value
        setAddressDetails(copy)
    }

    const onAddStudentClick = async (e) => {
        e.preventDefault()
        //setStudent({ ...student, Address: addressDetails })
        student.address = addressDetails
        await axios.post('/api/students/addStudent', student)
        navitate('/')
    }

    let isButtonDisabled = !student.fatherCell || !student.fatherName || !student.firstName || !student.lastName || !student.homeNumber || !student.yearEnteredPrimary
    || !student.motherCell || !student.motherName ||  !addressDetails.address || !addressDetails.city || !addressDetails.state || !addressDetails.zipCode
    
    return (<><form><div className='container mt-5'>
        <div className="row mt-5">
            <div className="form-group col-md-5">
                {/* <label htmlFor="inputEmail4">First Name</label> */}
                <input type="text" className="form-control" placeholder="First Name" id="inputEmail4" onChange={onStudentChange} name='firstName' value={student.firstName} />
            </div>
            <div className="form-group col-md-5">
                {/* <label htmlFor="inputPassword4">Last Name</label> */}
                <input type="text" className="form-control" placeholder="Last Name" id="inputPassword4" onChange={onStudentChange} name='lastName' value={student.lastName} />
            </div>
            <div className="form-group col-md-2">
                {/* <label htmlFor="inputState">Year Entered Primary</label> */}
                <select id="inputState" placeholder="Year Entered Primary" value={student.yearEnteredPrimary} name='yearEnteredPrimary' onChange={onStudentChange} className="form-control">
                    <option selected="">Choose...</option>
                    {getYearList().map(yo => <option key={yo}>{yo}</option>)}
                </select>

            </div>
        </div>
        <div className="row mt-3">
            <div className="form-group col-md-4">
                {/* <label htmlFor="inputEmail4">Mother's Name</label> */}
                <input type="text" className="form-control" placeholder="Mother's Name" onChange={onStudentChange} name='motherName' value={student.MotherName} id="inputEmail4" />
            </div>
            <div className="form-group col-md-2">
                {/* <label htmlFor="inputEmail4">Mother's Cell</label> */}
                <input type="text" className="form-control" placeholder="Mother's Cell" onChange={onStudentChange} name='motherCell' value={student.MotherCell} id="inputEmail4" />
            </div>
            <div className="form-group col-md-4">
                {/* <label htmlFor="inputPassword4">Father's Name</label> */}
                <input type="text" className="form-control" placeholder="Father's Name" onChange={onStudentChange} name='fatherName' value={student.FatherName} id="inputPassword4" />
            </div>
            <div className="form-group col-md-2">
                {/* <label htmlFor="inputEmail4">Father's Cell</label> */}
                <input type="text" className="form-control" placeholder="Father's Cell" onChange={onStudentChange} name='fatherCell' value={student.FatherCell} id="inputEmail4" />
            </div>

        </div>


        <div className="form-group col-md-2">
                {/* <label htmlFor="inputState">Year Entered Primary</label> */}
                <select name='classNumber' onChange={onStudentChange} className="form-control">
                    <option selected="">Choose...</option>
                    <option key={'a'}>a</option>
                    <option key={'b'}>b</option>
                    <option key={'c'}>c</option>
                </select>

            </div>
        


        
        <div className="form-group col-md-2">
            {/* <label htmlFor="inputEmail4">Father's Cell</label> */}
            <input type="text" className="form-control" placeholder="Home Number" onChange={onStudentChange} name='homeNumber' value={student.homeNumber} id="inputEmail4" />
        </div>
        <div className="form-group mt-3">
            {/* <label htmlFor="inputAddress">Address</label> */}
            <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Address"
                name='address'
                value={addressDetails.address}
                onChange={onAddressDetailChange}
            />
        </div>

        <div className="row mt-3">
            <div className="col-7">
                <input type="text" className="form-control" placeholder="City" name='city' value={addressDetails.city} onChange={onAddressDetailChange} />
            </div>
            <div className="col">
                <input type="text" className="form-control" placeholder="State" name='state' value={addressDetails.state} onChange={onAddressDetailChange} />
            </div>
            <div className="col">
                <input type="text" className="form-control" placeholder="Zip" name='zipCode' value={addressDetails.zipCode} onChange={onAddressDetailChange} />
            </div>
        </div>




        {/* <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState" className="form-control">
                    <option selected="">Choose...</option>
                    <option>...</option>
                </select>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip" />
            </div>
        </div>
        <div className="form-group">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                </label>
            </div>
        </div> */}
        <button type="submit" className="btn btn-primary mt-3" disabled={isButtonDisabled} onClick={onAddStudentClick}>
            Add Student
        </button>
    </div>
    </form>
    </>)
}

export default AddStudent