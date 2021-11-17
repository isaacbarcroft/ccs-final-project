import { useState, useEffect } from 'react'
import LeaderBoardCard from '../LeaderBoardCard/LeaderBoardCard';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';

function LeaderBoard({ groups, users, books, isAuth }) {

    const [allUsers, setAllUsers] = useState();
    useEffect(() => {

        async function getAllBooks() {
            const response = await fetch(`/api_v1/books/stats/`);
            if (!response.ok) {
            } else {
                const data = await response.json();
                setAllUsers(data);
            }
        }
        getAllBooks();
    }, [, isAuth])

    const usersHTML = allUsers?.filter(user => user.username !== 'admin').map(user =>
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '5px' }} ClassName="row">
            <Avatar style={{ fontFamily: 'Mochiy Pop P One' }} className="avatar" sx={{ bgcolor: green[500], width: 30, height: 30 }}>{user.username.slice(0, 1).toUpperCase()}</Avatar>
            <li style={{ textAlign: 'left', listStyle: 'none', marginLeft: '5px', fontSize: 'calc(1.275rem + .3vw) ' }}>{user.username.toUpperCase()}</li>
        </div>
    )

    console.log({ allUsers })

    const allBooksRead = allUsers?.filter(book => book?.finished);
    const listOfUsers = [...new Set(allBooksRead?.map((user) => user.user_name))]
    const pagesRead = allBooksRead?.map(book => book?.finished === true ? book.page_count : 0);
    const userList = [...new Set(allBooksRead?.filter(book => book.user_name !== 'admin'))]
    const usersList = [...new Set(userList?.map(book => book.user_name.toUpperCase()))];

    //GROUP_HTML
    const groupHTML = groups?.map(group => <div style={{ paddingBottom: '5px' }} ><h4 style={{ textAlign: 'left', marginLeft: '10px', fontSize: 'calc(1.275rem + .3vw)' }}>{group.name}</h4></div>)

    return (
        <>
            <div className="splashImg">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div style={{ height: '70vh', overflow: 'scroll', backgroundColor: 'rgba(255,255,255,0.6)' }} className='leaderboard mt-3 shadow p-3 mb-5 rounded mt-2'>
                                <h2 style={{ textAlign: 'left', fontFamily: 'Oswald' }} >Leaderboard</h2>
                                <LeaderBoardCard style={{ flex: '1 1 250px' }} groups={groups} isAuth={isAuth} allUsers={allUsers} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{ height: '25vh', overflow: 'scroll', backgroundColor: 'rgba(255,255,255,0.6)' }} className="groups mt-3 shadow p-3 mb-5 rounded mt-2" >
                                <div>
                                    <h2 style={{ textAlign: 'left', fontFamily: 'Oswald' }}>Groups </h2>
                                    <div className='border'></div>
                                </div>
                                {groupHTML}
                            </div>
                            <div style={{ height: '25vh', overflow: 'scroll', backgroundColor: 'rgba(255,255,255,0.6)' }} className="groups mt-3 shadow p-3 mb-5 rounded mt-2" >
                                <div>
                                    <h2 style={{ textAlign: 'left', fontFamily: 'Oswald' }}>Users </h2>
                                    <div className='border'></div>
                                </div>
                                {usersHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaderBoard;