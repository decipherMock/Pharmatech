    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  

  $('.hide').hide()
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  
  let MyfirstTableBody = document.getElementById('MyfirstTablediv')
  let SalestableBodyDiv = document.getElementById('SalestableBodyDiv')
  /////////////////////////////
  document.getElementById('ProductSearch').addEventListener('keyup', function(e){
    let ProductSearch = e.target.value
    let Data = {Product:ProductSearch}

        if(ProductSearch !== ''){
            MyfirstTableBody.innerHTML = ''
            $.ajax({ 
                type: 'POST',
                url: '/Searchproducts',
                ContentType: 'application/json',
               data: Data,
                success: function(data) {
                let payload = data.data
              //  console.log(payload)
                  for(var x = 0; x < payload.length; x++){
                      let TRows = MyfirstTableBody.insertRow(x)
                      let Cell0 = TRows.insertCell(0)
                      let Cell1 = TRows.insertCell(1)
                      let Cell2 = TRows.insertCell(2)
                      let Cell3 = TRows.insertCell(3)
                      let Cell4 = TRows.insertCell(4)
                      let Cell5 = TRows.insertCell(5)
                      let Cell6 = TRows.insertCell(6)
                      let Cell7 = TRows.insertCell(7)
                      let Cell8 = TRows.insertCell(8)
                      let Cell9 = TRows.insertCell(9)
                      let Cell10 = TRows.insertCell(10)
                      let Cell11 = TRows.insertCell(11)
                      let Cell12 = TRows.insertCell(11)
                    
                    
                      Cell4.style.display ='none'
                      Cell5.style.display ='none'
                      Cell6.style.display ='none'
                      Cell7.style.display ='none'
                      Cell8.style.display ='none'

                      Cell9.style.display ='none'
                      Cell10.style.display ='none'
                      Cell11.style.display ='none'
                      Cell12.style.display ='none'
                    

                      Cell0.innerHTML = x+1 
                      Cell1.innerHTML = payload[x].Drug_name 
                      Cell2.innerHTML = payload[x].Left_Quantity_Achimota
                      Cell3.innerHTML = payload[x].Left_Quantity_Tesano
                      Cell4.innerHTML = payload[x].Vender_name
                      Cell5.innerHTML = payload[x].PackSize
                      Cell6.innerHTML = payload[x].Cost_price

                      Cell7.innerHTML = payload[x].Selling_price
                      Cell8.innerHTML = payload[x].Drug_Type
                      Cell9.innerHTML = payload[x].Left_Quantity
                      Cell10.innerHTML = payload[x].Drug_Reff
                      Cell11.innerHTML = payload[x].Vendor_Reff
                      Cell12.innerHTML = payload[x].Shelve_Number


                      

                      TRows.onclick = TableClick
                  }
                  
                }
            });
        }else{
            MyfirstTableBody.innerHTML = ''
        }
           
  })



  function TableClick (){
    index = this.parentElement.rowIndex;
    var Drug_name = this.cells[1].innerText;
    var Vender_name= this.cells[4].innerText;
    var Quantity = this.cells[9].innerText;
    var Selling_price = this.cells[7].innerText;

    var Cost_price = this.cells[6].innerText;
    var Drug_Reff = this.cells[10].innerText;
    var Vendor_Reff = this.cells[11].innerText;
    var Drug_Type= this.cells[8].innerText;

    var PackSize = this.cells[5].innerText;
    var Shelve_Number = this.cells[12].innerText;


    let InfoData = {
        Drug_name: Drug_name,
        Drug_Type: Drug_Type,
        Available: Quantity,
        Selling_price: Selling_price,
        Cost_price: Cost_price,
        Drug_Reff: Drug_Reff,
        Vendor_Reff: Vendor_Reff,
        Vender_name:Vender_name,
        PackSize:PackSize,
        Shelve_Number:Shelve_Number
    }


    MyTableCreate(InfoData)
}


