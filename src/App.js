import React, { useState } from 'react'
import './App.css';
import Navbar from './components/navbar';
import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';
function App() {
  const [boards, setBoard] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Card 1",
          tasks: [
          {id:Date.now()+ Math.random(),text:"help",completed:true},
          {id:Date.now()+ Math.random(),text:"each",completed:false},
          {id:Date.now()+ Math.random(),text:"other",completed:false}
        ],

          labels: [
            {
            text: "frontend",
            color: "blue"
            },
            {
            text: "web developer",
            color: "pink"
            }
          ],
          desc: "assdadasdas",
          date: "2002-12-01"
        },
        {
          id: Date.now() + Math.random(),
          title: "Card 2",
          tasks: [],
          labels: [{
            text: "backend",
            color: "green"
          }],
          desc: "assdadasdas",
          date: ""
        }
      ]
    }
  ])
 
  const addcard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      tasks: [],
      labels: [],
      desc: "",
      date: ""
    }
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;
    //temp array is a new array with same copied(shallow copy) elements
    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoard(tempBoards);
  }
  const removecard = (cid, bid) => {
    const bindex = boards.findIndex((item) => item.id === bid);
    if (bindex < 0) return;
    const cindex = boards[bindex].cards.findIndex((item) => item.id === cid);
    if (cindex < 0) return;


    const tempBoards = [...boards];
    tempBoards[bindex].cards.splice(cindex, 1);
    setBoard(tempBoards);
  }
  const addboard = (title) => {
    const board = {
      id: Date.now() + Math.random() * 2,
      title,
      cards: []
    }
    const tempBoards = [...boards];
    tempBoards.push(board);
    setBoard(tempBoards);
  }

  const removeBoard = (bid) => {
    const tempboard = boards.filter((item) => item.id !== bid)
    setBoard(tempboard);
  }
  const [targetcard,settargetcard]=useState({
    cid:"",
    bid:""
  })
  const handleDragenter=(cid,bid)=>{
    settargetcard({
      cid,bid
    });
  }
  const handleDragend=(cid,bid)=>{
    //to be removed
    let source_b_index = boards.findIndex((item) => item.id === bid);
    if (source_b_index < 0) return;
    let source_c_index = boards[source_b_index].cards.findIndex((item) => item.id === cid);
    if (source_c_index < 0) return;

    let target_b_index = boards.findIndex((item) => item.id === targetcard.bid);
    if (target_b_index < 0) return;

    let target_c_index = boards[target_b_index].cards.findIndex((item) => item.id === targetcard.cid);

    const tempboards=[...boards]; 
    //creating copy of card before removal
    const tempcard=tempboards[source_b_index].cards[source_c_index];
    //removed card from board
    tempboards[source_b_index].cards.splice(source_c_index, 1);
    console.log(target_c_index);
    if (target_c_index < 0) {
      console.log("pushing card tp empty board")
      tempboards[target_b_index].cards.push(tempcard);
    }
    else{
      //appending after the target card
      tempboards[target_b_index].cards.splice(target_c_index, 0,tempcard);
    }
    setBoard(tempboards);

  }
  const updatecard=(cid,bid,newcard)=>{
    const bindex = boards.findIndex((item) => item.id === bid);
    if (bindex < 0) return;
    const cindex = boards[bindex].cards.findIndex((item) => item.id === cid);
    if (cindex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bindex].cards[cindex]=newcard;
    setBoard(tempBoards);
  }
  return (
    <div className="app">
      <Navbar />

      <div className="app_outer" >
        <div className="app_boards" >
          {boards.map((item) =>
            <Board
              key={item.id}
              board={item}
              removeboard={removeBoard}
              addcard={addcard}
              removecard={removecard}
              handleDragend={handleDragend}
              handleDragenter={handleDragenter}
              updatecard={updatecard}
            />
          )}
          <div className="app_boards_board">
            <Editable text="Add Board" placeholder="Enter Board TitLe" displayClass="app_boards_board_add" onSubmit={(value) => addboard(value)} />
          </div>

        </div>
      </div>


    </div>
  );
};

export default App;
