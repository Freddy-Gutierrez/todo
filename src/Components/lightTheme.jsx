import React from 'react';

const LightTheme = (props) => {
    return ( 
        <div className="page-container-light">
            <img className="background" src="./images/bg-desktop-light.jpg" alt="light bg"/>            
            <div className="container">
                <div className="header">
                    <h1 style={{color: "white"}}>T O D O</h1>
                    <img className="sun-icon" src="./images/sun-icon.png" alt="sun icon" onClick={props.changeTheme}/>
                </div>
                <ul className="ul">
                    <div className="rounded-border-light">
                        <li className="item-light" style={{borderBottom: "none"}}>
                            <input className="radio" type="radio" onClick={props.addTask}/>
                            <input className="item-input-light" type="text" name="todo" onChange={props.handleChange} value={props.newTask.todo} placeholder="Create a new todo..."></input>
                        </li>               
                    </div>
                    <br/>  
                    <div className="rounded-border-light" style={{borderBottom: "none"}}>
                        {props.tasks.length === 0 ? "" :props.displayedTasks.map((task, ind) => {
                            return <li className="item-light" key={ind}><input className="radio" type="radio" onClick={() => props.completeTask(ind)} value={ind} checked={task.completed ? true : false} readOnly/><span className={task.completed ? "item-text-finished-light" : "item-text-unfinished-light"}>{task.todo}</span></li>
                        })}                    
                        <li className="item-light" style={{borderBottom:"none"}}>
                            <div className="list-footer-light">                            
                                <span className="item-text-unfinished-light" style={{color: "rgb(167, 169, 194)"}}>{`${props.incompleteTasks.length} items left`}</span>
                                    <span className="filters">
                                        <button className="button-link-light" style={props.activeFilter === 0 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => props.filter(0)}>All</button>
                                        <button className="button-link-light" style={props.activeFilter === 1 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => props.filter(1)}>Active</button>
                                        <button className="button-link-light" style={props.activeFilter === 2 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => props.filter(2)}>Completed</button>
                                    </span>
                                <button className="button-link-light" style={{height: "40%"}} onClick={props.clearCompleted}>Clear Completed</button>
                            </div>
                        </li>                    
                    </div>   
                </ul>
            </div>
        </div>
     );
}
 
export default LightTheme;