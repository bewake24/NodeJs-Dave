const fs = require('fs');
const path = require('path');

// Function to generate random lorem ipsum text
function generateRandomText(lines) {
    const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"];
    let text = '';

    for (let i = 0; i < lines; i++) {
        let lineLength = Math.floor(Math.random() * 15) + 5; // Random length between 5 and 20 words
        let line = [];

        for (let j = 0; j < lineLength; j++) {
            let randomWord = words[Math.floor(Math.random() * words.length)];
            line.push(randomWord);
        }

        text += line.join(' ') + '\n';
    }

    return text;
}

// Main function to write to the file
function writeRandomTextToFile(lines) {
    const filePath = path.join(__dirname, 'files', 'lorem.txt');
    const randomText = generateRandomText(lines);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the random text to the file
    fs.writeFile(filePath, randomText, (err) => {
        if (err) {
            return console.error(`Error writing to file: ${err.message}`);
        }
        console.log(`Successfully wrote ${lines} lines to ${filePath}`);
    });
}

// Get the number of lines from the command line arguments
const numLines = parseInt(process.argv[2], 10);

if (isNaN(numLines) || numLines <= 0) {
    console.error('Please provide a valid number of lines as an argument.');
    process.exit(1);
}

writeRandomTextToFile(numLines);
