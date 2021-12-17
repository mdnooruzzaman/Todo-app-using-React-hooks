import { useState  } from 'react';
import './App.scss';
import Todo from './components/todo'
import Input from './components/input';
import Add from './components/add'


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
  const l = localStorage.getItem("list");
  console.log(l)
  if(l == null){
    return [...todo]
  }else{
    return JSON.parse(localStorage.getItem("list"))
  }
}


  const [add , setAdd] = useState(local_storage());
  const [input , setInput] = useState("");
  const [toggel , setToggel] = useState(true);
  const [update , setUpdate] = useState("")
  


  //handling input field

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  //hadling the delete operation

  const handleDelete = (id) => {
      const item = add.filter(c => c.id !== id)
       setAdd(item)
    //    console.log(item)
    // console.log("item deleted")
  }

 //Handling the add operation

  const handleAdd = () => { // Here just i just concatinating new element in the array
    if(!input){
      alert("fill in the black space")
    }else{
      setAdd(todo => [...todo , 
        {id: todo.length+1,
        topic:input}
      ])
     
    }
   
   
    
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

  localStorage.setItem('list' ,JSON.stringify(add))
  
  return (
    <div className="App">
        <h1>
          To Do App
        </h1>
        <div className='head'>
          <Input
            toggel = {toggel}
          
            value = {input}
            onChange = {handleChange}
          />
          <Add
            value = {toggel}
            onAdd = {handleAdd}
            onUpdate = {handleUpdate}

          />
        </div>
        
                <div>
                  {add.map( c =>
                  <Todo
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
