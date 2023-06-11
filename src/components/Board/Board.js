import React from 'react'
import "./Board.css"
import { X } from 'react-feather'
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
function Board(props) {

    
    return (
        <div className='board'>
            <div className="board_top">
                <p className='board_top_title'>{props.board?.title}<span>{`  ${props.board?.cards.length}`}</span></p>

                <div className="board_top_delete" onClick={()=>props.removeboard(props.board?.id)}>
                    <X/>
                </div>
            </div>
            
            <div className="board_cards custom-scroll">
            {
                
                props.board.cards.map((item)=>
                    <Card 
                    key={item.id} 
                    card={item} 
                    removecard={props.removecard} 
                    boardid={props.board?.id} 
                    handledragend={props.handleDragend} 
                    handledragenter={props.handleDragenter}
                    updatecard={props.updatecard}
                    />
                    )
            }
                <Editable displayClass = "boards_cards_add" text ="Add Card" placeholder="Enter Card Title" onSubmit={(value)=>{props.addcard(value,props.board?.id)} }/>


            </div>
        </div>
    )
}

export default Board;
