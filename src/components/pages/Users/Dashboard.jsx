import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({setCurrentUser, games, currentUser}) => {

  const navigate = useNavigate()
  const [msg, setMessage] = useState("")
  const [form, setForm] = useState({
    id: currentUser.id,
    game_fk: "",
    username: "",
    gameName: ""

  });

 useEffect(() => {
   setForm({
    id: currentUser.id,
    game_fk: "",
    username: ""

  })
 }, [])


  const handleSelect =(e)=>{
    console.log(games)
    const game = games.find((game, idx)=>{
        console.log(e.target.value)
          return game._id === e.target.value
        })
        console.log(game)
        console.log(currentUser._id)
    setForm({...form, id: currentUser.id, game_fk : e.target.value, gameName: game.name})

  }


  const allGames = games.map((element, idx) => {
    return (
      <option onSelect={handleSelect} value={element._id}>
        {element.name}
      </option>
    );
  });

  const allAlias = currentUser.games.map((element, idx)=>{

 
    return(
      <div style={{border: '1px solid yellow'}}>
      <h3>Game: {element.gameName}</h3>
      <h3>Alias: {element.username}</h3>
      </div>
    )
  })
  
  const allParties = currentUser.parties.map((element, idx)=>{

 
    return(
      <div style={{border: '1px solid pink'}}>
      <h3>Party Name: {element.partyName}</h3>
      <h3>Description: {element.partyDescription}</h3>
      </div>
    )
  })
  
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage("")
    try{
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/edit`, form)
      .then(response=>{
        console.log(response.data)
        // setCurrentUser(response.data.foundUser);
        setCurrentUser({
          username: response.data.foundUser.username,
          id: response.data.foundUser._id,
          email: response.data.foundUser.email,
          games: response.data.foundUser.games,
          parties: response.data.foundUser.parties,
        });
        setForm({
          id: response.data.foundUser.id,
          game_fk: "",
          username: ""
          
        })
      })
      navigate("/")
      navigate("/dashboard")
    } catch(err){
      setMessage(err.response.data.msg)
    }
  };

  return (
    <>
      <div className="header-on-dark">
        <h1>{currentUser.username}'s Dashboard</h1>
        <h3>Email: {currentUser.email}</h3>
        
        <form action="https://google.ca" onSubmit={handleEditSubmit}>
          {/* <input hidden name="userId" type="text">{currentUser.id}</input> */}
          <label htmlFor="select game">Add a game alias</label>
          <select name="games" id="games" onChange={handleSelect}>
          <option disabled="disabled" selected="selected">Select an option.</option>
            {allGames}
          </select>
          <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}></input>
          <input type="submit" />
        </form>
        {msg ? <h2 style={{color: "red"}}>{msg}</h2> : <></>} 
        <h2>Online Game Names</h2>
        {allAlias}
      {allParties}
      </div>
    </>
  );
};

export default Dashboard;
