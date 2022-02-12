import React from 'react'
import './checkbox.css'


let Checkbox = () => {

    return (
        <div>
            <input type="checkbox" id="adobe" name="Adobe"></input>
            <label htmlFor="Adobe">Adobe</label>

            <input type="checkbox" id="amazon" name="Amazon"></input>
            <label htmlFor="Amazon"> Amazon</label>

            <input type="checkbox" id="paypal" name="Paypal"></input>
            <label htmlFor="Paypal"> Paypal</label>

            <input type="checkbox" id="apple" name="Apple"></input>
            <label htmlFor="Apple">Apple</label>

            <input type="checkbox" id="facebook" name="facebook"></input>
            <label htmlFor="facebook">Facebook</label>

            <input type="checkbox" id="uber" name="Uber"></input>
            <label htmlFor="Uber">Uber</label>

            <input type="checkbox" id="crateandbarrel" name="Crateandbarrel"></input>
            <label htmlFor="Crateandbarrel">Crate and Barrel</label>

            <input type="checkbox" id="ebay" name="ebay"></input>
            <label htmlFor="ebay">eBay</label>

            <input type="checkbox" id="microsoft" name="microsoft"></input>
            <label htmlFor="microsoft">Microsoft</label>

            <input type="checkbox" id="sap" name="SAP"></input>
            <label htmlFor="SAP">SAP</label>

            <input type="checkbox" id="intuit" name="intuit"></input>
            <label htmlFor="intuit">Intuit</label>

            <input type="checkbox" id="shopify" name="shopify"></input>
            <label htmlFor="shopify">Shopify</label>

        </div>
    )
}

export default Checkbox