function MyTableCreate(InfoData) {
    let TRows = SalestableBodyDiv.insertRow(0)
    let Cell0 = TRows.insertCell(0)
    let Cell1 = TRows.insertCell(1)
    let Cell2 = TRows.insertCell(2)
    let Cell3 = TRows.insertCell(3)
    let Cell4 = TRows.insertCell(4)
    let Cell5 = TRows.insertCell(5)
    let Cell6 = TRows.insertCell(6)
    let Cell7 = TRows.insertCell(7)

    let Cell8 = TRows.insertCell(8)
    let Cell9 = TRows.insertCell(9)
    let Cell10 = TRows.insertCell(10)


    Cell0.textContent = InfoData.Drug_name
    Cell1.textContent = InfoData.Vender_name
    Cell2.textContent = InfoData.Available
    Cell3.textContent = Number(InfoData.Selling_price).toFixed(2)
    Cell4.textContent = InfoData.Cost_price
    Cell5.textContent = 1
    Cell6.textContent = InfoData.Selling_price
    Cell7.textContent = InfoData.Drug_Type
    Cell8.textContent = InfoData.Drug_Reff
    Cell9.textContent = InfoData.Vendor_Reff
   

    Cell5.setAttribute("contentEditable", "true")
    
  
    Cell4.style.display = 'none'
   
    Cell7.style.display = 'none'
    Cell8.style.display = 'none'
    Cell9.style.display = 'none'
   
    let DelBtn = document.createElement("button")
    DelBtn.innerHTML = "Delete"
    DelBtn.setAttribute('class','btn btn-danger')


   
     Cell10.append(DelBtn)

     Descriptioninput(InfoData)

     DelBtn.onclick = myDeleteRow

    MyInitialAdd(InfoData.Selling_price)

    Cell5.addEventListener('input', function(event){
       MySaveRowChange()
     })

}


function Descriptioninput(InfoData){
  document.getElementById('Item_description').value = InfoData.Drug_name
  document.getElementById('Item_price').value = InfoData.Selling_price
  document.getElementById('Item_packsize').value = InfoData.PackSize
  document.getElementById('Item_ava').value = InfoData.Available
  document.getElementById('itemShelvenumber').value = InfoData.Shelve_Number
}


function MyInitialAdd(value) {
    const SalesArray = []
    const Array222 = []
    for (var i = 0; i < SalestableBodyDiv.rows.length; i++) {
        let CurrentRow = SalestableBodyDiv.rows[i]
        let Sell = Number(CurrentRow.cells[3].innerText)
        let Pieces = Number(CurrentRow.cells[5].innerText)
        let Amount = Number(Sell * Pieces)
        CurrentRow.cells[6].innerText =  Amount.toFixed(2)
        SalesArray.push(Amount)
        Array222.push(Pieces)

    }

    let TotalAmount = SalesArray.reduce((total, current) => total + current, 0);
    let TotalPieces = Array222.reduce((total, current) => total + current, 0);

    document.getElementById('Grand_Total_One').value = TotalAmount.toFixed(2)
      document.getElementById('Grand_Total_Two').value = TotalAmount.toFixed(2)
      document.getElementById('AmountDueOne').value = TotalAmount.toFixed(2)
 }



function myDeleteRow() {
    $(this).closest('tr').remove()
    myUpdateValue()
    return false
}


function MySaveRowChange() {
    const SalesArray = []
    const Array222 = []
    for (var i = 0; i < SalestableBodyDiv.rows.length; i++) {
        let CurrentRow = SalestableBodyDiv.rows[i]
        let Sell = Number(CurrentRow.cells[3].innerText)
        let Pieces = Number(CurrentRow.cells[5].innerText)
        let Amount = Number(Sell * Pieces)
        CurrentRow.cells[6].innerText =  Amount.toFixed(2)
        SalesArray.push(Amount)
        Array222.push(Pieces)

    }

    let TotalAmount = SalesArray.reduce((total, current) => total + current, 0);
    let TotalPieces = Array222.reduce((total, current) => total + current, 0);

    document.getElementById('Grand_Total_One').value = TotalAmount.toFixed(2)
    document.getElementById('Grand_Total_Two').value = TotalAmount.toFixed(2)
    document.getElementById('AmountDueOne').value = TotalAmount.toFixed(2)
}


