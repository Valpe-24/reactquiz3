import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const TODO_KEY= 'todoKey';

export const TodoList = () => {

  const [todos, setTodos] = useState([]);
  const [friends, setFriends] = useState([]);
  const refInput = useRef("");
  const navigate = useNavigate();

  const url = `https://jsonplaceholder.typicode.com/posts/`
  
  // Set up the proper usage of useQuery hook
  const usersQuery = useQuery(`post`, async () => await axios.get(url),
  {
      refetchOnWindowFocus: false,
      enabled: false
  })

  useEffect(() => {
    if (usersQuery.isFetched){
      setTodos(usersQuery.data.data)
    }
    // Load todos (if any) from localStorage
    localStorage.getItem(TODO_KEY)
    
    // parse through the stored to-do's and set them in state

    if (todos.length !==0){
    const todosInfo = JSON.parse(localStorage.setItem(TODO_KEY, todos))
    todosInfo.map(i => { return setTodos(i)})
    }
    
  }, [setTodos, todos, usersQuery]);

  useEffect(() => {
    localStorage.setItem(TODO_KEY,JSON.stringify(todos))
    // Save todos to localStorage
    
  }, [todos]);

  const handleAddTodo = () => {
    let todoItem = refInput.current.value;
    setTodos(todoItem)
      // access the input and update the state variable "todos"
  };


  const handleFetchFriends = async () => {
    // refetch your implementation of the useQuery hook
    await usersQuery.refetch();
    
    // extract data into a new array and extract only the names from this array of objects
    
    
    //setFriends(friendsNamesArray);
  }

  const handleDeleteTodo = (index) => {
    // filter out the todo that was deleted from the array - hint: keep the rest of the todos in an array
    todos.pop(index)

    // update todos array
  };
  
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem(TODO_KEY)
    
    // route user back to sign in page
    navigate('/')
    
  };

  return (
    <div>
      <input type="text" ref={refInput}
      />
      <button onClick={handleAddTodo}>Add to your list</button>
      <h3>To do:</h3>
      
      <ul id="todo-list">
      { todos.map(i => {
              return <ul key={i.id}>
                <li key={i.id}>{i.name}</li>
                </ul>
          })}
      </ul>
      <button id="get-friends-btn" onClick={handleFetchFriends}>Get friends list</button>
      <h3>Your active friends: </h3>
      <ul id="friends-list">
        {friends?.map((friend, index) => {
          return(
            <li key={index}>
              {friend}
            </li>
          )
        })}
      </ul>
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
