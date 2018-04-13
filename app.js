const express = require("express");
const config = require("config");
const fetch = require("node-fetch");
const clashApiConfig = config.get('clashApi');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    if(req.query.tag) {
        let tag = "#" + req.query.tag.trim().replace("#","");
        let url = clashApiConfig.url + '/clans/' + encodeURIComponent(tag);
        let auth = 'Bearer ' + clashApiConfig.token;
        fetch(url, { headers: {'Authorization': auth }})
        .then(response => response.json())
        .then(data => {
            let ret = null;
            if(data.memberList)
            {
                console.log("Fetched clan " + data.tag + " " + data.name);
                ret = data.memberList.map(member => {
                    return {
                        tag: member.tag,
                        name: member.name,
                        donated: member.donations,
                        received: member.donationsReceived
                    };
                });
            } else {
                console.log("Failed to fetch clan " + tag);
                console.log(JSON.stringify(data));
                ret = {
                    status: false
                };
            }
            res.send(JSON.stringify(ret));
        });
    } else {
        res.sendFile(__dirname + '/public/index.htm');
    }
});

const server = app.listen(3000, function () {
   const host = server.address().address;
   const port = server.address().port;
   console.log("FWA Stats Tracker listening at http://%s:%s", host, port);
});