

function Profile(props){

    console.log(props.books)
    const booksHTML = props.books.map(book => <div><h3>{book.title}</h3></div>)

    return(
        <>
        <div className='container'>
        <h1>Profile</h1>
        <div className='Library'>
            {booksHTML}
        </div>
        </div>
        </>
    )
}

export default Profile;