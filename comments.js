// Create web server
// Run: node comments.js
// Test: http://localhost:3000/comments

var http = require('http');
var url = require('url');

var comments = [
    {name: 'Bob', comment: 'I am Bob'},
    {name: 'Jane', comment: 'I am Jane'},
    {name: 'John', comment: 'I am John'}
];

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    console.log(urlObj);
    if (urlObj.pathname === '/comments') {
        if (urlObj.query.comment) {
            comments.push({name: urlObj.query.name, comment: urlObj.query.comment});
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head><title>Comments</title></head>');
        res.write('<body>');
        res.write('<h1>Comments</h1>');
        res.write('<ul>');
        comments.forEach(function(comment) {
            res.write('<li>' + comment.name + ': ' + comment.comment + '</li>');
        });
        res.write('</ul>');
        res.write('<form method="GET" action="/comments">');
        res.write('Name: <input type="text" name="name"><br>');
        res.write('Comment: <input type="text" name="comment"><br>');
        res.write('<input type="submit" value="Submit">');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
});

server.listen(3000);
console.log('Server running at http://localhost:3000');
