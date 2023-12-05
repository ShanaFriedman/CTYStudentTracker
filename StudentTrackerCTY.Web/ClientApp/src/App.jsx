import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
//import AddStudents from './AddStudents';
import AddStudent from './AddStudent';
import Home from './Home';
import StudentDetails from './StudentDetails';
import AddSupportStaff from './AddSupportStaff';
import SupportStaff from './SupportStaff';
import RealHome from './RealHome';
import GetStudentsByClass from './GetStudentsByClass';

const App = () => {
    return(
        <Layout>
             <Routes>
                <Route exact path='/' element={<RealHome/>}/>
                <Route exact path='/allstudents' element={<Home/>}/>
                <Route exact path='/addstudent' element={<AddStudent/>}/>
                <Route exact path='/studentdetails/:id' element={<StudentDetails/>}/>
                <Route exact path='/addsupportstaff' element={<AddSupportStaff/>}/>
                <Route exact path='/supportstaff' element={<SupportStaff/>}/>
                <Route exact path='/getstudentsbyclass/:grade/:classNumber' element={<GetStudentsByClass/>}/>
            </Routes>
        </Layout>
       
    )

}
// class App extends React.Component {

//     state = {
//         count: 0
//     }

//     onButtonClick = () => {
//         this.setState({ count: this.state.count + 1 });
//     }

//     render() {
//         return (
//             <div className="app-container">
//                 <div className="d-flex flex-column justify-content-center align-items-center">
//                     <h1>Welcome to React</h1>
//                     <button onClick={this.onButtonClick} className="btn btn-primary mb-3">Click me</button>
//                     <h2>{this.state.count}</h2>
//                 </div>
//             </div>
//         );
//     }
// };

export default App;