import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';
import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Form from '../Form/Form';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';


function GroupBookSearch(props) {
    const [pages, setPages] = useState();
    const [search, setSearch] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}

`
    function handleChange(e) {
        const { name, value } = e.target;
        // setCurrentBook(prevState => ({
        //     ...prevState,
        //     [name]: value,
        // }));
    }

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>


    let bookHTML;

    if (!props.books) {
        // bookHTML = <Spinner animation='grow' variant='primary' />
    } else {
        return bookHTML = props.books.items?.map(book => {
            const bookToSubmit = {
                author: book.volumeInfo.authors.toString(),
                title: book.volumeInfo.title,
                description: book.volumeInfo.description?.toString(),
                categories: book.volumeInfo.categories?.toString(),
                page_count: book.volumeInfo?.pageCount,
                group: props.group.name,
                finished: false,

            }
            const handleClick = (variant) => () => {

                enqueueSnackbar('Added to Group', { variant });
            };

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
                    <form>

                        <Button className="bookBtn btn btn-dark mx-1"
                            variant="contained"
                            type="submit"
                            onClick={handleClick('success')}>Add To Group

                        </Button>
                    </form>
                </div>)
        }
        )
    }



    return (
        <>

            <div className="container" >
                <div className="row">
                    <div class="col-6">
                        {bookHTML}
                    </div>
                    <div style={{ display: 'flex' }} className="shadow p-3 mb-5 bg-body rounded">
                        <Form setBooks={props.setBooks} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupBookSearch;