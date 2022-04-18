import Requests from './Requests'
import Members from './Members'
import { Link, Navigate } from 'react-router-dom'
import RequestForm from './RequestForm'
import { useEffect, useState } from 'react'
import EditParty from './EditParty'
import axios from 'axios'
import MessageBoards from './MessageBoards'

function Party({
  currentParty,
  setCurrentParty,
  currentUser,
  setCurrentUser,
  currentGame,
  refresher,
  setRefresher
}) {
  // if filteredMember != 0, currentUser is a member of the party (jon)
  const filteredMember = currentParty.members.filter(member => {
    if (member.userId === currentUser.id)
      return member
  })

  // if filteredRequest != 0, currentUser has already sent a request (jon)
  const filteredRequest = currentParty.requests.filter(request => {
    if (request.userId === currentUser.id) 
      return request
  })


  const [selectedComponent, setSelectedComponent] = useState('0')
  useEffect(() => {
    setSelectedComponent('0')
  }, [currentParty])

  if (!currentUser) return <Navigate to='/login' />
  
  const handleDeleteParty = async () => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/party/${currentParty._id}`)
        .then(response => {
          setCurrentParty(null)
          setRefresher(!refresher)
        })
    } catch (error) { }
  }

  return (
    <>
      <div className='party-container'>
        <div className='header-on-dark'>
          <h1>{currentParty.partyName} </h1>
        </div>
        <div className='menu-holder'>
          {filteredMember.length === 0 && filteredRequest.length === 0 ? // if the user doesn't belong to the party and hasn't sent a request (jon)
            <>
              <Link to='' onClick={() => setSelectedComponent('1')}>
                Join this party
              </Link>
            </>
            : filteredMember.length !== 0 && filteredMember[0].admin === true ? // if the user is a member and an admin (jon)
              <>
                <Link to='' onClick={() => setSelectedComponent('2')}>
                  Edit Party
                </Link>
                <Link to='' onClick={() => handleDeleteParty()}>
                  Delete Party
                </Link>
              </>
              : null
          }
        </div>
        <h3>Details : </h3>
        {currentParty.description}
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
          currentUser={currentUser}
          setCurrentUser={setCurrentUser} //added by Justin
        />
        <Requests
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentParty={currentParty}
          setCurrentParty={setCurrentParty}
        />
      </div>
      {filteredMember.length !== 0 ?
        <MessageBoards currentUser={currentUser} currentParty={currentParty} />
        :
        <>
          <div className='message-container'>Message Board Access: Denied!</div>
          <div className='message-container'>Please Join the party first!</div>
        </>
      }         
    </>
  )
}

export default Party
