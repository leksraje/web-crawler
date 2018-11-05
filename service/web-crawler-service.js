'use strict';
const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');
const fs = require('fs');
const logPrefixClass = "web-crawler-service | ";
const STATUS_ABBREV = "status";
const FILE_NAME = "sitemap.txt";

//Webcrawler
//Function : crawls website and prints the output in a file
module.exports = class CrawlerService {

    crawl(webUrlToCrawl) {
        console.log(logPrefixClass + " webUrlToCrawl : " + webUrlToCrawl);
        request(webUrlToCrawl, function(error, response, body) {
            if (error) {
                console.error(logPrefixClass + "Error : " + error);
                return {
                    STATUS_ABBREV: "fail",
                    "debug": error.message
                };
            }
            // check if website is accessible
            console.log(logPrefixClass + "Response status code : " + response.statusCode);
            if (response.statusCode === 200) {
                // parse website body
                var $ = cheerio.load(body);
                console.log(logPrefixClass + "Page title:  " + $('title').text());

                var relativeLinksArray = [];
                //check for relative link and not absolute links
                var relativeLinks = $("a[href^='/']");
                fs.appendFileSync(FILE_NAME, 'RELATIVE LINKS \n');
                relativeLinks.each(function() {
                    var link = $(this).attr('href');
                    fs.appendFileSync(FILE_NAME, link + '\n');
                    relativeLinksArray.push(link);
                });
                return {
                    STATUS_ABBREV: "success"
                };
            } else {
                return {
                    STATUS_ABBREV: "fail",
                    "debug": "the status code" + response.statusCode
                };
            }
        });
    }
}
