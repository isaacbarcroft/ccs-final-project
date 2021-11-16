
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import NoteIcon from '@mui/icons-material/Note';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';


function LeaderBoardCard(props) {

    // const members = props.allUsers?.map(user => user?.username.slice(0, 1).toUpperCase())
    const booksReadHTML = props.allUsers?.filter(book => book.username !== 'admin').map(user => {
        console.log(user)
        // const members = user?.map(name => name.slice(0, 1).toUpperCase())

        return (
            <div style={{ position: 'relative', marginBottom: '10px' }} className="header-body">
                <div className="row" style={{ justifyContent: 'left' }}>
                    <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0 ">
                            <div className="card-body  leaderboardStat">
                                <h4 style={{ display: 'flex', marginBottom: '10px' }}>{user.username.toUpperCase()}</h4>
                                {/* <div className="row"> */}
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Books Read</h5>
                                    <span className="h2 font-weight-bold mb-0">{user.books_read}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                        <i className="fas fa-chart-pie"><ImportContactsIcon /></i>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* <p className="mt-3 mb-0 text-muted text-sm">
                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                    <span className="text-nowrap">{user.username}</span>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    const pagesReadHTML = props.allUsers?.filter(book => book.username !== 'admin').map(user => {
        console.log(user)
        // const members = user?.map(name => name.slice(0, 1).toUpperCase())

        return (
            <div style={{ position: 'relative', marginBottom: '10px' }} className="header-body">
                <div className="row" style={{ justifyContent: 'left' }}>
                    <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0">
                            <div className="card-body  leaderboardStat">
                                <h4 style={{ display: 'flex' }}>{user.username.toUpperCase()}</h4>
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Pages Read</h5>
                                    <span className="h2 font-weight-bold mb-0">{user.pages_read}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                        <i className="fas fa-chart-pie"><NoteIcon /></i>
                                    </div>
                                </div>
                                {/* <p className="mt-3 mb-0 text-muted text-sm">
                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                    <span className="text-nowrap">{user.username}</span>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3 style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Oswald' }} >Book Totals</h3>
                    {booksReadHTML}
                </div>
                <div className="col-6">
                    <h3 style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Oswald' }} >Page Totals</h3>
                    {pagesReadHTML}
                </div>
            </div>



        </>
    )
}

export default LeaderBoardCard;