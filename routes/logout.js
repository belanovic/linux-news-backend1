const express = require('express');
const router = express.Router();
const modifyError = require('modifyerror');


router.get('/logoutt', async (req, res) => {
    function LogoutMsg(isSuccess) {
        this.isSuccess = isSuccess; 
       
        if(!isSuccess) {
            this.failureMsg = result;
        }
    }

    try {
        return res.clearCookie('token').json({logoutMsg: new LogoutMsg(true)})

    } catch (error) {
        return res.json({error: modifyError(error)});
    }
})


module.exports = router;