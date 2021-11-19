import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Form(props) {

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [categories, setCategories] = useState();
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleAuthorChange(event) {
        setAuthor(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategories(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // props.submitMessage();
        const searchTerm = event.target.value;
        getBooks(title, author, categories);
        setTitle('');
        setAuthor('');
        setCategories('');

    }


    const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
    const API_KEY = '&key=AIzaSyCLgbfwe2wEaHpDS8n2XBRlU3rgv5Gz7DA';


    async function getBooks(title, author, categories) {
        const titles = title ? `+intitle:${title}` : '';
        const authors = author ? `+inauthor:${author}` : '';
        const category = categories ? `+subject:${categories}` : '';
        const response = await fetch(`${BASE_URL}${titles}${authors}${category}${API_KEY}`);
        if (!response.ok) {
            return null
        } else {
            const data = await response.json();
            props.setBooks(data);
        }
    }


    return (
        <>
            <div className="  shadow p-3 mb-5 bg-body rounded" >
                <div className="container formDiv relative">
                    <h2 className="newArticleForm text-center mt-3">Find a Book</h2>
                    <form id="form" className="mt-3 ds-flex justify-content-center mt-3 " onSubmit={handleSubmit}>
                        <a name="form" ></a>
                        <div style={{ display: 'flex', flexDirection: 'column' }} className="form-group text-left mb-3">
                            <label className="text-left label" htmlFor='title'>Title</label>
                            <input type="text"
                                className="form-control"
                                id='bookTitle'
                                placeholder="Title"
                                onChange={handleTitleChange}
                                name='title'
                                value={title}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} className="form-group text-left mb-3">
                            <label className="text-align-left label" htmlFor='body'>Author</label>
                            <input type="text"
                                className="form-control"
                                id='bookAuthor'
                                placeholder="Author"
                                onChange={handleAuthorChange}

                                name='author'
                                value={author}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} className="form-group text-left mb-3">
                            <label className="text-align-left label" htmlFor='body'>Category</label>
                            <input className="form-control"
                                onChange={handleCategoryChange}
                                name="categories"
                                value={categories}
                                placeholder="Category"
                            />
                        </div>
                        <div className="form-group text-left mb-3 mt-3">
                            {/* <label htmlFor='options'>Draft/Submitted</label> */}
                            <button
                                style={{ backgroundColor: '#3B983B' }}
                                type="submit"
                                className=" homeButton form-control  btn btn-dark"
                                id='articleOptions'
                                name='submit'
                                value='SUBMIT'
                            >Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Form;