const express=require('express'),
    fs=require('fs'),
    app=express();

    const PORT=process.env.PORT||5000;
    app.use(express.static(__dirname + '/public'));
    app.set('views',__dirname + '/views');
    app.set('view engine','ejs');
    

const homeController=require('./Router/home.js');
app.use('/',homeController);

app.listen(PORT, () => {
        console.log('Node app is running on port',PORT);
    });