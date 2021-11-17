import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import BookCard from '../EditBook/EditBook'
import BookCardUnfinished from '../EditUnfinished/EditUnfinished';
import Avatar from '@mui/material/Avatar';
import StatCard from '../StatCard/StatCard';

function Profile(props) {
  let history = useHistory();
  const [edit, setEdit] = useState(false);
  const [myBooks, setMyBooks] = useState();
  const [finished, setFinished] = useState();
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMyBooks({ ...myBooks, [name]: value });
  }

  useEffect(() => {

    async function getMyBooks() {
      const response = await fetch(`/api_v1/books/`);
      if (!response.ok) {
      } else {
        const data = await response.json();
        setMyBooks(data);
        props.setBooks();
      }
    }
    getMyBooks();
  }, [, props.isAuth])

  console.log({ myBooks })

  async function deleteBook(event) {
    const id = event.currentTarget.id;
    console.log(event.target.id)
    const response = await fetch(`/api_v1/books/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    } else {
      const updatedBooks = [...myBooks]
      console.log({ updatedBooks })
      const index = updatedBooks.findIndex(book => book.id == id);
      console.log({ index })
      updatedBooks.splice(index, 1);
      setMyBooks(updatedBooks);
    }

  }
  async function finishBook(book) {

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

  }
  const handleUpdate = async (updatedBook) => {

    delete updatedBook.finished;

    if (typeof updatedBook.image !== File) {
      delete updatedBook.image;
    }
    if (!updatedBook.group) {
      delete updatedBook.group;
    }
    if (!updatedBook.page_count) {
      delete updatedBook.page_count;
    }


    const formData = new FormData(); /// contructing key - value pairs
    const keys = Object.keys(updatedBook);
    keys.forEach(key => {
      if (typeof key === Boolean) {
        formData.append(key, JSON.stringify(updatedBook[key]));
      } else {
        formData.append(key, updatedBook[key]);
      }
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
  const totalPages = pagesRead ? pagesRead?.reduce((a, b) => a + b) : null;

  if (!props.isAuth) {
    return <Redirect to="/login" />
  }

  return (
    <>

      <div className="splashImg">
        <div className='container'>
          <header>
            <div style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
              <div>
                <h1 style={{ fontFamily: 'Oswald', color: 'white' }} className="d-flex justify-content-left">My Library</h1>
                <button className='btn btn-dark mt-2 d-flex justify-content-right' onClick={redirect} >Search</button>
              </div>
              <div style={{ marginTop: '10px' }}>
                <StatCard totalpages={totalPages} total={total} />
              </div>
            </div>
          </header>
          <div className="container" >

            <div className="row">
              <div className="col-6">
                <h2 style={{ fontFamily: 'Oswald', fontSize: '30px' }} >In Progress</h2>
                {unfinishedHTML}
              </div>
              <div className="col">
                <h2 style={{ fontFamily: 'Oswald', fontSize: '30px' }}>Have Read</h2>
                {booksListHTML}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile;