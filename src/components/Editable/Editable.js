import React, { useState } from 'react'
import { X } from 'react-feather'
import "./Editable.css"
export default function Editable(props) {
    const [showedit, setShowEdit] = useState(false)
    const[inputvalue,setinputvalue]=useState(props.default ||'')
    return (
        <div className='editable'>

            {showedit ?
                (<form 
                className={`editable_edit ${props.editClass || ""}`}  
                onSubmit={(e) => {
                    e.preventDefault(); 
                    if (props.onSubmit) { props.onSubmit(inputvalue) }
                    setinputvalue("");
                    setShowEdit(false);
                }}>
                    <input 
                    autoFocus 
                    type="text" 
                    value={inputvalue}
                    onChange={(e)=>{setinputvalue(e.target.value)}}
                    placeholder={props.placeholder || "Enter item"}  />

                    <div className="editable_edit_footer" >
                        <button type='submit'>{props.buttontext || "Add"}</button>
                        <X onClick={() => setShowEdit(false)} />
                    </div>
                </form>)
                :
                (<p className={`editable_display ${props.displayClass || ''}`} onClick={() => setShowEdit(true)}>{props.text || "Add Item"}</p>)}



        </div>
    )
}
