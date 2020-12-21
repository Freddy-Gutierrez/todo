import React, { Component } from 'react';
import Tasks from './Components/tasks';
import "./CSS/task.css";
import "./CSS/darkTheme.css";
import "./CSS/lightTheme.css";

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