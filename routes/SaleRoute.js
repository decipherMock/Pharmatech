const express = require('express');
const router = express.Router();
const pool = require('../config/database')


router.get('/Retailmainpage', (req, res) => {
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
      res.render('mainsales', {ListDrugs:results})
    })
   
})


router.post('/Searchproducts', (req, res) => {
 //  console.log(req.body)

     let Product = (req.body.Product).trim()

     let sql = `SELECT * FROM retaildrugs WHERE Drug_name LIKE '${Product}%'`
    
     ///let sql = `SELECT * FROM payments WHERE Email = ? AND UserName =? AND Public_Key = ? AND Secret_Key = ? ORDER BY id DESC LIMIT 50`
     pool.query(sql,   (error, results) => {
         if(error) throw error;
        //  console.log(results)
         res.json({data:results})
     })
})



router.post('/Searchforcustomername', (req, res) => {
    let Customer_ID = (req.body.Customer_ID).trim()
    let UserName = req.user.Username;
    let Publick_Key = req.user.Publick_Key
    let Secret_Key = req.user.Secret_Key
   
    let sql = `SELECT customer_Name FROM customers WHERE UserName =? AND Publick_Key = ? AND Secret_Key = ? AND Customer_ID = ?`
    pool.query(sql, [
      UserName,
      Publick_Key,
      Secret_Key,
      Customer_ID
    ], 
 
    (error, results) => {
        if(error) throw error;
     // console.log(results[0])
      res.json({Name:results[0]})
    })
   
})

module.exports = router;