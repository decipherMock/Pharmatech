const express = require('express');
const router = express.Router();
const pool = require('../config/database')

router.get('/addnew', (req, res) => {
   res.render('WareHouse_adddrug')
})


router.post('/Adddrug', function(req, res){
 
    let UPC_code = (req.body.UPC_code).replace(/\s/g,'')
  
    let Drug_name = req.body.Drug_name
    let Drug_Type = req.body.Drug_Type
    let Unit_measure = req.body.Unit_measure
    let Cost_price = req.body.Cost_price
    let Selling_price = req.body.Selling_price
    let Vender_name = req.body.Vender_name
    let Drug_Reff = req.body.Drug_Reff
    let Shelve_Number = req.body.Shelve_Number

    let Vendor_Reff = (req.body.Vendor_Reff).replace(/\s/g,'')
 
    let Distributor = req.body.Distributor
    let Distributor_Reff = (req.body.Distributor_Reff).replace(/\s/g,'')
   
    let UserName = (req.user.Username).replace(/\s/g,'')

    let inputEmail = (req.user.email).replace(/\s/g,'')

    let Added_name = 'Benjy'
    let Secret_Key = (req.user.Secret_Key).replace(/\s/g,'')
    let Publick_Key = (req.user.Publick_Key).replace(/\s/g,'')
  
    let Quantity = 0
    let Ini_Quantity = 0
    let Added_Quantity = 0
    let Sold_Quantity = 0
    let Left_Quantity = 0
    let Left_Quantity_Achimota = 0
    let Left_Quantity_Tesano = 0
    let PackSize = 0
    let Overall_Quantity = 0
    let SoldAmount = 0
    let SoldQty = 0
    let ProfitMade = 0
    let outofstocklimit = 0

    let Expiry_Date = ''
    let  Date_Expiry = ''
    let Expiry_Month = ''

    let warehouseData = {Drug_name, Drug_Type, Quantity,Unit_measure,Cost_price,Selling_price,Vender_name, Shelve_Number,Drug_Reff,Vendor_Reff, outofstocklimit, UserName,inputEmail,Added_name,Distributor, Distributor_Reff, Secret_Key, Publick_Key}

    let retailData = { Drug_name, Drug_Type, Quantity,Unit_measure,Cost_price,Selling_price,Vender_name, Shelve_Number,Drug_Reff,Vendor_Reff,UPC_code, UserName,inputEmail,Added_name, Ini_Quantity, Added_Quantity,Sold_Quantity,Left_Quantity_Achimota, Left_Quantity_Tesano,PackSize, Overall_Quantity,Left_Quantity, outofstocklimit, Date_Expiry, Expiry_Date, Expiry_Month, Secret_Key, Publick_Key}
  
    let salesData = {Drug_name, Drug_Type,Unit_measure,Cost_price,Selling_price,Vender_name,Shelve_Number,Drug_Reff,Vendor_Reff, UPC_code, SoldAmount, SoldQty, ProfitMade, UserName,Secret_Key, Publick_Key}

    let warehousdatasql = `INSERT INTO warehousedrugs SET ?`;
    let saledatasql = `INSERT INTO salelogs SET ?`;
    let retaildatasql = `INSERT INTO retaildrugs SET ?`;
    pool.query(`SELECT * from retaildrugs where Drug_Reff = ? AND Vendor_Reff = ?`,[Drug_Reff, Vendor_Reff], (error, results, fields)=>{
        if(error) throw error;
        // console.log(results)
     if(results.length === 0){
      
        pool.query(warehousdatasql, warehouseData, (err, result)=> {
            if(err) throw err ;
         
            // console.log(result)
            })


        pool.query(retaildatasql, retailData, (err, result)=> {
        if(err) throw err ;
        
          //  console.log(result)
        })


        pool.query(saledatasql, salesData, (err, result)=> {
            if(err) throw err ;
         
            // console.log(result)
            })

      res.json({Mes:'Drug Saved Successfully'})
     }

     else{
     res.json({Mes:'Drug exist in the database'})
     }
    })


})
module.exports = router;