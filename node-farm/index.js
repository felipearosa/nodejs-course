const fs = require('fs');
const http = require('http');
const url = require('url');
//const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;


  //Overview
  if (pathName === '/' || pathName === '/overview'){
    res.end('heyoooo');
  //API
  }
  else if (pathName === '/products'){
    res.writeHead(200, { "Content-type": "application/json"});
    //NOT FOUND
  } else {
    res.end("NOT FOUND");
  }


})



server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
