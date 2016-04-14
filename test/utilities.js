var mongoose = require('mongoose');
//drop database
function dropDatabase(done) {
    mongoose.connection.db.dropDatabase(done);
}
module.exports= {
    dropDatabase: dropDatabase
};