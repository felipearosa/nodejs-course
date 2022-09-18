const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview
  if (pathname === '/' || pathname === '/overview'){
    res.writeHead(200, { "Content-type": "text/html"})

    const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');

    let output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

    res.end(output);
  //API
  }
  else if (pathname === '/product'){
    res.writeHead(200, { "Content-type": "text/html"});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product)

    res.end(output);
    //NOT FOUND
  } else {
    res.end("NOT FOUND");
  }


})



server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
