import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, green } from '@mui/material/colors';


function Header(props) {
    if (props.admin.is_staff && props.isAuth) {

        return (
            <nav style={{ position: 'fixed' }} className="navbar navbar-expand-lg navbar-dark bg-dark nav">
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="container">
                    <a className="navbar-brand" style={{ fontFamily: 'Oswald', weight: 700, fontSize: '30px', color: "#4caf50" }} href="/">Book Brag</a>
                    <div className="username d-flex justify-content-center">
                        <p className="d-flex justify-content-center" style={{ color: 'white', fontFamily: 'Oswald', }}> <span style={{ fontWeight: 'bold', weight: 700, fontSize: '30px' }}>{`  ${props.admin.username.toUpperCase()}`}</span></p>
                    </div>

                    <div className="collapse navbar-collapse nav justify-content-end text-light" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto text-light">
                            <li className="nav-item mt-2 mx-1">
                                <NavLink className="" style={{ textDecoration: 'none' }} to='/leaderboard'>LeaderBoard</NavLink>
                            </li>
                            <li className="nav-item mx-1 mt-2">
                                <NavLink style={{ textDecoration: 'none', color: 'white', fontFamily: 'Oswald' }} to='/profile'>My Library</NavLink>
                            </li>

                            {/* <li className="nav-item mt-2 mx-1">
                                <NavLink style={{ textDecoration: 'none' }} to='/books'>Books</NavLink>
                            </li> */}
                            <li className="nav-item mt-2 mx-1">
                                <NavLink style={{ textDecoration: 'none' }} to='/groups'>Groups</NavLink>
                            </li>
                            {/* <li className="nav-item mt-2 mx-1">
                                <NavLink style={{textDecoration: 'none'}} to='/register'>Register</NavLink>
                            </li>
                            <li className="nav-item mt-2 mx-1">
                                <NavLink  style={{textDecoration: 'none'}} to='/login'>Login</NavLink>
                            </li> */}
                            <li className="btn-link">
                                <p style={{ textDecoration: 'none' }} className="btn btn-link logout text-light" type="button" onClick={() => props.handleLogoutSubmit()}>Logout</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    if (props.isAuth && !props.admin.is_staff) {

        return (

            <nav style={{ position: 'sticky' }} className="navbar navbar-expand-lg navbar-dark bg-dark nav">
                <div style={{ display: 'flex' }} className="container">
                    <a className="navbar-brand" style={{ fontFamily: 'Oswald', weight: 700, fontSize: '30px', color: "#4caf50" }} href="/">Book Brag</a>

                    <header style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 'auto' }} >
                        <div className="collapse navbar-collapse nav justify-content-end text-light" id="navbarResponsive">
                            <ul style={{ display: 'flex', alignItems: 'center' }} className="navbar-nav ml-auto text-light">
                                <li className="nav-item mx-1">
                                    <NavLink className="" style={{ textDecoration: 'none', color: 'white', fontFamily: 'Oswald' }} to='/leaderboard'>LeaderBoard</NavLink>
                                </li>
                                <li className="nav-item mx-1">
                                    <NavLink className="" style={{ textDecoration: 'none', color: 'white', fontFamily: 'Oswald' }} to='/profile'>My Library</NavLink>
                                </li>

                                {/* <li className="nav-item mt-2 mx-1">
                                <NavLink style={{ textDecoration: 'none' }} to='/books'>Books</NavLink>
                            </li> */}
                                <li className="nav-item mx-1">
                                    <NavLink style={{ textDecoration: 'none', color: 'white', fontFamily: 'Oswald' }} to='/groups'>Groups</NavLink>
                                </li>
                                {/* <li className="nav-item mt-2 mx-1">
                                <NavLink style={{textDecoration: 'none'}} to='/register'>Register</NavLink>
                            </li>
                            <li className="nav-item mt-2 mx-1">
                                <NavLink  style={{textDecoration: 'none'}} to='/login'>Login</NavLink>
                            </li> */}
                                <li className="mav-item mt-3">
                                    <p style={{ textDecoration: 'none', fontFamily: 'Oswald' }} className="btn btn-link logout text-light" type="button" onClick={() => props.handleLogoutSubmit()}>Logout</p>
                                </li>
                            </ul>
                            <div class="user">
                                <p className="mx-3 mt-3" style={{ color: 'white', fontFamily: 'Oswald', color: "#4caf50" }}> WELCOME <span style={{ fontWeight: 'bold', marginLeft: '5px', color: "#4caf50" }}>{`  ${props.admin.username.toUpperCase()}`}</span></p>
                            </div>
                            <Avatar style={{ fontFamily: 'Mochiy Pop P One' }} className="avatar" sx={{ bgcolor: green[500], width: 30, height: 30 }}>{props.admin.username.slice(0, 1).toUpperCase()}</Avatar>
                        </div>

                    </header>
                </div>
            </nav>
        )
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className="container">
                <a className="navbar-brand" style={{ fontFamily: 'Oswald', weight: 700, fontSize: '30px', color: "#4caf50" }} href="/">Book Brag</a>
                <div class="date">
                    {/* <p className="d-flex justify-content-center"style={{color: 'white', fontFamily: 'Oswald',}}>  {state.date.toLocaleDateString()}</p> */}
                </div>
                <div className="collapse navbar-collapse nav justify-content-end text-light" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto text-light">
                        {/* <li className="nav-item mt-2 mx-1">
                            <NavLink className="" style={{ textDecoration: 'none', color: 'white' }} to='/leaderboard'>Leader Board</NavLink>
                        </li> */}
                        {/* <li className="nav-item">
                            <NavLink to='/profile'>Profile</NavLink>
                        </li> */}

                        {/* <li className="nav-item mt-2">
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/books'>Books</NavLink>
                        </li> */}
                        <li className="nav-item mt-2 mx-1">
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/register'>Register</NavLink>
                        </li>
                        <li className="nav-item mt-2 mx-1">
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/login'>Login</NavLink>
                        </li>
                        <li className="btn-link">
                            <button style={{ textDecoration: 'none', color: 'white' }} className="btn btn-link logout text-light" type="button" onClick={() => props.handleLogoutSubmit()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header;