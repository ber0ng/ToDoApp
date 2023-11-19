import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const[itemText, setItemText] = useState('')
  const[listItems, setListItems] = useState([]);
  const[isUpdate, setIsUpdate] = useState('')
  const[updateItemText, setUpdateItemText] = useState('')

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await  axios.post('http://localhost:5500/api/item', {item: itemText})
      console.log(res);
      setItemText('');
      getItemList();
    } catch (error) {
      console.log(error)
    }
  }

  //useEffect to get data from db
  useEffect(() => {
    console.log('Fetching data...');
    getItemList()
  }, [])

  //get data from db
  const getItemList = async() => {
    try {
      const res = await axios.get('http://localhost:5500/api/items')
      setListItems(Array.isArray(res.data.allTodoItems) ? res.data.allTodoItems : []);
      console.log("result", res.data)
    } catch (error) {
      console.log(error)
    }
  }

  //update item
  const updateItem = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put( `http://localhost:5500/api/item/${isUpdate}`, {item: updateItemText})
      setUpdateItemText('')
      setIsUpdate('')
      getItemList()
      console.log("result delete", res.data)
    } catch (error) {
      console.log(error)
    }
  }

  //delete item
  const deleteItem = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      console.log("result delete", res.data)
      getItemList()
    } catch (error) {
      console.log(error)
    }
  }

  const renderUpdateForm = () => {
    return(
    <form className='update-form' onSubmit={(e)=>{updateItem(e)}}>
      <input className='update-new-input' type='text' placeholder='New Item' onChange={e=> {setUpdateItemText(e.target.value)}} value={updateItemText}/>
      <button className='update-new-btn' type='submit'>Update</button>
    </form>
    )
  }
  

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className='form' onSubmit={e => addItem(e)}>
        <input className='input-text' type='text' placeholder='Add todo Item' onChange={e=>{setItemText(e.target.value)}} value={itemText}/>
        <button className='input-button' type='submit'>Add</button>
      </form>
      <div className="todo-listItems">
          {listItems.map(item => (
            <div className='todo-item' key={item._id}>
              {
                isUpdate === item._id 
                ? renderUpdateForm()
                : <>
                    <p className="item-content">{item.item}</p>
                    <button className='update-item' onClick={()=> {setIsUpdate(item._id)}}>Update</button>
                    <button className='delete-item' onClick={()=> {deleteItem(item._id)}}>Delete</button>
                </>
              }
              
            </div>
          )
        )
      }
      </div>
    </div>
  );
}

export default App;
