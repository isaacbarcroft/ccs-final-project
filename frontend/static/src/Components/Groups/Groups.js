import { useState } from 'react';
import Footer from '../Footer/Footer';

function Groups(props){
    const [group, setGroup] = useState([]);

    function handleChange(event){
        setGroup(event.target.value)
    }

   function handleSubmit(event){
       event.preventDefault();
       props.addGroup(group)
   }

   function handleMemberSubmit(event){
        event.preventDefault();
        
   }

   console.log(props.groups)
    const bookHTML = props.groups?.map(group => group)
    console.log({bookHTML})
    const preferenceRank = Object.fromEntries(
        Object.entries(props.groups).map(([key, { author }]) => [author, key])
      )
    const members = props.groups.map(group => group.members)
    const membersName = members.map(member => member)
    console.log({membersName})
    console.log({members})
   const groupsHTML = props.groups.map(group => <div><h2>{group.name}</h2>
                        <div><h4>Books</h4>
                        <h5>{group.books.title}</h5>
                        <p>{group.members.username}</p>
                        <button>Join Group</button>
                        </div></div>);

    return(
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
                <form  className="group-form" onSubmit={handleSubmit} >
                <input type='text' placeholder="Add Group" name="new-group" onChange={handleChange} style={{width: '50%'}} />
                <button type='submit' className="btn btn-dark addGroup-btn">Add Group</button>
                </form>
                </div>
                
            </div>
            <div className='addGroup'>
                <h3>Add A Member</h3>
                <nav className='nav-bar'></nav>
                <form  className="group-form" onSubmit={handleMemberSubmit} >
                <input type='text' placeholder="Add Group" name="new-group" onChange={handleChange} style={{width: '50%'}} />
                <button type='submit' className="btn btn-dark addGroup-btn">Add Member</button>
                </form>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Groups;