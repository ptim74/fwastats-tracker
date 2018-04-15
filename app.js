import express from 'express';
import config from 'config';
import fetch from 'node-fetch';

const clashApiConfig = config.get('clashApi');
const app = express();

app.use(express.static('public'));

app.get('/', async function (req, res) {
    if(req.query.tag) {
        let tag = '#' + req.query.tag.trim().replace('#','');
        let url = clashApiConfig.url + '/clans/' + encodeURIComponent(tag);
        let auth = 'Bearer ' + clashApiConfig.token;
        let response = await fetch(url, { headers: {'Authorization': auth }});
        let data = await response.json();
        let ret = null;
        if(data.memberList)
        {
            console.log(`Fetched clan ${data.tag} ${data.name}`);
            ret = data.memberList.map(member => {
                return {
                    tag: member.tag,
                    name: member.name,
                    donated: member.donations,
                    received: member.donationsReceived
                };
            });
        } else {
            console.log(`Failed to fetch clan ${tag}`);
            console.log(JSON.stringify(data));
            ret = {
                status: false
            };
        }
        res.send(JSON.stringify(ret));
    } else {
        res.sendFile(`${__dirname}/public/index.htm`);
    }
});

const server = app.listen(3000, function () {
   const host = server.address().address;
   const port = server.address().port;
   console.log(`FWA Stats Tracker listening at http://${host}:${port}`);
});