import Requests from './Requests'
import Members from './Members'
import { Link } from 'react-router-dom'
import RequestForm from './RequestForm'
import { useEffect, useState } from 'react'
import EditParty from './EditParty'
import axios from 'axios'
import MessageBoards from './MessageBoards'

function Party ({
  currentParty,
  setCurrentParty,
  currentUser,
  currentGame,
  refresher,
  setRefresher
}) {
  const [selectedComponent, setSelectedComponent] = useState('0')
  useEffect(() => {
    setSelectedComponent('0')
  }, [currentParty])

  const handleDeleteParty = async () => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/party/${currentParty._id}`)
        .then(response => {
          setCurrentParty(null)
          setRefresher(!refresher)
        })
    } catch (error) {}
  }
  
  return (
    <>
      <div className='party-container'>
        <div className='header-on-dark'>
          <h1>{currentParty.partyName} </h1>
        </div>
        <h3>Details : </h3> 
        <p>
          {currentParty.description}
        </p>
        <div>
        {currentUser ? (
          <Link to='' onClick={() => setSelectedComponent('2')}>
            Edit Party
          </Link>
        ) : null}
        {currentUser ? (
          <Link to='' onClick={() => handleDeleteParty()}>
            Delete Party
          </Link>
        ) : null}
        {currentUser ? (
          <Link to='' onClick={() => setSelectedComponent('1')}>
            Join this party
          </Link>
        ) : null}
        </div>
        {selectedComponent === '1' ? (
          <RequestForm
            currentParty={currentParty}
            setCurrentParty={setCurrentParty}
            currentUser={currentUser}
            setSelectedComponent={setSelectedComponent}
            refresher={refresher}
            setRefresher={setRefresher}
          />
        ) : null}

        {selectedComponent === '2' ? (
          <EditParty
            currentGame={currentGame}
            currentParty={currentParty}
            setCurrentParty={setCurrentParty}
            currentUser={currentUser}
            setSelectedComponent={setSelectedComponent}
            refresher={refresher}
            setRefresher={setRefresher}
          />
        ) : null}
        
      </div>
      <div className='party-member-container'>
        <Members
          currentParty={currentParty}
          setCurrentParty={setCurrentParty}
        />
        <Requests
          currentParty={currentParty}
          setCurrentParty={setCurrentParty}
        />
      </div>

      <MessageBoards currentUser={currentUser} currentParty={currentParty} />
    </>
  )
}

export default Party
