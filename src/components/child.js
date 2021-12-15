import React from "react"
import "./child.scss";
import { MdDelete } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";


function Child(props){
 
    return(
        <div className="child">
            <div className="child1">
                <p>
                    {props.value}
                </p>
            </div> 
            <div >
                <button onClick={ () => props.onEdit(props.id)} className="b1"><MdEditCalendar/> EDIT</button>
                <button onClick={ () => props.onDelete(props.id)} className="b2"><MdDelete/> DELETE</button>
            </div>
            
        </div>
    )
    
}
export default Child