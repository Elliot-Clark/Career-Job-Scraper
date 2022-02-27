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
            <label htmlFor="multiselect">Companies</label>
            <div className="multiselect">
                <div className="selectBox" onClick={showCheckboxes}>
                    <select>
                        <option>Click to View</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div id="checkboxes">
                    <button type="button" name="checkall" onClick={selectAll}>Select All</button>
                    <button type="button" name="checkall" onClick={unSelectAll}>Unselect All</button>
                    
                    <label htmlFor="Adobe"><input className="comapnyCheckbox" type="checkbox" id="adobe" defaultChecked/>Adobe</label>
                    <label htmlFor="Amazon"><input className="comapnyCheckbox" type="checkbox" id="amazon" defaultChecked/>Amazon</label>
                    <label htmlFor="Apple"><input className="comapnyCheckbox" type="checkbox" id="apple" defaultChecked/>Apple</label>
                    <label htmlFor="Crateandbarrel"><input className="comapnyCheckbox" type="checkbox" id="crateandbarrel" defaultChecked/>Crate and Barrel</label>
                    <label htmlFor="ebay"><input className="comapnyCheckbox" type="checkbox" id="ebay" defaultChecked/>eBay</label>
                    <label htmlFor="Facebook"><input className="comapnyCheckbox" type="checkbox" id="facebook" defaultChecked/>Facebook</label>
                    <label htmlFor="Intel"><input className="comapnyCheckbox" type="checkbox" id="intel" defaultChecked/>Intel</label>
                    <label htmlFor="Intuit"><input className="comapnyCheckbox" type="checkbox" id="intuit" defaultChecked/>Intuit</label>
                    <label htmlFor="Microsoft"><input className="comapnyCheckbox" type="checkbox" id="microsoft" defaultChecked/>Microsoft</label>
                    <label htmlFor="Paypal"><input className="comapnyCheckbox" type="checkbox" id="paypal" defaultChecked/>Paypal</label>
                    <label htmlFor="SAP"><input className="comapnyCheckbox" type="checkbox" id="sap" defaultChecked/>SAP</label>
                    <label htmlFor="Shopify"><input className="comapnyCheckbox" type="checkbox" id="shopify" defaultChecked/>Shopify</label>
                    <label htmlFor="Uber"><input className="comapnyCheckbox" type="checkbox" id="uber" defaultChecked/>Uber</label>
                </div>
            </div>
        </div>
    )
}

export default Checkbox