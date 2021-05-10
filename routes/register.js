let express = require('express');
const flash = require('express-flash');
let router = express.Router();
let dbCon = require('../lib/db');

// display register page
router.get('/', (req, res, next) => {
    dbCon.query('SELECT * FROM register ORDER BY id desc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('register', { data: '' });
        } else {
            res.render('register', { data: rows });
        }
    })
});

// display add register page
router.get('/add', (req, res, next) => {
    res.render('register/add', {
        name: '',
        author: ''
    })
});

// add a new register
router.post('/add', (req, res, next) => {
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', 'Please enter name and author');
        // render to add.ejs with flash message
        res.render('register/add', {
            name: name,
            author: author
        })
    }

    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            author: author
        }

        // insert query
        dbCon.query('INSERT INTO register SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err);

                res.render('register/add', {
                    name: form_data.name,
                    name: form_data.author
                });
            } else {
                req.flash('success', 'Register successfully added');
                res.redirect('/register');
            }
        });
    }

});

module.exports = router;