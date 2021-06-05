const express = require('express'),
      app     = express(),
      mongoose = require('mongoose'),
      dotenv = require('dotenv'),
      postsRouter = require('./apis/posts.api'),
      usersRouter = require('./apis/users.api'),
      isUserAuthenticated = require('./middlewares/isJwtValid');

const PORT = process.env.PORT || 3001;

dotenv.config();

// const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.dxrov.mongodb.net/social-app?retryWrites=true&w=majority`;
const dbURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster-shard-00-00.dxrov.mongodb.net:27017,mycluster-shard-00-01.dxrov.mongodb.net:27017,mycluster-shard-00-02.dxrov.mongodb.net:27017/social-app?ssl=true&replicaSet=atlas-buvhsy-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => { console.log("DB connected") } )
.catch( err => console.log(err) );

app.use(express.json());

app.use(isUserAuthenticated);
// app.use(fetchUserDetails);

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Social App');
});

app.post('/testing', (req, res) => {
    console.log(req.userDetails);
    res.send('testing');
});

app.use(function (err, req, res, next) {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    res.status(statusCode).json({ errorMessage });
})

app.listen(PORT, (err) => {
    if(err)
        console.log(err);
    else
        console.log(`server started on port ${PORT}`);
});