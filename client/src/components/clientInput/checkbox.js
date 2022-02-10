import React from 'react'
import './checkbox.css'


let Checkbox = () => {

    let test = () => {
        let a = document.getElementById("Amazon").checked
        let b = document.getElementById("Paypal").checked
        console.log(a);
        console.log(b);
    }

    return (
        <div>
            <input type="checkbox" id="Amazon" name="Amazon"></input>
            <label htmlFor="Amazons"> Amazon</label>
            <input type="checkbox" id="Paypal" name="Paypal" onChange={test}></input>
            <label htmlFor="Paypals"> Paypal</label>
        </div>
    )
}

export default Checkbox