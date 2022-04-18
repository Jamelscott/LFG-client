import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';



export default function CreateParty ({currentGame, setCurrentUser, currentUser, currentParty, setCurrentParty}) {  
  const navigate = useNavigate();
  const [form, setForm] = useState({
        gameId: currentGame._id,
        gameName: currentGame.name,
        userId: currentUser.id,
        partyName: "",
        description: "",
        members: [
          {
            userId: currentUser.id,
            userName: currentUser.username,
            admin: "true"
          }
        ],
        requests: []
    })
  const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target.value)
       await axios.post(`${process.env.REACT_APP_SERVER_URL}/party`, form)
          .then(response => {
            setCurrentUser({...currentUser, parties: response.data.foundUser.parties})
            console.log(response.data.foundUser.parties)
            navigate('/');
          })
  }
    
    return (
      
        <div className='box stack-top'>
          <div className="new-form">
        <h1>Create a Party!</h1>          
            <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor='username'>Game : </label>
                <input
                  type='text'
                  id='gameId'
                  value={currentGame.name}
                  disabled
                />
              </p>
              {/* <p>
                <label htmlFor='username'>Game Id: </label>
                <input
                  type='text'
                  id='gameId'
                  value={form.gameId}
                  onChange={e => setForm({ ...form, gameId: e.target.value })}
                  disabled
                />
              </p> */}
              <p>
                <label htmlFor='username'>User : </label>
                <input
                  type='text'
                  id='gameId'
                  value={currentUser.username}
                  disabled
                />
              </p>
              <p>
                <label htmlFor='email'>Party Name:</label>
                <input
                  type='text'
                  id='partyName'
                  value={form.partyName}
                  onChange={e => setForm({ ...form, partyName: e.target.value })}
                  // placeholder='enter your email...'
                />
              </p>
              <p>
                <label htmlFor='password'>description:</label>
                <textarea 
                    id='description'
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} 
                    cols="30" 
                    rows="10">
                    
                </textarea>
              </p>
              
              <button type='submit'>Submit</button>
            </form>
            <p>{message}</p>
            </div>
          </div>
    )
}