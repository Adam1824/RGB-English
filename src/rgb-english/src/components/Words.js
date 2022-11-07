import React, { Component } from 'react';
import Word from './Word';

const VALID_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f']
const VALID_NUMBERS = [
    { letter: 'o', number: '0' },
    { letter: 'i', number: '1' },
    { letter: 'e', number: '3' },
    { letter: 'a', number: '4' },
    { letter: 's', number: '5' },
    { letter: 't', number: '7' },
    { letter: 'b', number: '8' }
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
            this.setState({ 
                words,
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
            <input type="file" onChange={(e) => this.showFile(e)} />
            <div>Total Words: {this.state.words.length}</div>
            <div>Total HexValues: {this.state.totalHexValues}</div>
            {this.state.words.length > 0 &&
            <div>
                <button onClick={this.generateHexValuesToggle}>Generate HexValues</button>
            </div>
            }
            {this.state.generateHexToggle &&
            this.state.words.map(word => (
            <div key={word.key}>
                <Word word={word.word} hexValue={word.hexValue} />
            </div>
            ))}
        </div>
        )
    }
}

export default Words;