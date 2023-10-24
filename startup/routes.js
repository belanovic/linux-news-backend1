const routerArticles = require('../routes/allArticles');
const article = require('../routes/oneArticle');
const frontpageArticles = require('../routes/frontpageArticles');
const frontpageUpdate = require('../routes/frontpageUpdate');
const articlePosition = require('../routes/articlePosition');
const newsByCategory = require('../routes/newsByCategory');
const publishArticle = require('../routes/publishArticle');
const proba = require('../routes/proba');
const oneUserFE = require('../routes/oneUserFE');
const authUserFE = require('../routes/authUserFE');
const newsByDate = require('../routes/newsByDate');
const scraper = require('../routes/scraper');
const twitter = require('../routes/twitter');
const profileImg = require('../routes/profileImg.js');

module.exports = function(app) {
    app.use('/', routerArticles);
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