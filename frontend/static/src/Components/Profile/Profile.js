import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import BookCard from '../EditBook/EditBook'
import BookCardUnfinished from '../EditUnfinished/EditUnfinished';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

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

  // console.log(optionsHTML)

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
    if (!response.ok) {
      throw new Error('Network response was not OK');
    } else {
      const updatedBooks = [...myBooks]
      const index = updatedBooks.findIndex(book => book.id === event.target.id);
      updatedBooks.splice(index, 1);
      setMyBooks(updatedBooks);
    }

  }
  async function finishBook(book) {
    // console.log(event.target.id);
    // console.log('finish function');

    const updatedBook = {
      finished: true,
      pages_read: book.page_count,
    }
    // book.finished = true;
    // book.pages_read = book.page_count;
    const response = await fetch(`/api_v1/books/${book.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Network response was not OK');
    } else {
      const data = await response.json();
      const updatedBooks = [...myBooks];
      const index = updatedBooks.findIndex(book => book.id === data.id);
      updatedBooks[index] = data;
      setMyBooks(updatedBooks);

    }


    // setMyBooks(updatedBooks)
  }
  const handleUpdate = async (updatedBook) => {

    delete updatedBook.finished;

    if (typeof updatedBook.image !== File) {
      delete updatedBook.image;
    }

    console.log(typeof updatedBook.finished)

    const formData = new FormData(); /// contructing key - value pairs
    const keys = Object.keys(updatedBook);
    keys.forEach(key => {
      if (typeof key === Boolean) {
        formData.append(key, JSON.stringify(updatedBook[key]));
      } else {
        formData.append(key, updatedBook[key]);
      }
      console.log({ updatedBook })
    });

    const options = {
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    }
    const response = await fetch(`/api_v1/books/${updatedBook.id}/`, options);
    if (!response.ok) {
      console.log(response);
    } else {
      const data = await response.json();
      const books = [...myBooks];
      const index = myBooks.findIndex(book => book.id === updatedBook.id);
      books[index] = data;
      setMyBooks(books);
    }
  }

  const unfinishedHTML = myBooks?.map(book => !book.finished ?
    < div >
      {console.log(book)}
      < BookCardUnfinished
        book={book}
        finishBook={finishBook}
        deleteBook={deleteBook}
        handleUpdate={handleUpdate}
        options={options} />
    </div > :
    null)


  const booksListHTML = myBooks?.map(book => book.finished ?
    <div>
      {console.log(book)}
      <BookCard
        book={book}
        handleUpdate={handleUpdate}
        deleteBook={deleteBook}
        options={options} />
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
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{props.admin.username.slice(0, 1).toUpperCase()}</Avatar>
          <div>
            <button className='btn btn-dark mt-2' onClick={redirect} >Book Search</button>
          </div>
          <div className="mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
            <h3>Pages Read:{parseFloat(totalPages)}</h3>
            <h3>Books Read:{total}</h3>
            {/* <CircularProgress variant="determinate" value={75} /> */}
          </div>

        </header>
        <div className="container" >
          <div className="row">
            <div class="col-6">
              <h1 className="ds-flex justify-content-center">Profile</h1>
              <div className='Library'>Saved
                {unfinishedHTML}
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