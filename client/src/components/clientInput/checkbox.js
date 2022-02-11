import React from 'react'
import './checkbox.css'


let Checkbox = () => {

    return (
        <div>
            <input type="checkbox" id="Amazon" name="Amazon"></input>
            <label htmlFor="Amazons"> Amazon</label>
            <input type="checkbox" id="Paypal" name="Paypal"></input>
            <label htmlFor="Paypals"> Paypal</label>
        </div>
    )
}

export default Checkbox