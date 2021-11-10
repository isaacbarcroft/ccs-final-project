import { useState } from 'react';
import Footer from '../Footer/Footer';
import Cookies from 'js-cookie';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Form from '../Form/Form';
import { Redirect, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BookComment from '../BookComment/BookComment';
import Group from '../Group/Group';



function Groups(props) {
    const [group, setGroup] = useState([]);
    console.log({ group })
    let history = useHistory();
    const redirect = () => {
        history.push('/group')
    }


    function handleChange(event) {
        setGroup(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addGroup(group)
        setGroup('');
    }

    console.log('selectedBook', props.selectedBook)
    async function joinGroup(id, name) {
        const groupName = {
            name,
        }
        console.log(name);
        // console.log({ id })
        console.log('JOIN GROUP');
        const response = await fetch(`/api_v1/groups/${id}/groups/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(groupName),
        });

        if (!response.ok) {
            throw new Error('Network response was not OK');
        } else {
            const data = await response.json();
            const updatedGroup = [...props.groups];
            const index = updatedGroup.findIndex(group => group.id === data.id);
            updatedGroup[index] = data;
            props.setGroups(updatedGroup);
        }
    }
    //Comments
    console.log('comments', props.comments)
    console.log('select', props.selectedBook)





    //MEMBERS
    const members = props.groups.map(group => group.members)
    const membersName = members.map(member => member)
    console.log({ membersName })
    console.log({ members })
    // const groupsHTML = <Group groups={props.groups} selectedBook={props.selectedBook}
    //     comments={props.comments} setComments={props.setComments}
    //     groups={props.groups} setGroups={props.setGroups}
    //     addGroup={props.addGroup} setBooks={props.setBooks}
    //     joinGroup={joinGroup}

    // />

    const groupHTML = props.groups.map(group => {
        const members = group.members.map(member => <div><h4>{member.username}</h4></div>)
        return (
            <div className="group mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                <div>
                    <button className='btn btn-dark' onClick={redirect} >Book Search</button>
                </div>
                <h2 className='groupTitle'>{group.name}</h2>
                <Avatar style={{ fontFamily: 'Mochiy Pop P One', position: 'absolute', right: '10px' }} className="groupAvatar" sx={{ bgcolor: deepPurple[500] }}>{group.name.slice(0, 1).toUpperCase()}</Avatar>
                <div><h4>Books</h4>
                    <h5 >{group.books?.title}</h5>
                    <p>{group.members.username}</p>
                    <h2>Comments</h2>
                    <BookComment comments={props.comments} />
                    <button className='btn btn-dark joinGroupBtn' id={group.id} onClick={() => joinGroup(group.id, group.name)}>Join Group</button>
                </div>
                <h3>Members:
                    {members}</h3></div>);
    })

    return (
        <>
            <h1>Groups</h1>
            <div>
                <button className='btn btn-dark' onClick={redirect} >Book Search</button>
            </div>
            <div className="container" >
                <div className="row">
                    <div class="col-8">
                        {groupHTML}

                    </div>


                    <div className="col">
                        <div className='addGroup'>
                            <h3>Add A Club</h3>
                            <nav className='nav-bar'></nav>
                            <form className="group-form" onSubmit={handleSubmit} >
                                <input type='text' placeholder="Add Group" name="new-group" onChange={handleChange} style={{ width: '50%' }} />
                                <button type='submit' className="btn btn-dark addGroup-btn">Add Group</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Groups;