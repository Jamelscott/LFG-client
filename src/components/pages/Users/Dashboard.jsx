import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ setCurrentUser, games, currentUser }) => {
  const navigate = useNavigate()
  const [msg, setMessage] = useState('')
  const [form, setForm] = useState({
    id: currentUser.id,
    game_fk: '',
    username: '',
    gameName: ''
  })

  useEffect(() => {
    setForm({
      id: currentUser.id,
      game_fk: '',
      username: '',     
    });

    
  }, []);

  const handleSelect = e => {
    console.log(games)
    const game = games.find((game, idx) => {
      console.log(e.target.value)
      return game._id === e.target.value
    })
    console.log(game)
    console.log(currentUser._id)
    setForm({
      ...form,
      id: currentUser.id,
      game_fk: e.target.value,
      gameName: game.name
    })
  }

  const allGames = games.map((element, idx) => {
    return (
      <option onSelect={handleSelect} value={element._id}>
        {element.name}
      </option>
    )
  })

  const allAlias = currentUser.games.map((element, idx) => {
    return (
      <div className='card'>
        <span><h4>Game:</h4> <p>{element.gameName}</p></span>
        <span><h4>Alias:</h4> <p>{element.username}</p></span>
      </div>
    )
  })

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/users/edit`, form)
        .then((response) => {
          console.log(response.data);
          // setCurrentUser(response.data.foundUser);
          setCurrentUser({
            username: response.data.foundUser.username,
            id: response.data.foundUser._id,
            email: response.data.foundUser.email,
            games: response.data.foundUser.games,
            parties: response.data.foundUser.parties
          })
          setForm({
            id: response.data.foundUser.id,
            game_fk: '',
            username: ''
          })
        })
      navigate('/')
      navigate('/dashboard')
    } catch (err) {
      setMessage(err.response.data.msg)
    }
  }

  const allParties = currentUser.parties.map((element, idx) => {
    return (
      <div className='card'>
        <span><h4>Party Name: </h4><p>{element.partyName}</p></span>
        <span><h4>Description: </h4><p>{element.partyDescription}</p></span>
        <span><h4>Game: </h4><p>{element.gameName}</p></span>
      </div>
    )
  })

  return (
    <>
      <div className='dashboard-container'>

      {/* start profile container */}
      <div className='profile-container'>
        <div className='header-on-dark'>
          <h1>Profile</h1>
          <h3>Username : {currentUser.username}</h3>
          <h3>Email: {currentUser.email}</h3>
        </div>
        <div className='party-forms-card'>
          <form onSubmit={handleEditSubmit}>
            {/* <input hidden name="userId" type="text">{currentUser.id}</input> */}
            <label htmlFor='games'>Select game :</label>
            <select name='games' id='games' onChange={handleSelect}>
              <option disabled='disabled' selected='selected'>
                Select an option.
              </option>
              {allGames}
            </select>
            <label htmlFor='select game'>Game alias :</label>
            <input
              type='text'
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            ></input>
            <button type='submit'>Submit</button>
          </form>
          {msg ? <h2 style={{ color: 'red' }}>{msg}</h2> : <></>}
        </div>
        </div>
        {/* end profile contaier */}

        {/* start cards display */}
        <div className='dashboard-container-det'>
        <div className='header-on-dark'>
          <h3>Your games</h3>
        </div>
        <div className='card-container'>{allAlias}</div>

        <div className='header-on-dark'>
          <h3>Your Parties</h3>
        </div>
        <div className='card-container'>{allParties}</div>
        </div>
        {/* end cards display */}
        
      </div>
    </>
  )
}

export default Dashboard
