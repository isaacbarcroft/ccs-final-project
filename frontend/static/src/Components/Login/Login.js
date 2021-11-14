import { useState } from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect, withRouter } from 'react-router-dom';


function Login(props) {
    function handleInput(event) {
        const { name, value } = event.target;
        props.setUsers(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    function handleError(err) {
        console.warn(err);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(props.users),
        };
        const response = await fetch('/rest-auth/login/', options).catch(handleError);
        if (!response) {
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            props.setIsAuth(true)

            // (props.isAuth ? <Redirect to="")
        }
    }

    if (props.isAuth) {
        return <Redirect to="/profile" />
    }


    return (

        <>
            <h2 className='Login-title  d-flex justify-content-center mt-3  shadow p-3 mb-5 bg-body rounded' style={{ fontFamily: 'Oswald' }}>Login</h2>
            <div className="container container-md mt-4 shadow p-3 mb-5 bg-body rounded mt-2">

                <form className="form-signin form  d-flex justify-content-center mt-3" onSubmit={handleSubmit} >
                    <input type='text'
                        className="form-user mx-3"
                        id="username"
                        placeholder="Enter Username"
                        required
                        name="username"
                        onChange={handleInput}
                        value={props.users.username}
                    />

                    <input type='password'
                        id='password'
                        placeholder="Enter Password"
                        required
                        name="password"
                        onChange={handleInput}
                        value={props.users.password}
                    />

                    <div className="row">
                        <div className="text-center">
                            <button type="submit" className="homeButton Login-btn btn btn-dark mx-3" style={{ fontFamily: 'Oswald' }}>Login</button>
                        </div>
                    </div>


                </form>

                <h2 className=" d-flex justify-content-center mt-4" style={{ fontFamily: 'Oswald' }}>Need to Register?</h2>
                <div className="container">
                    <div className="row">
                        <div class="col text-center">
                            <button type="button" className="homeButton btn btn-dark" style={{ fontFamily: 'Oswald' }} onClick={<Redirect to='/register' />}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;