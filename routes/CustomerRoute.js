const express = require('express');
const router = express.Router();
const pool = require('../config/database')


router.get('/Customerlist', (req, res) => {
    let UserName = req.user.Username;
    let Publick_Key = req.user.Publick_Key
    let Secret_Key = req.user.Secret_Key
   
    let sql = `SELECT * FROM customers WHERE UserName =? AND Publick_Key = ? AND Secret_Key = ?`
    pool.query(sql, [
      UserName,
      Publick_Key,
      Secret_Key
    ], 
 
    (error, results) => {
        if(error) throw error;
      //  console.log(results)
      res.render('customerlist', {ListDrugs:results})
    })
})


router.get('/Customerregistrationform', (req, res) => {
    res.render('customerform')
})


router.post('/Retail_CustomerAddNew', function(req,res){
    console.log(req.body)
    let customer_Name = req.body.customer_Name
    let Telephone = req.body.Telephone
    let CustomerType = req.body.CustomerType
    let EmailAddress = req.body.emailaddress
    let Location = req.body.location
    let Gender = req.body.Gender
    let Customer_ID = customer_Name.replace(/\s/g,'') +''+new Date().getTime()
    let UserName = (req.user.Username).trim()
    let Publick_Key = (req.user.Publick_Key).trim()
    let Secret_Key = (req.user.Secret_Key).trim()

    console.log(10)
    let String_Date  = new Date().toLocaleDateString().split(",")[0]
    let Word_Date = new Date().toDateString()
    let Name = req.user.Name

    let newCustomers = {customer_Name, Telephone, EmailAddress, Gender, CustomerType, Location, String_Date, Word_Date, Name, Customer_ID, UserName, Secret_Key, Publick_Key}

    let sql = `INSERT INTO customers SET ?`;

    console.log(20)
    pool.query(sql, newCustomers, (err, result)=> {
        if(err) throw err ;
     
        console.log(result)
        })

        res.json({data:'The customer has been saved'})
         
  })
  


module.exports = router;