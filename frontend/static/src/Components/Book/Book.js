import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory, Redirect } from 'react-router-dom';
import Form from '../Form/Form';


function Book(props) {

    const [pages, setPages] = useState();
    const [search, setSearch] = useState(false);


    let history = useHistory();

    const redirect = () => {
        history.push('/profile')
    }


    const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}
`





    // function handleBookList(event) {
    //     event.preventDefault();
    //     props.addBookToLibrary()
    // }
    // function handleBookLibrary() {

    // }

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>

    let bookHTML;



    if (!props.books) {
        bookHTML = <Spinner animation='grow' variant='primary' />
    } else {
        return bookHTML = props.books.items?.map(book => {
            console.log('book', book);
            const bookToSubmit = {
                author: book.volumeInfo.authors.toString(),
                title: book.volumeInfo.title,
                image: book.volumeInfo.imageLinks.thumbnail,
                description: book.volumeInfo.description?.toString(),
                categories: book.volumeInfo.categories?.toString(),
                page_count: book.volumeInfo.pageCount,

            }


            return (
                <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.imageLinks?.thumbnail ? <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
                    <p>{`Written by: ${book.volumeInfo.authors}`}</p>
                    <p>{book.volumeInfo.description ?
                        <HoverText><ReadMoreReact text={book.volumeInfo.description}
                            min={25}
                            ideal={50}
                            max={10000000}
                            style={{ cursor: 'pointer' }}
                            readMoreText={readMore} />
                        </HoverText> : null}</p>
                    {book.volumeInfo.categories ? <p>Category: {book.volumeInfo.categories}</p> : null}
                    {book.volumeInfo.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null}
                    <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(bookToSubmit, true)}>Add to Reading List</button>
                    <button className="btn btn-dark mx-1" typr='submit' onClick={() => props.addBookToLibrary(bookToSubmit, false)}>Add to Library</button>
                </div>)
        }
        )
    }


    const groupsHTML = props.groups?.map(group => <option value={group.name}>{group.name}</option>)
    return (
        <>

            <div className="container" >

                <div className="row">
                    <div class="col-6">
                        {bookHTML}
                    </div>
                    <div className="col shadow p-3 mb-5 bg-body rounded">
                        <div>
                            <button className="btn btn-dark" onClick={redirect} >Back to Profile</button>
                        </div>
                        <Form setBooks={props.setBooks} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book;