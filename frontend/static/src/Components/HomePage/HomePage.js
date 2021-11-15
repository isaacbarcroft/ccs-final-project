import { useState, useEffect } from 'react'


function LeaderBoard({ groups, users, books, isAuth }) {

    const [allBooks, setAllBooks] = useState();
    // const leaderboard = 
    useEffect(() => {

        async function getAllBooks() {
            const response = await fetch(`/api_v1/books/all/`);
            if (!response.ok) {
            } else {
                const data = await response.json();
                setAllBooks(data);
            }
        }
        getAllBooks();
    }, [, isAuth])

    const allBooksRead = allBooks?.filter(book => book?.finished);
    const listOfUsers = [...new Set(allBooksRead?.map((user) => user.user_name))]
    const userInfo = listOfUsers.map((user) => {
        return allBooksRead.filter((book) => book.user_name === user)

    })
    const next = userInfo.map((user) => {
        return user.map((book) => book.page_count).reduce((prevValue, currentValue) => prevValue + currentValue)
    })
    console.log({ userInfo })


    const user = allBooksRead?.filter(person => person.user_name)
    const pagesRead = allBooksRead?.map(book => book?.finished === true ? book.page_count : 0);
    const userList = [...new Set(allBooksRead?.filter(book => book.user_name !== 'admin'))]
    const usersList = [...new Set(userList?.map(book => book.user_name.toUpperCase()))];
    const activeUsers = usersList.map(name => <div style={{ textDecoration: 'none', ListStyleType: 'none' }}><li className="userLi" style={{ textDecoration: 'none' }}>{name}</li></div>);
    const userTotals = allBooksRead?.filter(book => book?.user_name);
    //PAGE_COUNT
    let total = 0;
    const booksRead = allBooks?.map(book => book?.finished === true ? total++ : null);
    const totalPages = pagesRead?.reduce((a, b) => a + b)
    //PAGE_COUNT

    //GROUP_HTML
    const groupHTML = groups.map(group => <div><h4>{group.name}</h4></div>)





    return (
        <>
            <div className="container">
                <h1>Home Page</h1>
                <div className='leaderboard mt-3 shadow p-3 mb-5 bg-body rounded mt-2'>
                    <h2>Leaderboard</h2>
                    <p>Total Pages Read:{parseFloat(totalPages)}</p>
                    <p>Chatty Users</p>
                    <ul style={{ textDecoration: 'none' }}>
                        {activeUsers}
                    </ul>
                </div>
                <div className="groups mt-3 shadow p-3 mb-5 bg-body rounded mt-2" >
                    <h2>Groups </h2>
                    {groupHTML}
                </div>
                <div className="newBooks mt-3 shadow p-3 mb-5 bg-body rounded mt-2" >
                    <h2>Books</h2>
                </div>
            </div>

        </>
    )
}

export default LeaderBoard;