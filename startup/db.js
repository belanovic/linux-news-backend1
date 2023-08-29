const mongoose = require('mongoose');

module.exports = function() {

    
    const mongoAddress1 = `mongodb://localhost/news`;
    const mongoAddress2 = `mongodb+srv://goranbelanovic:1234@cluster0.xneom.mongodb.net/news?retryWrites=true&w=majority`;

    mongoose.set('useFindAndModify', false);
    
    mongoose.connect(mongoAddress2, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to the news database'))
        .catch(err => console.log(err)) 
}