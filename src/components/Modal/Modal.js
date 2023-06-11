import React from 'react'
import "./Modal.css"
export default function Modal(props) {
  return (
    <div className='modal' onClick={()=>{ if(props.onClose)props.onClose()}}>
        <div className="modal_content custom-scroll" onClick={(event)=>event.stopPropagation()}>
           {props.children}
        </div>
      
    </div>
  )
};