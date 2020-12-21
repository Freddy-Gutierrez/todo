import React from 'react';

const DarkTheme = (props) => {
    return ( 
        <div className="container" style={{backgroundColor:"black"}}>
        <div className="header">
            <h1 style={{color: "white"}}>TODO</h1>
            <img className="sun-icon" src="./sun_light.png" alt="sun icon" onClick={props.changeTheme}/>
        </div>
        <ul className="ul">
            <li className="item-dark">
                <input className="radio" type="radio" onClick={props.addTask}/>
                <input className="item-input-dark" type="text" name="todo" onChange={props.handleChange} value={props.newTask.todo} placeholder="Create a new todo..."></input>
            </li><br/>                    
            {props.tasks.length === 0 ? "" :props.displayedTasks.map((task, ind) => {
                return <li className="item-dark" key={ind}><input className="radio" type="radio" onClick={() => props.completeTask(ind)} value={ind} checked={task.completed ? true : false} readOnly/><span className={task.completed ? "item-text-finished-dark" : "item-text-unfinished-dark"}>{task.todo}</span></li>
            })}
            <li className="item-dark">
                <div className="list-footer-dark">                            
                    <span className="item-text-unfinished-dark" style={{color: "rgb(167, 169, 194)"}}>{`${props.incompleteTasks.length} items left`}</span>
                        <span className="filters">
                            <button className="button-link-dark" style={props.activeFilter === 0 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => props.filter(0)}>All</button>
                            <button className="button-link-dark" style={props.activeFilter === 1 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => props.filter(1)}>Active</button>
                            <button className="button-link-dark" style={props.activeFilter === 2 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => props.filter(2)}>Completed</button>
                        </span>
                    <button className="button-link-dark" style={{height: "40%"}} onClick={props.clearCompleted}>Clear Completed</button>
                </div>
            </li>
        </ul>
    </div>
     );
}
 
export default DarkTheme;