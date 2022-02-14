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
                <input type="checkbox" className="comapnyCheckbox" name="Adobe"></input>
                <label htmlFor="Adobe">Adobe</label>

                <input type="checkbox" className="comapnyCheckbox" name="Amazon"></input>
                <label htmlFor="Amazon"> Amazon</label>

                <input type="checkbox" className="comapnyCheckbox" name="Paypal"></input>
                <label htmlFor="Paypal"> Paypal</label>

                <input type="checkbox" className="comapnyCheckbox" name="Apple"></input>
                <label htmlFor="Apple">Apple</label>
                
                <input type="checkbox" className="comapnyCheckbox" name="Facebook"></input>
                <label htmlFor="facebook">Facebook</label>

                <input type="checkbox" className="comapnyCheckbox" name="Uber"></input>
                <label htmlFor="Uber">Uber</label>

                <input type="checkbox" className="comapnyCheckbox" name="Crateandbarrel"></input>
                <label htmlFor="Crateandbarrel">Crate and Barrel</label>

                <input type="checkbox" className="comapnyCheckbox" name="ebay"></input>
                <label htmlFor="ebay">eBay</label>

                <input type="checkbox" className="comapnyCheckbox" name="microsoft"></input>
                <label htmlFor="microsoft">Microsoft</label>

                <input type="checkbox" className="comapnyCheckbox" name="SAP"></input>
                <label htmlFor="SAP">SAP</label>

                <input type="checkbox" className="comapnyCheckbox" name="intuit"></input>
                <label htmlFor="intuit">Intuit</label>

                <input type="checkbox" className="comapnyCheckbox" name="shopify"></input>
                <label htmlFor="shopify">Shopify</label>
            </span>
        </div>
    )
}

export default Checkbox