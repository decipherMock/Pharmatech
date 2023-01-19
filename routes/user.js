const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/database')


router.get('/Verification', function(req, res) {
    res.render('Vefiy')
})

router.get('/About', function(req, res) {
    res.render('about')
})


router.get('/', function(req, res) {
    res.render('login')
})


//login page
router.get('/login', function(req, res) {
    res.render('login')
})

router.get('/UserRegister', function(req, res) {
    res.render('docregister', { Hospital: req.user.Hospital })
})

//register page
router.get('/register', function(req, res) {
    res.render('register')
})

// success Page 

//register page
router.get('/SuccessPage', function(req, res) {
    res.render('suy')
})



router.get('/registerNewUser', function(req, res) {
    res.render('registeruser')
})

router.get('/registerPharmacyUserTwo', function(req, res) {
    res.render('register_userdoneX')
})

router.get('/registerPharmacyUser:DataString', function(req, res) {
    let Data = JSON.parse(req.params.DataString)
    res.render('registeruser', {Data:Data})
})

router.get('/registerPharmacyUser', function(req, res) {
    res.render('registeruser')
})


router.get('/dashboard', function(req, res) {
    let users = (req.user)
    res.render('dashboard', { Hospital: req.user.Hospital, Name: req.user.Name, Department: req.user.Department, user: users })
})

router.get('/AssociateDashboard', function(req, res) {
    let users = (req.user)
    res.render('Retail', { Hospital: req.user.Hospital, Name: req.user.Name, Department: req.user.Department, user: users })
})

router.get('/AccountantDashboard', function(req, res) {
    let users = (req.user)
    res.render('AccountsMain', { Hospital: req.user.Hospital, Name: req.user.Name, Department: req.user.Department, user: users })
})

router.get('/PharmacistDashboard', function(req, res) {
    let users = JSON.stringify(req.user)
    res.render('Ware_house', { Hospital: req.user.Hospital, Name: req.user.Name, Department: req.user.Department, user: users })
})


router.get('/UserDeniedAccess', function(req, res) {
    //let users = JSON.stringify(req.user)
    res.render('Acess_denial', { user: req.user })
})







router.post('/register', function(req, res) {
    let errors = []
    console.log(req.body)

    if (req.body.password.length < 6) {
        errors.push({ msg: 'Passwords should be at seven characters long!' });
        console.log(errors)
    } else if (req.body.password !== req.body.Confirmpassword) {
        errors.push({ msg: 'Password do not match' })
        console.log(errors)
    }
    if (errors.length > 0) {
        res.render('register', {
            errors
         
        })
        console.log(22)
    } else if (errors.length > 0) {
        res.render('register', {
            errors,
        })
        console.log(33)
    } else {
     
        pool.query(`SELECT * from users where email = ?`, req.body.email, (error, results, fields)=>{
           if(error) throw error;
            console.log(results)
        if(results.length === 0){
          console.log('No user exist')

          pool.query(`SELECT * FROM users WHERE Username = ?`, req.body.Username, (error, results, fields) =>{
            if(error) throw error;

            if(results.length === 0){
                console.log('we are registering you...')
                
                let salt = bcrypt.genSaltSync(10)
                let Data = {
                    Pharmacy_name:req.body.Pharmacy_name,
                    email: req.body.email,
                    Telephone:req.body.Telephone,
                    Location:req.body.Location,
                    RetailPharmacy:req.body.RetailPharmacy,
                    WholesalePharmacy:'WholesalePharmacy',
                    prefernotto:'Not Answered',
                    UserType :'Administrator',
                    Status :'Active' ,
                    String_Date: '01/01/2023',
                    Name: 'Benjmin Andoh',
                    Word_Date: 'Jan 1 2023',
                    Expiry_Date:'098765432876543',
                    Username:req.body.Username,
                    password:req.body.password,
                

        
                    Publick_Key: '123456789',
                    Secret_Key: '67895478896',
                   
                    password:bcrypt.hashSync(req.body.password, salt)
                }

                   let sql = `INSERT INTO users SET ?`;
                   pool.query(sql, Data, (err, result)=> {
                      if(err) throw err ;
                   
                    console.log('test added ')
                    req.flash('success_msg', 'You are now registered and you can log in')
                    res.redirect('/SuccessPage');
     
                })

            }else{
                errors.push({ msg: 'UserName Exist' })
                console.log('UserName Exist ')
                res.render('register', {
                    errors,
                })
            }
          })


        }else{
            errors.push({ msg: 'Email exist allready' })
            console.log('Email Exist ')
            res.render('register', {
                errors,
            })
        }
        })

    }
   


})


router.post('/login', (req,res,next) =>{
    passport.use(
        new LocalStrategy({ usernameField: 'email', passwordField:'password' }, (email, password, done) => { 
          
          pool.query(`SELECT * from users where Email = ?`, email, (error, results) => {
           
            if(error) throw error;
           
          
            if(results.length === 0) {
                return done(null, false, { message: 'The email is not registered' });
            }else{
            let user = results[0]
            //console.log(user)
             bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                } else {
                   //console.log('User password incorrect')
                    return done(null, false, { message: 'Password incorrect' });
                }

            })


            }
        
          })
        })
    )

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, {
            id: user.id,
            Username: user.Username,
            email: user.email,
            Pharmacy_name:user.Pharmacy_name,
            Telephone:user.Telephone,
            Location:user.Location,
            RetailPharmacy:user.RetailPharmacy,
            WholesalePharmacy:user.WholesalePharmacy,
            prefernotto:user.prefernotto,
            Publick_Key:user.Publick_Key,
            Secret_Key:user.Secret_Key,
            Name:user.Name

          });
        });
      });
      

      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });


    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})







module.exports = router;
