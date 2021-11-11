import { useState } from 'react';
import Form from '../Form/Form';
import { Redirect, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BookComment from '../BookComment/BookComment';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import ReadMoreReact from 'read-more-react';
import Spinner from 'react-bootstrap/Spinner';
import GroupBookSearch from '../GroupBookSearch/GroupBookSearch';


function Group(props) {

    const [comment, setComment] = useState('');

    function handleCommentChange(event) {
        setComment(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        props.submitComment(comment, props.books);
        console.log(props)
        setComment('');
        props.getComments(event)
    }


    const HTML = props.groups.map(group => {
        const matches = group.name.match(/\b(\w)/g);
        const name = matches.join('')
        const nameHTML = name.toUpperCase();

        const members = group.members.map(member => <div><h4>{member.username}</h4></div>)
        const books = group.books.map(book =>
            <div id={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <img src={book.image} />
            </div>)
        return (
            <div className="group mt-3 shadow p-3 mb-5 bg-body rounded mt-2" id={group.id} ><h2 className='groupTitle'>{group.name}</h2>
                <Avatar style={{ fontFamily: 'Mochiy Pop P One', position: 'absolute', right: '10px' }} className="groupAvatar" sx={{ bgcolor: deepPurple[500] }}>{nameHTML}</Avatar>
                <div id={group.id}>
                    {/* <h4>Books</h4>
                    <h5 >{group.books?.title}</h5>
                    <p>{group.members.username}</p>
                    <h2>Comments</h2>
                    <BookComment comments={props.comments} /> */}
                    <button className='btn btn-dark joinGroupBtn' id={group.id} onClick={() => props.joinGroup(group.id, group.name)}>Join Group</button>
                </div>
                <h3>Members: {members}</h3>
                <h3>Books: {books}</h3>
                <GroupBookSearch />
            </div>);
    })

    return (
        <>
            {HTML}
            <form className="Comments-form" onSubmit={handleSubmit}>

                {/* <textarea name="text" value={ } type="text" placeholder={`Comments  #${props.selectedBook?.name}`} onChange={handleCommentChange} /> */}
                <button type="submit" className="submit_btn">Submit</button>
            </form>

        </>
    )
}

export default Group;