import React from 'react';

const LightTheme = (props) => {
    return ( 
        <div className="container" style={{backgroundColor:"rgba(228, 228, 228, 0.952)"}}>
        <div className="header">
            <h1 style={{color: "black"}}>TODO</h1>
            <img className="sun-icon" src="./sun_dark.png" alt="sun icon" onClick={props.changeTheme}/>
        </div>
        <ul className="ul">
            <li className="item-light">
                <input className="radio" type="radio" onClick={props.addTask}/>
                <input className="item-input-light" type="text" name="todo" onChange={props.handleChange} value={props.newTask.todo} placeholder="Create a new todo..."></input>
            </li><br/>                    
            {props.tasks.length === 0 ? "" :props.displayedTasks.map((task, ind) => {
                return <li className="item-light" key={ind}><input className="radio" type="radio" onClick={() => props.completeTask(ind)} value={ind} checked={task.completed ? true : false} readOnly/><span className={task.completed ? "item-text-finished-light" : "item-text-unfinished-light"}>{task.todo}</span></li>
            })}
            <li className="item-light">
                <div className="list-footer-light">                            
                    <span className="item-text-unfinished-light" style={{color: "black"}}>{`${props.incompleteTasks.length} items left`}</span>
                        <span className="filters">
                            <button className="button-link-light" style={props.activeFilter === 0 ? {color: "rgb(56, 103, 208)"} : {color: "black"}} onClick={() => props.filter(0)}>All</button>
                            <button className="button-link-light" style={props.activeFilter === 1 ? {color: "rgb(56, 103, 208)"} : {color: "black"}} onClick={() => props.filter(1)}>Active</button>
                            <button className="button-link-light" style={props.activeFilter === 2 ? {color: "rgb(56, 103, 208)"} : {color: "black"}} onClick={() => props.filter(2)}>Completed</button>
                        </span>
                    <button className="button-link-light" style={{height: "40%"}} onClick={props.clearCompleted}>Clear Completed</button>
                </div>
            </li>
        </ul>
    </div>
     );
}
 
export default LightTheme;