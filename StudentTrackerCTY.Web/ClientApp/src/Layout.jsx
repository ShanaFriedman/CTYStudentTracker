import React from 'react';
import {Link} from 'react-router-dom';

const Layout = ({children}) => {
    console.log("layout")

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">CTY Student Tracker</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/" className='nav-link text-light'>Students</Link></li>
                                <li className="nav-item"><Link to="/allstudents" className='nav-link text-light'>All Students</Link></li>
                                <li className="nav-item"><Link to="/AddStudent" className='nav-link text-light'>Add Students</Link></li>
                                <li className="nav-item"><Link to="/addsupportstaff" className='nav-link text-light'>Add Support Staff</Link></li>
                                <li className="nav-item"><Link to="/supportstaff" className='nav-link text-light'>Support Staff</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{marginTop: 60}}>
                {children}
            </div>
        </div>
    )
}

export default Layout;
