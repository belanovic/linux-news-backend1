const express = require('express');
const router = express.Router();
const cors = require('cors');

router.get('/proba', cors({origin: 'https://site-news-cms.netlify.app/'}), async (req, res) => {
    try {
        const odgovor = {
            poruka: 'Ovo je poruka sa cookie-em'
        }
        console.log(req.cookies);
        /* res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') */
        res.cookie('kolacic', 'vrednost')
        res.json(odgovor)
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;