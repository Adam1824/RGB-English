# RGB-English
In CSS, RGB values are represented using hexidecimal, e.g  **#FFFFFF**.
This program is going to match english words to hexidecimal colour codes, from...
**#000000** to **#FFFFFF**
## Assumptions
1. The word is between 2 and 6 characters
2. A character will either be A-F or one of the following numbers that represents a letter
  - 0 = O
  - 1 = I
  - 5 = S
  - 7 = T
4. Any words less than 6 characters have the rest of the value filled with 0's to make the colour, e.g **#CA7000**
## Run the application
pre requisite - download and install the latest version of Node.js
1. Clone the repo
2. In a terminal, navgiate to /rgb-english
3. run 'npm install'
4. run 'npm start'
5. Select either words.txt or words2.txt
6. Click 'Generate HexValues'
