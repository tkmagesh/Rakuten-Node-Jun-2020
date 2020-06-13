const fs = require('fs');

try {
    const fileContents = fs.readFileSync('./sample.txt', { encoding: 'utf8'});
    console.log(fileContents);
    console.log('Thats all folks!');
} catch (err){
    console.log('something went wrong');
    console.log(err);
}