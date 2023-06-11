import React,{useEffect, useState} from 'react'
import Modal from '../../Modal/Modal'
import Editable from '../../Editable/Editable'
import Chip from '../../Chips/Chip'
import "./CardInfo.css"
import { List, Type ,Calendar, Tag, CheckSquare, Trash} from 'react-feather'
function CardInfo(props) {
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ]
    const [activecolor,setActivecolor]=useState("#ccc")
    const [values,setvalues]=useState({...props.card});

    const removelabel=(labelname)=>{
        const newlabel = values.labels?.filter((item)=>item.text!==labelname);
        if(newlabel.length<0) return;
        setvalues({...values,labels:newlabel})
    }
    const addalabel=(text,color)=>{
        const newlabel={
            text,color
        }
        let labelarray=[...values.labels]
        labelarray?.push(newlabel);
        setvalues({...values,labels:labelarray})
        setActivecolor("#ccc")
    }
    const addatask=(text)=>{
        const newtask={
            text,
            id:Date.now()+ Math.random(),
            completed:false
        }
        console.log(newtask)
        let taskarray=[...values.tasks]
        console.log(taskarray)
        taskarray?.push(newtask);
        setvalues({...values,tasks:taskarray})
    }
    const removetask=(taskid)=>{
        const newtaskarray = values.tasks?.filter((item)=>item.id!==taskid);
        setvalues({...values,tasks:newtaskarray})
    }
    const settask=(id)=>{
        const index = values.tasks?.findIndex((item)=>item.id=== id)
        if(index<0)return 
        let taskarray=[...values.tasks];
        taskarray[index].completed=!taskarray[index].completed;
        setvalues({...values,tasks:taskarray})
    }

    const calculatepercentage=()=>{
        if(values.tasks?.length==0)return "0"
        const completed = values.tasks?.filter(item=>item.completed===true);
        return (completed?.length/values.tasks?.length)*100 +"";
    }
    function currentdate(){
        const currentDate = new Date();
        return currentDate.toISOString().substr(0, 10);
    }
    //function update card will be called whenever there is a change in values object i.e. whenever values is rendered
    useEffect(()=>{
        props.updatecard(props.card.id,props.boardid,values);
    },[values])
  return (
    
      <Modal onClose={()=>props.onClose()}>
            <div className="card_info">
                {/* title  */}
                <div className="cardinfo_box">
                    <div className="cardinfo_title">
                        <Type/>
                        Title 1
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={values.title} default={values.title} placeholder={"Enter Title"} buttontext={"Set Title"}  onSubmit={(value)=>{setvalues({...values,title:value})} }/>
                    </div>
                </div>
                {/* decription  */}
                <div className="cardinfo_box">
                    <div className="cardinfo_title">
                        <List/>
                        Desription
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={values.desc} default={values.desc} placeholder={"Enter Decription"} buttontext={"Set Desctiption"} onSubmit={(value)=>{setvalues({...values,desc:value})}}/>
                    </div>
                </div>
                {/* date  */}
                <div className="cardinfo_box">
                    <div className="cardinfo_title">
                        <Calendar/>
                        Date
                    </div>
                    <div className="cardinfo_box_body">
                        <input type="date" className="infodate" id="" defaultValue={ !values.date?currentdate(): values.date} 
                        onChange={(e)=>setvalues({...values,date:e.target.value})} />
                    </div>
                </div>
                {/* Label  */}
                <div className="cardinfo_box">
                    <div className="cardinfo_title">
                        <Tag/>
                        Labels
                    </div>
                    <div className="cardinfo_box_labels">
                    {
                        values.labels?.map((e,index)=><Chip color={e.color} text={e.text} key={index} onClose={(text)=>removelabel(text)} close/>)
                    }

                    </div>
                    <div className="cardinfo_box_colors">
                        {
                            colors.map((item,index)=> 
                            <li key={index} style={{backgroundColor:item}}
                            className={ item=== activecolor?"active":""}
                            onClick={()=>setActivecolor(item)}
                            />

                            
                            )
                        }
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={"Add Label"} placeholder={"Enter Label"} buttontext={"Add"} onSubmit={(val)=>addalabel(val,activecolor)} />
                    </div>
                </div>
                {/* Task  */}
                <div className="cardinfo_box">
                    <div className="cardinfo_title">
                        <CheckSquare/>
                        Task
                    </div>
                    <div className="progress_bar">
                        <div className="progress" style={{width:calculatepercentage()+"%"}}/>
                    </div>
                    <div className="cardinfo_box_tasklist">
                        {
                            values.tasks?.map((item,index)=><div className="cardinfo_task" key={index}>
                            <input type="checkbox" defaultChecked={item.completed} onChange={()=>settask(item.id)}/>
                            <p>{item.text}</p>
                            <Trash onClick={()=>removetask(item.id)}/>
                            </div>
                        )
                        }
                    </div>
                    <div className="cardinfo_box_body">
                        <Editable text={"Add Task"} placeholder={"Enter Task"} buttontext={"Set Task"} onSubmit={(val)=>addatask(val)}/>
                    </div>
                </div>

            </div>
      </Modal>
  )
}

export default CardInfo
