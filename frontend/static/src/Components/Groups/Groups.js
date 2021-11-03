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

   console.log(props.groups)
    const bookHTML = props.groups?.map(group => group)
    console.log({bookHTML})
   const groupsHTML = props.groups.map(group => <div><h2>{group.name}</h2>
                        <div><h4>Books</h4>
                        <h5>{group.books.title}</h5>
                        <button>Add Member</button>
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
                <button type='submit' className="btn btn-dark addGroup-btn">Add Goup</button>
                </form>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Groups;