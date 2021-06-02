const express = require('express'),
      app     = express(),
      mongoose = require('mongoose'),
      postsRouter = require('./apis/posts.api');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/social', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => { console.log("DB connected") } )
.catch( err => console.log(err) );

app.use(express.json());

app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.send('Social App');
});

app.listen(PORT, (err) => {
    if(err)
        console.log(err);
    else
        console.log(`server started on port ${PORT}`);
});