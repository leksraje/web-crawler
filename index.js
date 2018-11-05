'use strict';
const WebCrawlerService = require('./service');
const readline = require('readline');


const crawlerServiceObj = new WebCrawlerService.CrawlerService();

// the website url should be passed in the command prompt
var readln = readline.createInterface(process.stdin, process.stdout);
readln.setPrompt('enter website url to crawl> ');
readln.prompt();
readln.on('line', function(line) {
    var response = crawlerServiceObj.crawl(line.toString().trim(), function(error, response) {
        if (response.status === "success") rl.close();
        readln.prompt();
    });
}).on('close', function() {
    process.exit(0);
});
