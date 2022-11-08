import React, { Component } from 'react';

const VALID_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f']
const VALID_NUMBERS = [
    { letter: 'o', number: '0' },
    { letter: 'i', number: '1' },
    { letter: 's', number: '5' },
    { letter: 't', number: '7' }
];

class Words extends Component {

    constructor(props) {
        super(props);

        this.state = {
        words: [],
        totalHexValues: 0,
        generateHexToggle: false
        }

        this.generateHexValuesToggle = this.generateHexValuesToggle.bind(this);
    }

    showFile = async (e) => {
        e.preventDefault()
        this.setState({
            words: [],
            totalHexValues: 0,
            generateHexToggle: false
        }, () => {
            const reader = new FileReader()
            reader.onload = async (e) => { 
                const text = (e.target.result)
                const words = text.split(/r?\n/);
                let filteredWords = [];
                let counter = 0;
                words.forEach(word => {
                const withoutLineBreak = word.replace(/[\r\n]/g, '');
                if (withoutLineBreak.length <= 6 && withoutLineBreak.length >= 2) {
                    const word = {
                        key: counter,
                        word: withoutLineBreak
                    }
                    filteredWords.push(word);
                    counter++;
                }
                });
                this.setState({ words: filteredWords })
            };
            reader.readAsText(e.target.files[0])
        })
    }

    hexValueCounter() {
        this.setState(prevState => ({
        totalHexValues: prevState.totalHexValues + 1
        }));
    }

    hexadecimalColourValue(word) {
        let hexValue = '';
        for (let i in word) {
            let foundLetter = false;
            if (VALID_LETTERS.includes(word[i])) {
                hexValue += word[i];
                foundLetter = true;
            } else {
                for (let j = 0; j < VALID_NUMBERS.length; j++) {
                    if (VALID_NUMBERS[j].letter === word[i]) {
                        hexValue += VALID_NUMBERS[j].number;
                        foundLetter = true;
                    }
                }
            }
            if (!foundLetter) {
                hexValue = 'N/A';
                break;
            }
        }
        if (!(hexValue === 'N/A')) {
            hexValue = hexValue.toUpperCase();
            if (hexValue.length < 6) {
                const remainingChars = 6 - hexValue.length;
                for (let k = 0; k < remainingChars; k++) {
                    hexValue += '0'
                }
            }
            this.hexValueCounter();
        }
        return hexValue;
    }

    generateHexValuesToggle() {
        if (!this.state.generateHexToggle) {
            let words = this.state.words;
            words.forEach(word => {
                const hexValue = this.hexadecimalColourValue(word.word);
                word.hexValue = hexValue;
            });
            const validWords = words.filter(word => word.hexValue !== 'N/A');
            this.setState({ 
                words: validWords,
                generateHexToggle: true
            })
        } else {
            this.setState({
                generateHexToggle: false,
                totalHexValues: 0
            })
        }
    }

    render = () => {
        return (
            <div>
            <input className="form-control form-control-sm" type="file" onChange={(e) => this.showFile(e)} />
            <div>Total HexValues: {this.state.totalHexValues}</div>
            {this.state.words.length > 0 &&
            <div>
                <button className="btn btn-primary btn-sm" onClick={this.generateHexValuesToggle}>Generate HexValues</button>
            </div>
            }
            {this.state.generateHexToggle &&
            <div>
                <div>
                    <table className="table bg-white">
                    <thead>
                    <tr>
                        <th scope="col">Word</th>
                        <th scope="col">Hex Value</th>
                    </tr>
                    </thead>
                        {this.state.words.map(word => (
                            <tbody>
                                <tr>
                                    <td>{word.word}</td>
                                    <td>{word.hexValue}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            }
        </div>
        )
    }
}

export default Words;