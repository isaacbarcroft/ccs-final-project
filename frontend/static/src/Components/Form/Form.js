import { useState } from 'react';


function Form(props) {

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [categories, setCategories] = useState();
    console.log({ props })
    function handleTitleChange(event) {
        setTitle(event.target.value);
        console.log(title)
    }

    function handleAuthorChange(event) {
        setAuthor(event.target.value);
        console.log(author)
    }

    function handleCategoryChange(event) {
        setCategories(event.target.value);
        console.log(categories)
    }

    function handleSubmit(event) {
        event.preventDefault();

        // props.submitMessage();
        // console.log(props)
        const searchTerm = event.target.value;
        console.log({ searchTerm })
        console.log({ title })
        console.log({ author })
        getBooks(title, author, categories);
        setTitle('');
        setAuthor('');
        setCategories('');

    }


    const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
    const API_KEY = '&key=AIzaSyCLgbfwe2wEaHpDS8n2XBRlU3rgv5Gz7DA';


    async function getBooks(title, author, categories) {
        console.log(title, author, categories);
        const titles = title ? `+intitle:${title}` : '';
        const authors = author ? `+inauthor:${author}` : '';
        const category = categories ? `+subject:${categories}` : '';
        const response = await fetch(`${BASE_URL}${titles}${authors}${category}${API_KEY}`);
        if (!response.ok) {
            console.log(response);
        } else {
            const data = await response.json();
            props.setBooks(data);
            console.log(`${BASE_URL}${titles}${authors}${category}${API_KEY}`)
        }
    }


    return (
        <>
            <div className="container">
                <h2 className="newArticleForm text-center mt-3">Find a Book</h2>
                <form id="form" className="mt-3 ds-flex justify-content-center mt-3" onSubmit={handleSubmit}>
                    <a name="form" ></a>
                    <div className="form-group text-left mb-3">
                        <label htmlFor='title'>Title</label>
                        <input type="text"
                            className="form-control"
                            id='bookTitle'
                            placeholder="Title"
                            onChange={handleTitleChange}
                            name='title'
                            value={title}
                        />
                    </div>
                    <div className="form-group text-left mb-3">
                        <label htmlFor='body'>Author</label>
                        <input type="text"
                            className="form-control"
                            id='bookAuthor'
                            placeholder="Author"
                            onChange={handleAuthorChange}

                            name='author'
                            value={author}
                        />
                    </div>
                    <label htmlFor='body'>Category</label>
                    <input className="form-control"
                        onChange={handleCategoryChange}
                        name="categories"
                        value={categories}
                        placeholder="Category"
                    />
                    <label htmlFor=''>Add to Group</label>
                    <div className="form-group text-left mb-3 mt-3">
                        {/* <label htmlFor='options'>Draft/Submitted</label> */}
                        <button type="submit"
                            className=" homeButton form-control  btn btn-dark"
                            id='articleOptions'
                            name='submit'
                            value='SUBMIT'
                        >Submit</button>
                    </div>


                </form>
            </div>

        </>
    )
}

export default Form;