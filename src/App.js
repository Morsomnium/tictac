import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './API';

class App extends Component {

  render() {
    return (
        <div className="App">
            <p className="App-intro">
                This is the timer value: {this.state.timestamp}
            </p>
        </div>
    );
  }

  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
        timestamp
    }));
  }

  state = {
      timestamp: 'no timestamp yet'
  };
}

export default App;
