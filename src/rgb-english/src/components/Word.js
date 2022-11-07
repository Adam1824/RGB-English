import React, { Component } from 'react';

class Word extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: props.word,
            hexValue: props.hexValue
        }
    }

    render() {
        return (
            <div>
                <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">Word</th>
                    <th scope="col">Hex Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{this.state.word}</td>
                    <td>{this.state.hexValue}</td>
                </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

export default Word;