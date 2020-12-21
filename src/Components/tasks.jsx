import React, { Component } from 'react';
import DarkTheme from './darkTheme';
import LightTheme from './lightTheme';
class Tasks extends Component {
    state = {  newTask: {todo: "", completed: false, active: true}, tasks: [], displayedTasks: [], activeFilter: 0, theme: "dark"};

    componentDidMount() {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];  
        let theme = localStorage.getItem("theme") ;
        console.log(tasks)             ;
        this.setState({tasks, displayedTasks: tasks, theme});
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

    changeTheme = () => {
        let {theme} = this.state;
        theme === "light" ? theme = "dark" : theme = "light";
        localStorage.setItem("theme", theme);
        console.log(theme);
        this.setState({theme});
    }

    render() { 
        const {newTask, tasks, displayedTasks, activeFilter, theme} = this.state;
        const incompleteTasks = tasks.filter(task => task.completed === false);        
        return (             
            theme === "dark" ? 
            <DarkTheme
                addTask={this.addTask}
                handleChange={this.handleChange}
                completeTask={this.completeTask}
                filter={this.filter}
                clearCompleted={this.clearCompleted}
                changeTheme={this.changeTheme}
                activeFilter={activeFilter}
                newTask={newTask}
                tasks={tasks}
                displayedTasks={displayedTasks}
                incompleteTasks={incompleteTasks}
            />
            : 
            <LightTheme
                addTask={this.addTask}
                handleChange={this.handleChange}
                completeTask={this.completeTask}
                filter={this.filter}
                clearCompleted={this.clearCompleted}
                changeTheme={this.changeTheme}
                activeFilter={activeFilter}
                newTask={newTask}
                tasks={tasks}
                displayedTasks={displayedTasks}
                incompleteTasks={incompleteTasks}
            />
         );
    }
}
 
export default Tasks;