function myUpdateValue() {
    const SalesArray = []
    const Array222 = []
    for (var i = 0; i < SalestableBodyDiv.rows.length; i++) {
        let CurrentRow = SalestableBodyDiv.rows[i]
        let Sell = Number(CurrentRow.cells[3].innerText)
        let Pieces = Number(CurrentRow.cells[5].innerText)
        let Amount = Number(Sell * Pieces)
        CurrentRow.cells[6].innerText =  Amount.toFixed(2)
        SalesArray.push(Amount)
        Array222.push(Pieces)

    }

    let TotalAmount = SalesArray.reduce((total, current) => total + current, 0);
    let TotalPieces = Array222.reduce((total, current) => total + current, 0);

      document.getElementById('Grand_Total_One').value = TotalAmount.toFixed(2)
      document.getElementById('Grand_Total_Two').value = TotalAmount.toFixed(2)
      document.getElementById('AmountDueOne').value = TotalAmount.toFixed(2)

      
}



document.getElementById('CustomerIdentity').addEventListener('change', function(event){
  Customer_ID = (event.target.value).trim()
  let Data = {Customer_ID:Customer_ID}
  // alert(Customer_ID)
  $.ajax({ 
    type: 'POST',
    url: '/Searchforcustomername',
    ContentType: 'application/json',
   data: Data,
    success: function(data) {
    let payload = data.Name

    document.getElementById('Customer_Name_One').value = payload.customer_Name
    }
    })

})



document.getElementById('Delivery_Fee_One').addEventListener('input', function(event){
    let Fee = Number(event.target.value)
    let GrandTotal = Number(document.getElementById('Grand_Total_Two').value) 
    let AmountDue = Fee + GrandTotal

    document.getElementById('Delivery_Fee_Two').value = Fee.toFixed(2)
    document.getElementById('AmountDueOne').value = AmountDue.toFixed(2)

   
})


document.getElementById('Discountvalue').addEventListener('input', function(event){
    let Discountvalue = Number(event.target.value)
    let GrandTotal = Number(document.getElementById('Grand_Total_Two').value)
    let Delivery_Fee = Number(document.getElementById('Delivery_Fee_Two').value)
     let MyVatValue = Number(document.getElementById('MyVatValue').value)

     let MyValue = GrandTotal - (Discountvalue+MyVatValue)
     let AmountDue = Delivery_Fee + MyValue

    document.getElementById('AmountDueOne').value = AmountDue.toFixed(2)
})


document.getElementById('MyVatValue').addEventListener('input', function(event){
    let MyVatValue = Number(event.target.value)
    let GrandTotal = Number(document.getElementById('Grand_Total_Two').value)
    let Delivery_Fee = Number(document.getElementById('Delivery_Fee_Two').value)
     let Discountvalue = Number(document.getElementById('Discountvalue').value)

     let MyValue = GrandTotal - (Discountvalue+MyVatValue)
     let AmountDue = Delivery_Fee + MyValue

    document.getElementById('AmountDueOne').value = AmountDue.toFixed(2)
})



document.getElementById('TransactionMethod').addEventListener('change', function(event){
  let trxMethod  = event.target.value

  document.getElementById('TranxMode').value = trxMethod
})


document.getElementById('PayingAmount').addEventListener('input', function(event){
    let PayingAmount = Number(event.target.value)
     let AmountDue = Number(document.getElementById('AmountDueOne').value)
     let balance = PayingAmount - AmountDue
     document.getElementById('ChangeBalance').value = balance.toFixed(2)
})




document.getElementById('SaveOnlyBtn').addEventListener('click', function(){
    let Customer_ID = document.getElementById('CustomerIdentity').value
    let customer_Name = document.getElementById('Customer_Name_One'.value)
    let Order_Type = document.getElementById('Order_Type').value
    let Order_Region = document.getElementById('Order_Region').value
    let Delivery_Area = document.getElementById('Delivery_Area').value

    let Grand_Total = document.getElementById('Grand_Total_Two').value
    let Discount  = document.getElementById('Discountvalue').value
    let MyVatValue = document.getElementById('MyVatValue').value
     let AmountDue = document.getElementById('AmountDueOne').value



})