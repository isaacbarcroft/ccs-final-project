import { useState } from 'react';
import Footer from '../Footer/Footer';
import Cookies from 'js-cookie';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Form from '../Form/Form';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BookComment from '../BookComment/BookComment';
import Group from '../Group/Group';




function Groups(props) {
    const [group, setGroup] = useState([]);

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

    async function joinGroup(id, name) {
        const groupName = {
            name,
        }
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

    const groupList = props?.groups?.map(group =>
        <div>
            <button className="btn btn-dark" onClick={props.getGroupComments} key={group.name} type="button" value={group.id}>{group.name}</button>
        </div>);




    //MEMBERS
    const members = props.groups.map(group => group.members)
    const membersName = members.map(member => member)
    // const groupsHTML = 
    // const groupName = props.groups.map(group => {
    //     const matches = group.name.match(/\b(\w)/g);
    //     const name = matches.join('')
    //     return name.toUpperCase();
    // })

    const groupHTML = props.groups.map(group => {

        const matches = group.name.match(/\b(\w)/g);
        const name = matches.join('')
        const nameHTML = name.toUpperCase();
        const members = group.members.map(member => <div><h5>{member.username.toUpperCase()}</h5></div>)
        const title = group.books?.map(book => <div><h5>{book.title}</h5></div>)

        return (
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/groups/${group.id}`}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', marginLeft: '5px' }} className="row group mt-3 shadow p-3 mb-5 rounded mt-3">
                    <div className="col bookDiv">
                        <div style={{ display: 'flex' }} >
                            <Avatar style={{ fontFamily: 'Mochiy Pop P One', backgroundColor: '#983b6a' }} className="groupAvatar" >{nameHTML}</Avatar>
                            <h2 className='groupTitle'>{group.name}</h2>
                        </div>
                        <div style={{ marginTop: '5px', color: 'black' }} className="border"></div>
                        <div style={{ marginBottom: '5px' }}><h4 style={{ fontFamily: 'Oswald', textAlign: 'start', marginLeft: '50px' }}>Books:</h4>
                            <h5 style={{ fontStyle: 'italic' }}>{title}</h5>
                        </div>
                        <div style={{ marginTop: '5px', marginLeft: '150px', marginRight: '150px' }} className="border"></div>
                        {/* <div className="col">
                            <p>{group.members?.username}</p>
                        </div> */}

                    </div>
                    <h4 style={{ textAlign: 'start', fontFamily: 'Oswald', marginLeft: '50px' }}>Members:
                    </h4>
                    <p>{members}</p>
                    {group.members?.username !== props.admin.username ? (
                        <button style={{ position: 'absolute', bottom: '15px', width: '20%', backgroundColor: '#3B983B' }} className='btn btn-dark joinGroupBtn' id={group.id} onClick={() => joinGroup(group.id, group.name)}>Join Group</button>
                    ) : (null)}
                </div></NavLink >);
    })

    return (
        <>
            <div className="splashImg">
                <div className="container " >

                    <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.3)', marginTop: '10px', borderRadius: '5px' }} className="row">
                        <h1 style={{ fontFamily: 'Oswald', display: 'flex', marginTop: '30px', marginLeft: '40px' }}>Groups</h1>
                        <div style={{ marginLeft: '40px' }} class="col-6">
                            {groupHTML}
                        </div>
                        <div className="col-4">
                            <div style={{ marginLeft: '100px' }} className='addGroup'>
                                <h3 style={{ fontFamily: 'Oswald', textAlign: 'left', marginLeft: '40px' }}>Start Group</h3>
                                <form className="group-form" onSubmit={handleSubmit} >
                                    <input type='text' placeholder="Add Group" name="new-group" onChange={handleChange} style={{ width: '50%', padding: '7px' }} />
                                    <button style={{ backgroundColor: '#3B983B' }} type='submit' className="btn btn-dark addGroup-btn mx-2">Add Group</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Groups;