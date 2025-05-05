const mongoose =require( "mongoose");

 exports.connectToDabase=()=>{
    mongoose.connect("mongodb://localhost:27017/search-service")
    .then(() => {
        console.log('MongoDB is successfully connected');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });
}
