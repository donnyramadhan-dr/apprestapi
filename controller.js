'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi RestApi ku berjalan", res)
};

// menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, ) {
        if (error) {
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

// menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], 
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    );
};

// menambahkan data mahasiswa
exports.tambahmahasiswa = function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)', 
    [nim, nama, jurusan], function(error, rows, fields) {
        if (error) {
            console.log(error);
        }else{
            response.ok("Berhasil menambahkan Data!", res);
        };
    });
};

// mengubah data mahasiswa
exports.ubahmahasiswa = function(req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan,id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Update Data", res);
        }
    });
};

//menghapu data mahasiswa
exports.deletemahasiswa = function(req, res) {
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Data Berhasil di Hapus!", res);
        }
    });
};