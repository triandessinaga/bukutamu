const config = require('../configuration/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    admin(req,res){
        let id = req.session.userid
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user where user_id = '${id}';
                `
            , function (error, results) {
                if(error) throw error;
                res.render("admin",{
                    url: 'http://localhost:3000/',
                    userName: req.session.username,
                    nama: results[0]['user_username'],
                    email: results[0]['user_email']
                });
            });
            connection.release();
        })
    }
}