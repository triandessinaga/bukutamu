// Definisikan configurasi Database
const config = require('../configuration/database');
// Gunakan library mysql
let mysql      = require('mysql');
// Buat koneksi
let pool       = mysql.createPool(config);

// Kirim error jika koneksi gagal
pool.on('error',(err)=> {
    console.error(err);
});

// module.exports ={
//     // Fungsi untuk merender file register yang ada pada folder 'src/views/register.ejs'
//     formRegister(req,res){
//         res.render("register",{
//             // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
//             url : 'http://localhost:3000/',
//         });
//     },
//     // Fungsi untuk menyimpan data
//     saveRegister(req,res){
//         // Tampung inputan user kedalam varibel username, email dan password role
//         let email = req.body.email;
//         let username = req.body.username;
//         let password = req.body.pass;
//         let role = req.body.role;
//         // Pastikan semua varibel terisi
//         if (email && username && password && role) {
//             // Panggil koneksi dan eksekusi query
//             pool.getConnection(function(err, connection) {
//                 if (err) throw err;
//                 connection.query(
//                     `INSERT INTO user (user_email,user_username,user_password,user_role) VALUES (?,?,SHA2(?,512),?);`
//                 , [email, username, password, role],function (error, results) {
//                     if (error) throw error;
//                     // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
//                     req.flash('color', 'success');
//                     req.flash('status', 'Yes..');
//                     req.flash('message', 'Registrasi berhasil');
//                     // Kembali kehalaman login
//                     res.redirect('/login');
//                 });
//                 // Koneksi selesai
//                 connection.release();
//             })
//         } else {
//             // Kondisi apabila variabel username, email dan password tidak terisi
//             res.redirect('/login');
//             res.end();
//         }
//     }
// }



module.exports = {
    formRegister(req, res) {
      res.render("register", {
        url: 'http://localhost:3000/',
      });
    },
    saveRegister(req, res) {
      let email = req.body.email;
      let username = req.body.username;
      let password = req.body.password;
      let role = req.body.role;
  
      if (email && username && password && role) {
        pool.getConnection(function(err, connection) {
          if (err) {
            console.error(err);
            // Tangani kesalahan koneksi database
            req.flash('color', 'danger');
            req.flash('status', 'Oops..');
            req.flash('message', 'Terjadi kesalahan saat terhubung ke database');
            res.redirect('/register');
            return;
          }
  
          connection.query(
            `INSERT INTO user (user_email, user_username, user_password, user_role) VALUES (?, ?, SHA2(?,512), ?);`,
            [email, username, password, role],
            function(error, results) {
              if (error) {
                console.error(error);
                // Tangani kesalahan query
                req.flash('color', 'danger');
                req.flash('status', 'Oops..');
                req.flash('message', 'Terjadi kesalahan saat menyimpan data registrasi');
                res.redirect('/register');
                return;
              }
              req.flash('color', 'success');
              req.flash('status', 'Selamat..');
              req.flash('message', 'Registrasi berhasil');
              res.redirect('/login');
            }
          );
  
          connection.release();
        });
      } else {
        // Kondisi apabila variabel username, email, password, atau role tidak terisi
        req.flash('color', 'danger');
        req.flash('status', 'Oops..');
        req.flash('message', 'Mohon isi semua data registrasi');
        res.redirect('/register');
      }
    }
  };
  