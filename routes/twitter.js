const express = require('express');
const router = express.Router();
var Twit = require('twit');

const T = new Twit({
    consumer_key: 'CwE9zZzMc1jbCWGByKuLWIbi6',
    consumer_secret: 'H1XMToXsQiPb99tpWA3WUjhopPzW1oc9JEOjPTuVKILbSB9FSL',
    access_token: '1424881417541017605-uLDViNeAyb4VoSoQvMGhySRhXwr3C8',
    access_token_secret: 'ulKvAyVIoT6P54KPlnbeTH5r1wwYRH7va7ysbC4UEizsJ'
})

router.post('/publishTwit', async (req, res) => {

    console.log('evo me sdklfjskdl lsdkjfskld sldkjflsdkf slfkjslfk dlkd f')

    try{
        T.post('statuses/update', { status: `${req.body.twit}` }, function (err, data, response) {
            res.send(data, response);
        }) 
    }catch(err) {
        res.send(err);
    }

})

module.exports = router;