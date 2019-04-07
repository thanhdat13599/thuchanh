const express=require('express');
const route=express.Router();
const db=require('../configs/connect');

route.get('/',function(req,res){
    db.getPosts(function(err,results){
        if(err){
            res.render('Pages/error',{
                'code':results.code,
                'mess':err
            });
            return;
        }
        console.log(results);
            res.render('Pages/home', {posts: results});
    });
});

route.get('/entry/:pid',function(req,res){
    db.getEntry(req.params.pid,function(err,results){
        if(err){
            res.render('Pages/error',{
                code: results.code,
                mess:results.mess
            });
            return;
        }
        res.render('Pages/entry',{
            id:req.params.pid,
            post:results
        });
    });
});
module.exports=route;