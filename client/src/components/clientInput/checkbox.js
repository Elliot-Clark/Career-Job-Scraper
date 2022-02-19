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

    let expanded = false;
    const showCheckboxes = () => {
        const checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }


    return (
        <div id="checkboxContainer">
            
            <div className="multiselect">
                <div className="selectBox" onClick={showCheckboxes}>
                    <select>
                        <option>Companies</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div id="checkboxes">
                    <button type="button" name="checkall" onClick={selectAll}>Select All</button>
                    <button type="button" name="checkall" onClick={unSelectAll}>Unselect All</button>
                    
                    <label htmlFor="Adobe"><input className="comapnyCheckbox" type="checkbox" id="adobe"/>Adobe</label>
                    <label htmlFor="Amazon"><input className="comapnyCheckbox" type="checkbox" id="amazon"/>Amazon</label>
                    <label htmlFor="Apple"><input className="comapnyCheckbox" type="checkbox" id="apple"/>Apple</label>
                    <label htmlFor="Crateandbarrel"><input className="comapnyCheckbox" type="checkbox" id="crateandbarrel"/>Crate and Barrel</label>
                    <label htmlFor="ebay"><input className="comapnyCheckbox" type="checkbox" id="ebay"/>eBay</label>
                    <label htmlFor="Facebook"><input className="comapnyCheckbox" type="checkbox" id="facebook"/>Facebook</label>
                    <label htmlFor="Intuit"><input className="comapnyCheckbox" type="checkbox" id="intuit"/>Intuit</label>
                    <label htmlFor="Microsoft"><input className="comapnyCheckbox" type="checkbox" id="microsoft"/>Microsoft</label>
                    <label htmlFor="Paypal"><input className="comapnyCheckbox" type="checkbox" id="paypal"/>Paypal</label>
                    <label htmlFor="SAP"><input className="comapnyCheckbox" type="checkbox" id="sap"/>SAP</label>
                    <label htmlFor="Shopify"><input className="comapnyCheckbox" type="checkbox" id="shopify"/>Shopify</label>
                    <label htmlFor="Uber"><input className="comapnyCheckbox" type="checkbox" id="uber"/>Uber</label>
                </div>
            </div>


        </div>
    )
}

export default Checkbox