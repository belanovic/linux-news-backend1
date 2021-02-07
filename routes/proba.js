const express = require('express');
const router = express.Router();

router.get('/proba', async (req, res) => {
    try {
        const odgovor = {
            poruka: 'Ovo je poruka'
        }
        res.status(200).json(odgovor);
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;