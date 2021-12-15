import { useState , useEffect } from 'react';
import './App.scss';
import Child from './components/child'
import { MdAddTask } from "react-icons/md";

function App() {
  const todo = [
    {
      id:1,
      topic: "Learning react"
    },
    {
      id: 2,
      topic: "Learning english"
    },
    {
      id: 3,
      topic: "Learning japanese"
    }
  ]


  //Fetching data from localstorage
  
 const local_storage = () => {
      let l = localStorage.getItem('list');
     // console.log(l.length);

      if(l.length-2 !== 0){      // Here checking whether array is empty or not
          return JSON.parse(localStorage.getItem('list'));  //returning the stored data 
      }else{
        return [...todo] //if stored data is empty then it will return copy of hard coded array (i.e todo)
      }
   
 }

  const [add , setAdd] = useState(local_storage());
  const [input , setInput] = useState("");
  const [toggel , setToggel] = useState(true);
  const [update , setUpdate] = useState("")

  //hadling the delete operation

  const handleDelete = (id) => {
      const item = add.filter(c => c.id !== id)
       setAdd(item)
    //    console.log(item)
    // console.log("item deleted")
  }

 //Handling the add operation

  const handleAdd = () => { // Here just i just concatinating new element in the array
    setAdd(todo => [...todo , 
      {id: todo.length+1,
      topic:input}
    ])
   
    
  }

  //Handle the edit operation 

  const handleEdit = (id) => {
    const data = add.find(c => c.id === id); //Handling the event using props and finding the data of matching id
    setToggel(false) ;
    setInput(data.topic);
    setUpdate(id)  // this is required for to update the element in the array and it has been used in bellow handleUpdate function at (c.id === update)
   // console.log(data.topic)
  }


  const handleUpdate = () =>{
    console.log("updated")
    setAdd(add.map(c => {  //concatinating the updated data 
        if(c.id === update){
            return{ ...c , topic:input}
        }
        return c ;
    })
    )
    setToggel(true) //Again after the updatation of element making toggel true to change into add button
    setInput(" ");
    setUpdate(null)
  }

  // Storing the data in localStorage
  useEffect(() => {
    localStorage.setItem('list' ,JSON.stringify(add))
  } , [add])

  return (
    <div className="App">
        <h1>
          To Do App
        </h1>
        {
            toggel === true ?
                <div>
                  <input type="text" placeholder='    Add your to do list' 
                  onChange={(e) => {setInput(e.target.value)}}
                  />
                  <button className='button1' onClick={handleAdd}> <MdAddTask/> ADD</button>
                  
                </div>
               : 
                <div>
                  <input type="text" placeholder='    Update your to do list' 
                  value={input}
                  onChange={(e) => {setInput(e.target.value)}}
                  />
                
                <button className='button1' onClick={handleUpdate}><MdAddTask/> Update</button>
                </div>
       }
        
                <div>
                  {add.map( c =>
                  <Child
                  key = {c.id}
                  id = {c.id}
                  value = {c.topic}
                onDelete = {handleDelete}
                onEdit = {handleEdit}
                  />
                  )}
                  
                </div>
      
    </div>
  );
}

export default App;
