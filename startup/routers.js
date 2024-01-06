const allArticles = require('../routes/allArticles.js');
const article = require('../routes/oneArticle.js');
const frontpageArticles = require('../routes/frontpageArticles.js');
const frontpageUpdate = require('../routes/frontpageUpdate.js');
const articlePosition = require('../routes/articlePosition.js');
const newsByCategory = require('../routes/newsByCategory.js');
const publishArticle = require('../routes/publishArticle.js');
const proba = require('../routes/proba.js');
const oneUserFE = require('../routes/oneUserFE.js');
const authUserFE = require('../routes/authUserFE.js');
const newsByDate = require('../routes/newsByDate.js');
const scraper = require('../routes/scraper.js');
const twitter = require('../routes/twitter.js');
const profileImg = require('../routes/profileImg.js');

module.exports = function(app) {
    app.use('/', allArticles);
    app.use('/', article);
    app.use('/', frontpageArticles);
    app.use('/', articlePosition);
    app.use('/', newsByCategory);
    app.use('/', proba);
    app.use('/', publishArticle);
    app.use('/', oneUserFE);
    app.use('/', authUserFE);
    app.use('/', newsByDate);
    app.use('/', frontpageUpdate);
    app.use('/', scraper);
    app.use('/', twitter);
    app.use('/', profileImg);
}