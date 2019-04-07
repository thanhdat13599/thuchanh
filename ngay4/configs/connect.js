const mysql=require('mysql');
let pool;
const dev=true;

if(dev){
    pool =mysql.createPool({
        host:'localhost',
        port:'3307',
        user:'root',
        password:'usbw',
        database:'mini-lab'
    });
}else{
    pool=mysql.createPool(process.env.CLEARDB_DATABASE_URL);
}
const mess={
    query_null:{
        "code":500,
        "mess":"Somrthing went wrong."
    }
};
exports.getPosts=function(callback){
    const sql="select post.pid, post.ptitle,post.pdescription,post.pdate from post";
    pool.getConnection(function(err, conn){
        if(err){
            callback(true,mess.query_null);
            return;
        }
        conn.query(sql, function(err,results){
            conn.release();
            if(err||!results){
                callback(true,mess.query_null);
                return;
            }
            callback(false,results);
        });
    });
 };
 exports.getEntry=function(pid,callback){
     const sql="SELECT *FROM post where post.PID="+ pid;
     pool.getConnection(function(err,conn){
         if(err){
             callback(true,mess.query_null);
             return;
         }
         conn.query(sql,function(err,results){
             conn.release();
             if(err||!results[0]){
                 callback(true,mess.query_null);
                 return;
             }
             callback(false,results[0]);
         });
     });
 };