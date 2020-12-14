import React, { Component } from 'react';
class Tasks extends Component {
    state = {  newTask: {todo: "", completed: false, active: true}, tasks: []};

    componentDidMount() {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];   
        console.log(tasks)             ;
        this.setState({tasks});
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
        this.setState({tasks});
        
    }

    render() { 
        const {newTask, tasks} = this.state;
        return ( 
            <div>
                <ul>
                    <li className="item"><input className="radio" type="radio" onClick={this.addTask}/><input className="item-input" type="text" name="todo" onChange={this.handleChange} value={newTask.todo} placeholder="Create a new todo..."></input></li><br/>                    
                    {tasks.length === 0 ? "" : this.state.tasks.map((task, ind) => {
                        return <li className="item" key={ind}><input className="radio" type="radio" value={ind}/><span className="item-text-unfinished">{task.todo}</span></li>
                    })}
                </ul>
            </div>
         );
    }
}
 
export default Tasks;