import Login from '../Login/Login';

function SplashPage(props) {

    return (
        <>
            <div className="splashImg" alt="" >
                {/* <img className='splashImg' src="media/books.jpeg" alt="" /> */}
                <Login isAuth={props.isAuth} setIsAuth={props.setIsAuth} users={props.users} setUsers={props.setUsers} />
            </div>
        </>
    )
}

export default SplashPage