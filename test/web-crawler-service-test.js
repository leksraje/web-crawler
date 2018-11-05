const WebCrawlerService = require('../service');
const crawlerServiceObj = new WebCrawlerService.CrawlerService();
var assert = require('assert');

describe('Array', function() {
    it('Success - Valid url passed', function() {
        // var response = crawlerServiceObj.crawl("https://www.prudential.co.uk/");

        crawlerServiceObj.crawl("https://www.google.co.uk/", function(error, response) {
          console.log("valid"+response.status);
          assert.equal(response.status, "success");
        });

    });
    it('Fail - invalid url passed', function() {
      crawlerServiceObj.crawl("https://wwoogle.co.uk/", function(error, response) {
        console.log("invalid"+response.status);
        assert.equal(response.status, "fail");
      });

    });
});
