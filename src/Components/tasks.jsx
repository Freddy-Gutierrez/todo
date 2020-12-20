import React, { Component } from 'react';
class Tasks extends Component {
    state = {  newTask: {todo: "", completed: false, active: true}, tasks: [], displayedTasks: [], activeFilter: 0, theme: "light"};

    componentDidMount() {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];   
        console.log(tasks)             ;
        this.setState({tasks, displayedTasks: tasks});
    }

    handleChange = ({ currentTarget: input }) => {
        let newTask = {todo: "", completed: false, active: true}
        newTask[input.name] = input.value;        
        this.setState({ newTask });
    };

    addTask = () => {
        const tasks = [...this.state.tasks];
        tasks.push(this.state.newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks, displayedTasks: tasks});  
        window.location.reload(false);                      
    }

    filter = (activeFilter) => {      
        let displayedTasks = [...this.state.tasks];
        if (activeFilter === 0){
            this.setState({displayedTasks});
        }
        else if (activeFilter === 1){
            let filteredTasks = displayedTasks.filter(task => task.active === true);
            this.setState({displayedTasks: filteredTasks});
            console.log(filteredTasks);
        }
        else {
            let filteredTasks = displayedTasks.filter(task => task.completed === true);
            this.setState({displayedTasks: filteredTasks});
        }
        this.setState({activeFilter});
    }

    completeTask = (ind) => {
        const tasks = [...this.state.tasks];
        tasks[ind].completed = !tasks[ind].completed;        
        tasks[ind].active = !tasks[ind].active;  
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks, displayedTasks:tasks});        
    }

    clearCompleted = () => {
        const tasks = [...this.state.tasks];
        const unfinishedTasks = tasks.filter(task => task.completed === false);
        console.log(unfinishedTasks);
        localStorage.setItem('tasks', JSON.stringify(unfinishedTasks));
        this.setState({tasks: unfinishedTasks, displayedTasks: unfinishedTasks});

    }

    render() { 
        const {newTask, tasks, activeFilter, theme} = this.state;
        const incompleteTasks = tasks.filter(task => task.completed === false);        
        return (             
            theme === "dark" ? 
            <div className="container" style={{backgroundColor:"black"}}>
                <div className="header">
                    <h1 style={{color: "white"}}>TODO</h1>
                    <img className="sun-icon" src="./sun_light.png" alt="sun icon" onClick={() => this.setState({theme: "light"})}/>
                </div>
                <ul className="ul">
                    <li className="item-dark">
                        <input className="radio" type="radio" onClick={this.addTask}/>
                        <input className="item-input-dark" type="text" name="todo" onChange={this.handleChange} value={newTask.todo} placeholder="Create a new todo..."></input>
                    </li><br/>                    
                    {tasks.length === 0 ? "" : this.state.displayedTasks.map((task, ind) => {
                        return <li className="item-dark" key={ind}><input className="radio" type="radio" onClick={() => this.completeTask(ind)} value={ind} checked={task.completed ? true : false} readOnly/><span className={task.completed ? "item-text-finished-dark" : "item-text-unfinished-dark"}>{task.todo}</span></li>
                    })}
                    <li className="item-dark">
                        <div className="list-footer-dark">                            
                            <span className="item-text-unfinished-dark" style={{color: "rgb(167, 169, 194)"}}>{`${incompleteTasks.length} items left`}</span>
                                <span className="filters">
                                    <button className="button-link-dark" style={activeFilter === 0 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => this.filter(0)}>All</button>
                                    <button className="button-link-dark" style={activeFilter === 1 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => this.filter(1)}>Active</button>
                                    <button className="button-link-dark" style={activeFilter === 2 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => this.filter(2)}>Completed</button>
                                </span>
                            <button className="button-link-dark" style={{height: "40%"}} onClick={this.clearCompleted}>Clear Completed</button>
                        </div>
                    </li>
                </ul>
            </div>
            : 
            <div className="container" style={{backgroundColor:"rgba(228, 228, 228, 0.952)"}}>
                <div className="header">
                    <h1 style={{color: "black"}}>TODO</h1>
                    <img className="sun-icon" src="./sun_dark.png" alt="sun icon" onClick={() => this.setState({theme: "dark"})}/>
                </div>
                <ul className="ul">
                    <li className="item-light">
                        <input className="radio" type="radio" onClick={this.addTask}/>
                        <input className="item-input-light" type="text" name="todo" onChange={this.handleChange} value={newTask.todo} placeholder="Create a new todo..."></input>
                    </li><br/>                    
                    {tasks.length === 0 ? "" : this.state.displayedTasks.map((task, ind) => {
                        return <li className="item-light" key={ind}><input className="radio" type="radio" onClick={() => this.completeTask(ind)} value={ind} checked={task.completed ? true : false} readOnly/><span className={task.completed ? "item-text-finished-light" : "item-text-unfinished-light"}>{task.todo}</span></li>
                    })}
                    <li className="item-light">
                        <div className="list-footer-light">                            
                            <span className="item-text-unfinished-light" style={{color: "black"}}>{`${incompleteTasks.length} items left`}</span>
                                <span className="filters">
                                    <button className="button-link-light" style={activeFilter === 0 ? {color: "rgb(56, 103, 208)"} : {color: "black"}} onClick={() => this.filter(0)}>All</button>
                                    <button className="button-link-light" style={activeFilter === 1 ? {color: "rgb(56, 103, 208)"} : {color: "black"}} onClick={() => this.filter(1)}>Active</button>
                                    <button className="button-link-light" style={activeFilter === 2 ? {color: "rgb(56, 103, 208)"} : {color: "black"}} onClick={() => this.filter(2)}>Completed</button>
                                </span>
                            <button className="button-link-light" style={{height: "40%"}} onClick={this.clearCompleted}>Clear Completed</button>
                        </div>
                    </li>
                </ul>
            </div>
         );
    }
}
 
export default Tasks;