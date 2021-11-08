import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import BookCard from '../EditBook/EditBook'



// import MenuIcon from '@material-ui/icons/Menu';
// 
// 
// import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
// import { BookMarkAddIcon, BookmarkRemoveIcon} from '@material-ui/icons/Bookmark';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

function Profile(props) {
  let history = useHistory();
  const [edit, setEdit] = useState(false);
  console.log({ edit })
  const [myBooks, setMyBooks] = useState();

  const [editBook, setEditBook] = useState({
    options: '',
    comments: '',
    pages_read: null,

  })

  const redirect = () => {
    history.push('/books')
  }

  const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}
`
  const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>
  const types = ['No Good', 'Okay', 'Good Read', 'Loved It']
  const options = [...new Set(types?.map(book => book))];
  const optionsHTML = options.map(option => <option value={option}>{option}</option>)
  console.log(optionsHTML)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMyBooks({ ...myBooks, [name]: value });
  }

  useEffect(() => {

    async function getMyBooks() {
      const response = await fetch(`/api_v1/books/`);
      if (!response.ok) {
        console.log(response);
      } else {
        const data = await response.json();
        setMyBooks(data);
        console.log({ data })
        console.log({ myBooks })
      }
    }
    getMyBooks();
  }, [, props.isAuth])


  async function deleteBook(event) {
    console.log(event.target.id);
    console.log('delete function');
    const response = await fetch(`/api_v1/books/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });

    const updatedBooks = myBooks.filter(book => book.id !== parseInt(event.target.id));
    console.log({ updatedBooks })
    setMyBooks(updatedBooks);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ event })
    const formData = new FormData(); /// contructing key - value pairs
    // formData.append('title', book.title);
    // formData.append('body', book.body);
    formData.append('options', event.target.value);
    // formData.append('image', book.image);
    // formData.append('comments', books.comments);
    // formData.append('')

    const options = {
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    }
    fetch(`/api_v1/books/${event.id}/`, options);
    //  getMyBooks();
    console.log('eventID', event.id)

  }

  // const BookCard = ({ book }) => {
  //   console.log(book.finished)
  //   return (
  //     <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">{book.finished === true ? "Finished" : "Not Finished"}  
  // <h2>{book.title}</h2>
  // {book.image ? <img src={book.image} alt="" /> :  <p style={{width: '50%'}}className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p> }
  // <p>{`Written by: ${book.author}`}</p>
  // <p>{book.description ?
  // <HoverText><ReadMoreReact text={book.description}
  //                             min={25}
  //                             ideal={50}
  //                             max={10000000}
  //                             style={{cursor: 'pointer'}}
  //                             readMoreText={readMore}/>
  // </HoverText> : null }</p>
  // {book.categories ? <p>Category: {book.categories}</p> : null }
  // {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
  // {book.finished ? <div><p>My Thoughts: {book.comments}</p> 
  // <p>My Rating: <span className='font-italic'>{book.options}</span></p></div>
  // : null}
  // <button className="btn btn-dark mx-1 mb-5" type='submit' onClick={() => setEdit(true)}>Edit</button>
  // <button id={book.id} onClick={deleteBook} className="btn btn-dark mx-1 mb-5">Remove Book</button>

  // </div>
  //   )
  // }

  // const booksEditHTML = myBooks?.map(book => 
  //     <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">   
  //     <h2>{book.title}</h2>
  //     {book.image ? <img src={book.image} alt="" /> :  <p style={{width: '50%'}}className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p> }
  //     <p>{`Written by: ${book.author}`}</p>
  //     <p>{book.description ?
  //     <HoverText><ReadMoreReact text={book.description}
  //                                 min={25}
  //                                 ideal={50}
  //                                 max={10000000}
  //                                 style={{cursor: 'pointer'}}
  //                                 readMoreText={readMore}/>
  //     </HoverText> : null }</p>
  //     {book.categories ? <p>Category: {book.categories}</p> : null }
  //     {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
  //     <form onSubmit={handleSubmit}>
  //     <input onChange={handleChange} value={book.comments}/>
  //     <select>
  //     {optionsHTML}
  //     </select>
  //     <button className="btn btn-dark mx-1" type='submit'>Update</button>
  //     </form>
  //     </div>)


















  let booksHTML;
  if (myBooks) {
    booksHTML = myBooks.filter(book => !book.finished).map(book =>
      <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
        Not Finished
        <h2>{book.title}</h2>
        <IconButton color="primary" onClick={() => setEdit(true)}><EditIcon /></IconButton>
        <div className="iconHover">
          <a><BookmarkAddIcon /><span>Add Book</span></a></div>
        <BookmarkRemoveIcon />
        {book.image ? <img src={book.image} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
        <p>{`Written by: ${book.author}`}</p>
        <p>{book.description ?
          <HoverText><ReadMoreReact text={book.description}
            min={25}
            ideal={50}
            max={10000000}
            style={{ cursor: 'pointer' }}
            readMoreText={readMore} />
          </HoverText> : null}
        </p>
        {book.categories ? <p>Category: {book.categories}</p> : null}

        {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
        <div className=" mt-3 shadow p-3 mb-5 bg-body rounded mt-2"> {edit ? <div><form onSubmit={() => handleSubmit()}>
          <input onChange={handleChange} value={book.comments} />
          <select>
            {optionsHTML}
          </select>
          <button className="btn btn-dark mx-1" type='submit'>Update</button>
        </form>
        </div> :
          <div>
            <p>My Thoughts: {book.comments}</p>
            <p>My Rating: <span className='font-italic'>{book.options}</span></p>
            <button className="btn btn-dark mx-1 mb-5" type='submit' onClick={() => setEdit(true)}>Edit</button>
            <IconButton color="primary" onClick={deleteBook} id={book.id}><BookmarkRemoveIcon /></IconButton>
            <button id={book.id} onClick={deleteBook} className="btn btn-dark mx-1 mb-5">Remove Book</button>
          </div>}
        </div>
      </div>
    );
  }



  const booksListHTML = myBooks?.map(book => book.finished ?
    <div>
      {console.log(book)}
      <BookCard book={book} deleteBook={deleteBook}
        handleChange={handleChange} handleSubmit={handleSubmit}
        optionsHTML={optionsHTML} />
    </div>
    : null)



  const pagesRead = myBooks?.map(book => book?.finished === true ? book.page_count : 0);

  let total = 0;
  const booksRead = myBooks?.map(book => book?.finished === true ? total++ : null);
  console.log(booksRead)
  console.log({ total })
  console.log(pagesRead)
  const totalPages = pagesRead?.reduce((a, b) => a + b)
  console.log(parseFloat(totalPages))
  // var sum = 0;
  // for (var i = 0; i < pagesRead.length; i++) { sum += pagesRead[i]}
  // console.log({sum})

  if (!props.isAuth) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <div className='container'>
        <header>
          <div> Find a Book
            <button className='btn btn-dark' onClick={redirect} >Search</button>
          </div>
          <div className="mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
            <h3>Pages Read:{parseFloat(totalPages)}</h3>
            <h3>Books Read:{total}</h3>
          </div>

        </header>
        <div className="container" >
          <div className="row">
            <div class="col-6">
              <h1 className="ds-flex justify-content-center">Profile</h1>
              <div className='Library'>Saved
                {booksHTML}
              </div>
            </div>
            <div className="col"> Completed
              {booksListHTML}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile;