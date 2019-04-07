const express=require('express');
const router=express.Router();
const db=require('../configs/connect');

router.get('/:pid',function(req,res){
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
module.exports=router;