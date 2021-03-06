import Login from '../Login/Login';

function SplashPage(props) {

    return (
        <>
            <div className="splashImgMain" alt="" >
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px' }}>
                    <div style={{ marginTop: '50px' }} >
                        <Login isAuth={props.isAuth} setIsAuth={props.setIsAuth} users={props.users} setUsers={props.setUsers} />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column', marginLeft: '200px' }}>
                    <h3 style={{ fontFamily: 'Oswald', weight: '700', fontSize: '50px', color: "white" }}>Book Brag</h3>
                    <h4 style={{ fontFamily: 'Oswald', weight: '700', fontSize: '20px', color: "white", fontStyle: 'italic' }}>Reading + Wins</h4>
                </div>
            </div>


        </>
    )
}

export default SplashPage