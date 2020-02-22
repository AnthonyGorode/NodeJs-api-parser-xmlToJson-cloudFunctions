const express = require("express");

const FeedParser = require("feedparser");
const request = require('request');
const axios = require("axios");
var parser = require('fast-xml-parser');
var he = require('he');
 
var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

const router = express.Router();

/**
 * Receive the url on param of request
 * /api/feed?url_feed=****
 * @param url_feed this is a url feed
 */
router.get("",async function(req,res,next) {
    console.log(req.query.url_feed);
    if(req.query.url_feed && req.query.url_feed != "") {
      const isValidUrl = await checkUrlFeed(req.query.url_feed);
      console.log(isValidUrl);
      if(isValidUrl) xmlToJson(req.query.url_feed,res);
      else res.status(404).json({status:false,message: "Bad Url, this url doesn't return xml datas."})
    } else {
        res.status(200).json({
            message: `Here you can pass url's feed on GET params`
        });
    }
});

async function checkUrlFeed(url) {
    
    try {
        const pending = await axios.default.get(url);
        const result = await pending.data;
        if(result) {
            try{
                var jsonObj = parser.parse(result,options, true);
                return true;
            }catch(error){
                console.log(error.message);
                return false
            }
        }
        else return false;
    } catch (error) {
        console.log("yo");
        return false;
    }

}

function xmlToJson(url,res) {
    let req = request(url);
    let feedparser = new FeedParser();
    let feedArray = [];

    req.on('error', function(error) {
        console.log(error);
    });

    req.on('response', function(res) {
        let stream = this;

        if(res.statusCode !== 200) this.emit('error', new Error('Bad status code'));
        else stream.pipe(feedparser);
    });
    
    feedparser.on('readable', function() {
        let stream = this;
        let meta = this.meta;

        let item;

        while(item = stream.read()) feedArray.push(item);
    });

    feedparser.on("end", function() {
        const datas = treatDatas();
        res.status(200).json(datas);
    });

    feedparser.on('error', function(error) {
        console.log(error);
    }); 
    
    
    function treatDatas() {
        const firstEl = feedArray[0];
        const feedItems = [];
        let datas;

        let header = {
            title: firstEl["meta"]["title"],
            description: firstEl["meta"]["description"],
            date: firstEl["meta"]["date"],
            link: firstEl["meta"]["link"],
            copyright: firstEl["meta"]["copyright"],
            image: firstEl["meta"]["image"],
            categories: firstEl["meta"]["categories"]
        };
        
        let enclosure;
        feedArray.map(feed => {
            if(feed["enclosures"].length)
                enclosure = {
                    link: feed["enclosures"][0]["url"]
                }
            else
                enclosure = {
                    link: ""
                }

            let element = {
                title: feed["title"],
                description: feed["description"] || "",
                content: feed["description"] || "",
                summary: feed["summary"] || "",
                author: feed["author"],
                date: feed["date"],
                pubDate: feed["pubDate"],
                thumbnail: feed["thumbnail"],
                link: feed["link"],
                guid: feed["guid"],
                enclosure
            }
            feedItems.push(element);
        });

        datas = {
            status: "ok",
            feed: header,
            items: feedItems
        };

        return datas;
    }
}



module.exports = router;