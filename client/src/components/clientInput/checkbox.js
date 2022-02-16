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

            <div id="checkall">
                <button type="button" name="checkall" onClick={selectAll}>Select All</button>

                <button type="button" name="checkall" onClick={unSelectAll}>Unselect All</button>
            </div>

            <div id="checkboxes">
                <span>
                    <input type="checkbox" id="adobe" className="comapnyCheckbox" name="Adobe"></input>
                    <label htmlFor="Adobe">Adobe</label>
                </span>

                <span>
                    <input type="checkbox" id="amazon" className="comapnyCheckbox" name="Amazon"></input>
                    <label htmlFor="Amazon"> Amazon</label>
                </span>

                <span>
                    <input type="checkbox" id="paypal" className="comapnyCheckbox" name="Paypal"></input>
                    <label htmlFor="Paypal">Paypal</label>
                </span>

                <span>
                    <input type="checkbox" id="apple" className="comapnyCheckbox" name="Apple"></input>
                    <label htmlFor="Apple">Apple</label>
                </span>
                
                <span>
                    <input type="checkbox" id="facebook" className="comapnyCheckbox" name="Facebook"></input>
                    <label htmlFor="facebook">Facebook</label>
                </span>

                <span>
                    <input type="checkbox" id="uber" className="comapnyCheckbox" name="Uber"></input>
                    <label htmlFor="Uber">Uber</label>
                </span>

                <span>
                    <input type="checkbox" id="crateandbarrel" className="comapnyCheckbox" name="Crateandbarrel"></input>
                    <label htmlFor="Crateandbarrel">Crate and Barrel</label>
                </span>

                <span>
                    <input type="checkbox" id="ebay" className="comapnyCheckbox" name="eBay"></input>
                    <label htmlFor="ebay">eBay</label>
                </span>

                <span>
                    <input type="checkbox" id="microsoft" className="comapnyCheckbox" name="Microsoft"></input>
                    <label htmlFor="microsoft">Microsoft</label>
                </span>

                <span>
                    <input type="checkbox" id="sap" className="comapnyCheckbox" name="SAP"></input>
                    <label htmlFor="SAP">SAP</label>
                </span>

                <span>
                    <input type="checkbox" id="intuit" className="comapnyCheckbox" name="Intuit"></input>
                    <label htmlFor="intuit">Intuit</label>
                </span>

                <span>
                    <input type="checkbox" id="shopify" className="comapnyCheckbox" name="Shopify"></input>
                    <label htmlFor="shopify">Shopify</label>
                </span>
            </div>
        </div>
    )
}

export default Checkbox