import React, { Component } from 'react';
class Tasks extends Component {
    state = {  newTask: {todo: "", completed: false, active: true}, tasks: [], displayedTasks: [], activeFilter: 0};

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
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks, displayedTasks: tasks});
        
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
        tasks[ind].completed = true;        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks, displayedTasks:tasks});
    }

    clearCompleted = () => {
        const tasks = [...this.state.tasks];
        const unfinishedTasks = tasks.filter(task => task.completed === false);
        console.log(unfinishedTasks);
        this.setState({tasks: unfinishedTasks, displayedTasks: unfinishedTasks});

    }

    render() { 
        const {newTask, tasks, activeFilter} = this.state;
        return ( 
            <div>
                <ul>
                    <li className="item">
                        <input className="radio" type="radio" onClick={this.addTask}/>
                        <input className="item-input" type="text" name="todo" onChange={this.handleChange} value={newTask.todo} placeholder="Create a new todo..."></input>
                    </li><br/>                    
                    {tasks.length === 0 ? "" : this.state.displayedTasks.map((task, ind) => {
                        return <li className="item" key={ind}><input className="radio" type="radio" onClick={() => this.completeTask(ind)} value={ind}/><span className={task.completed ? "item-text-finished" : "item-text-unfinished"}>{task.todo}</span></li>
                    })}
                    <li className="item">
                        <div className="list-footer">                            
                            <span className="item-text-unfinished" style={{color: "rgb(167, 169, 194)"}}>x items left</span>
                                <span className="filters">
                                    <button className="button-link" style={activeFilter === 0 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => this.filter(0)}>All
                                    </button><button className="button-link" style={activeFilter === 1 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => this.filter(1)}>Active</button>
                                    <button className="button-link" style={activeFilter === 2 ? {color: "rgb(56, 103, 208)"} : {color: "rgb(167, 169, 194)"}} onClick={() => this.filter(2)}>Completed</button>
                                </span>
                            <button className="button-link" style={{height: "40%"}} onClick={this.clearCompleted}>Clear Completed</button>
                        </div>
                    </li>
                </ul>
            </div>
         );
    }
}
 
export default Tasks;