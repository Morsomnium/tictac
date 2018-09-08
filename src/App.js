import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {

    constructor() {
        super();
        this.state = {
            endpoint: 'https://tictac.looga.net'
        };
        this.lastMove = [];
    }

    send = (mark) => {
        console.log("Send clicked" + this.lastMove);
        const socket = socketIOClient(this.state.endpoint);
        this.lastMove.push(mark);
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
            document.getElementById(coords.slice(0,2)).innerHTML = coords[2];
        });

        return (
            <div className={"centered-div"}>
                <table>
                    <tbody>
                        {this.generateTable(10, 10)}
                    </tbody>
                </table>
                <button onClick={() => this.send("X")}>SEND X</button>
                <button onClick={() => this.send("O")}>SEND O</button>
            </div>
        )
    }
}
export default App;