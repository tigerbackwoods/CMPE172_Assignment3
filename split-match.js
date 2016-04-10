/*
A simple node.js that uses streams to transform the data and it teaches command line application development.
References:
+ The pseudo code source: http://www.bennadel.com/blog/2662-my-first-look-at-streams- in-node-js.htm
+ https://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/
+ For prototyping and inheritence model
refer to intermediate.js on canvas and http://book.mixu.net/node/ch6.html
+ https://nodesource.com/blog/understanding-object-streams/
+ commander.js
- https://github.com/visionmedia/commander.js
- http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-
interfaces-made-easy */
var fs = require('fs');
var program = require('commander');
var patternMatch = require('./patternMatch');
var pattrn = /^(.|,)$/i;

//Program module is for taking command line arguments
program
    .version('0.0.1')
    .option('-p --pattern <pattern>', 'Input Pattern such as . ,', pattrn)
    .parse(process.argv);
    
// Create an input stream from the file system.
var inputStream = fs.createReadStream( "input-sensor.txt" );
console.log("\nInput :");
inputStream.pipe(process.stdout);

// Create a Pattern Matching stream that will run through the input and find matches 
// for the given pattern at the command line - "." and “,”.
var patternStream = inputStream.pipe( new patternMatch(program.pattern));
// Read matches from the stream.
var results = [];
patternStream.on('readable', function() {
	var foundPattern;
	while ((foundPattern = patternStream.read()) !== null) {
		results.push(foundPattern);
	}
});

patternStream.on('end', function() {
	console.log("\nOutput :");
	console.log(results);


});











