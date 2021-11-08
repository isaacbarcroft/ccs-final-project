import { useState } from 'react';
import Footer from '../Footer/Footer';
import Cookies from 'js-cookie';

function Groups(props) {
    const [group, setGroup] = useState([]);
    console.log({ group })
    function handleChange(event) {
        setGroup(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addGroup(group)
    }

    function handleMemberSubmit(event) {
        event.preventDefault();

    }
    async function joinGroup(id, name) {
        const groupName = {
            name,
        }
        console.log(name);
        // console.log({ id })
        console.log('delete function');
        const response = await fetch(`/api_v1/groups/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(groupName),
        });

        // const updatedBooks = props.goups.filter(group => book.id !== parseInt(event.target.id));
        // console.log({updatedBooks})
        //         setMyBooks(updatedBooks);
    }


    console.log(props.groups)
    const members = props.groups.map(group => group.members)
    const membersName = members.map(member => member)
    console.log({ membersName })
    console.log({ members })
    const groupsHTML = props.groups.map(group => {
        const members = group.members.map(member => <div><h4>{member.username}</h4></div>)
        return (
            <div className="mt-3 shadow p-3 mb-5 bg-body rounded mt-2"><h2>{group.name}</h2>
                <div><h4>Books</h4>
                    <h5>{group.books.title}</h5>
                    <p>{group.members.username}</p>
                    <button id={group.id} onClick={() => joinGroup(group.id, group.name)}>Join Group</button>
                </div>
                <h3>Members:
                    {members}</h3></div>);
    })

    return (
        <>
            <h1>Groups</h1>
            <div className="container" >
                <div className="row">
                    <div class="col-8">
                        {groupsHTML}

                    </div>


                    <div className="col">
                        <div className='addGroup'>
                            <h3>Add A Cluub</h3>
                            <nav className='nav-bar'></nav>
                            <form className="group-form" onSubmit={handleSubmit} >
                                <input type='text' placeholder="Add Group" name="new-group" onChange={handleChange} style={{ width: '50%' }} />
                                <button type='submit' className="btn btn-dark addGroup-btn">Add Group</button>
                            </form>
                        </div>

                    </div>
                </div>
                <div>
                    <div>
                        <h2 className="newArticleForm text-center mt-3">Find a Book</h2>
                        {/* <form id="form"className="mt-3 ds-flex justify-content-center mt-3" onSubmit={handleSubmit}>
                            <a name="form" ></a>
                            <div className="form-group text-left mb-3">
                                <label htmlFor='title'>Title</label>
                                <input type="text"
                                    className="form-control"
                                    id='bookTitle'
                                    placeholder="Title"
                                    onChange={}
                                    
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
                                    onChange={}
                                    
                                    name='author'
                                    value={}
                                />
                            </div>
                            <label htmlFor='body'>Category</label>
                            <input  className="form-control"
                                    onChange={handleCategoryChange} 
                                    name="categories" 
                                    value={}
                                    placeholder="Category"
                                    />
                            <label htmlFor=''>Add to Group</label>
                            <select> 
                                {groupsHTML}
                            </select>
                            <div className="form-group text-left mb-3 mt-3">
                                <button type="submit"
                                    className=" homeButton form-control  btn btn-dark"
                                    id='articleOptions'
                                    name='submit'
                                    value='SUBMIT'
                                >Submit</button>
                            </div>
                            
                        
                        </form> */}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Groups;