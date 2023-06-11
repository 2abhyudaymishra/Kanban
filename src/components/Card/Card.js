import React, { useState } from 'react'
import "./Card.css"
import { CheckSquare, Clock,  X } from 'react-feather'
import Chip from '../Chips/Chip'
import CardInfo from './CardInfo/CardInfo';
export default function Card(props) {
    const[showModal,setShowModal]=useState(false);
   
  return (
    <>
        {showModal && <CardInfo 
        onClose={()=>setShowModal(false)} 
        card={props.card} 
        updatecard={props.updatecard} 
        boardid={props.boardid}
        />}
   
    <div className='card' 
    draggable
    onDragEnter={()=>props.handledragenter(props.card?.id,props.boardid)}
    onDragEnd={()=>props.handledragend(props.card?.id,props.boardid)}
    onClick={()=>{setShowModal(true)}}
    >
       
        <div className="card_top">
            <div className="card_top_labels">
            {
                props.card.labels?.map((e,index)=><Chip color={e.color} text={e.text} key={e.text+index}/>)
            }
                
            </div>
            <div className="delete_card" onClick={()=>{props.removecard(props.card?.id,props.boardid)}}>
                <X/>
            </div>
        </div>
        
        <div className="card_title">
            <p>{props.card?.title}</p>
        </div>
        <div className="card_footer">
            <p><Clock/>{props.card?.date}</p>
            {props.card?.tasks?.length>0 && <p><CheckSquare/>{props.card?.tasks?.filter((item)=>item.completed===true).length}/{props.card?.tasks?.length}</p>}

        </div>
        
    </div>
    </>
  )
}
