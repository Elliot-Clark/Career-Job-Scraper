import React from 'react'
import './checkbox.css'


let Checkbox = () => {

    const checkboxes = document.getElementsByClassName('comapnyCheckbox');
    const selectAll = () => {
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = "checked"
        }     
    }

    const unSelectAll = () => {
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = ""
        }     
    }

    return (
        <div id="checkboxContainer">
            <span id="checkall">
                <button type="button" name="checkall" onClick={selectAll}>Select All</button>

                <button type="button" name="checkall" onClick={unSelectAll}>Unselect All</button>
            </span>
                <span id="checkboxes">
                <input type="checkbox" id="adobe" className="comapnyCheckbox" name="Adobe"></input>
                <label htmlFor="Adobe">Adobe</label>

                <input type="checkbox" id="amazon" className="comapnyCheckbox" name="Amazon"></input>
                <label htmlFor="Amazon"> Amazon</label>

                <input type="checkbox" id="paypal" className="comapnyCheckbox" name="Paypal"></input>
                <label htmlFor="Paypal"> Paypal</label>

                <input type="checkbox" id="apple" className="comapnyCheckbox" name="Apple"></input>
                <label htmlFor="Apple">Apple</label>
                
                <input type="checkbox" id="facebook" className="comapnyCheckbox" name="Facebook"></input>
                <label htmlFor="facebook">Facebook</label>

                <input type="checkbox" id="uber" className="comapnyCheckbox" name="Uber"></input>
                <label htmlFor="Uber">Uber</label>

                <input type="checkbox" id="crateandbarrel" className="comapnyCheckbox" name="Crateandbarrel"></input>
                <label htmlFor="Crateandbarrel">Crate and Barrel</label>

                <input type="checkbox" id="ebay" className="comapnyCheckbox" name="eBay"></input>
                <label htmlFor="ebay">eBay</label>

                <input type="checkbox" id="microsoft" className="comapnyCheckbox" name="Microsoft"></input>
                <label htmlFor="microsoft">Microsoft</label>

                <input type="checkbox" id="sap" className="comapnyCheckbox" name="SAP"></input>
                <label htmlFor="SAP">SAP</label>

                <input type="checkbox" id="intuit" className="comapnyCheckbox" name="Intuit"></input>
                <label htmlFor="intuit">Intuit</label>

                <input type="checkbox" id="shopify" className="comapnyCheckbox" name="Shopify"></input>
                <label htmlFor="shopify">Shopify</label>
            </span>
        </div>
    )
}

export default Checkbox