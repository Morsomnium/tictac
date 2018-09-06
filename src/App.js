import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {

    constructor() {
        super();
        this.state = {
            endpoint: "http://192.168.1.93:4001"
        };
        this.lastMove = [];
    }

    send = () => {
        console.log("Send clicked." + this.lastMove);
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('move', this.lastMove)
    };

    move = (X, Y) => {
        this.lastMove = [X,Y];
        console.log("Move placed on " + this.lastMove)
    };

    generateTable = (X, Y) => {
        let table = [];
        for (let i = 0; i < Y; i++){
            let children = [];
            for (let j = 0; j < X; j++){
                children.push(<td id={[j,i]}> <button onClick={() => this.move(j, i)}>{j}{i}</button></td>)
            }
            table.push(<tr>{children}</tr>)
        }
        return table;
    };

    render() {

        const socket = socketIOClient(this.state.endpoint);
        socket.on('move', (coords) => {
            console.log(coords);
            document.getElementById(coords).innerHTML = "X";
        });

        return (
            <div>
                <table>
                    <tbody>
                        {this.generateTable(4, 5)}
                    </tbody>
                </table>
                <button onClick={this.send}>SEND</button>
            </div>
        )
    }
}
export default App;