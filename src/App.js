import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {

    constructor() {
        super();
        this.state = {
            endpoint: 'looga.net:4001'
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
                children.push(<td id={[j,i]}> <button onClick={() => this.move(j, i)}>{(j < 10) ? "0" + j : j}{(i < 10) ? "0" + i : i}</button></td>)
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
                        {this.generateTable(20, 20)}
                    </tbody>
                </table>
                <button onClick={() => this.send("&#9875;")}>SEND &#9875;</button>
                <button onClick={() => this.send("&#9891;")}>SEND &#9891;</button>
                <button onClick={() => this.send("&#9959;")}>SEND &#9959;</button>
                <button onClick={() => this.send("&#9924;")}>SEND &#9924;</button>
            </div>
        )
    }
}
export default App;