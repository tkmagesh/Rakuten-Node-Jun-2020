const fs = require('fs');

const stream = fs.createReadStream('./sample.txt', { encoding: 'utf8'})
//events - open, data, end, close, error

stream.on('data', (chunk) => {
    console.log(chunk);
});

stream.on('end', () => {
    console.log('Thats all folks');
});

stream.on('error', (err) => {
    console.log('Something went wrong!');
    console.log(err);
})