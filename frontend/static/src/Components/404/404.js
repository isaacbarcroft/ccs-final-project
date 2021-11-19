import { useHistory } from 'react-router-dom'

function Four(props) {

    let history = useHistory();
    const redirect = () => {
        history.push('/leaderboard')
    }


    return (
        <>
            <div className="container">
                <div className="splashImgMain" alt="" >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }} >
                        <h1 style={{ color: 'white' }}>OOPS</h1>
                        <h3 style={{ color: 'white' }}>Page Not Found</h3>
                        <div>
                            <button style={{ backgroundColor: '#3B983B' }} className="btn btn-dark" type="button" onClick={redirect} >Go Back</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column', marginLeft: '100px' }}>
                        <h3 style={{ fontFamily: 'Oswald', weight: '700', fontSize: '50px', color: "white" }}>Book Brag</h3>
                        <h4 style={{ fontFamily: 'Oswald', weight: '700', fontSize: '20px', color: "white", fontStyle: 'italic' }}>Reading + Wins</h4>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Four;