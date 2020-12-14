import React, { Component } from 'react';
import Tasks from './Components/tasks';
import "./CSS/task.css";

class App extends Component {
  
  render() { 
    return ( 
      <div>
        <Tasks />
      </div>
    );
  }
}
 
export default App;