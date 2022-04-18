import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Requests({ currentParty, setCurrentParty, currentUser, setCurrentUser }) {

  //currentParty.member -> check if the current user is a member of the party
  // if part of the part(member) -> check if that member is an admin or not
  // added by jon
  const filteredMember = currentParty.members.filter(member => {
    if (member.userId === currentUser.id)
      return member
  })

  console.log('currentUser', currentUser)
  console.log('request filtered member', filteredMember)
  console.log('request currentparty', currentParty)
  console.log('request currentparty member', currentParty.members)

  const deleteRequest = async request => {
    console.table(request)
    const form = {
      userId: request.userId,
      isApproved: true,
      userName: request.userName,
      message: request.message,
      _id: request._id
    }
    try {
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/party/${currentParty._id}/decline`, form)
        .then(response => {
          setCurrentParty(response.data.foundParty)
        })
    } catch (error) { }
  }
  const approveRequest = async request => {
    console.log(request)
    const form = {
      userId: request.userId,
      userName: request.userName,
      _id: request._id //I added this because it was not deleting the approved member's request in the pending list.
    }
    try {
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/party/${currentParty._id}/approve`, form)
        .then(response => {
          setCurrentParty(response.data.foundParty)
        })
    } catch (error) { }
  }
  if (currentParty.requests) {
    const listRequest = currentParty.requests.map((element, idx) => {
      return (
        <>
          <div className='name-list' id={`requestID-${idx}`}>
            <span className='tooltip left' data-text={element.message}> {element.userName} &nbsp; &nbsp; </span>
            {
              filteredMember.length === 0 ? //non-members can see their requests as pending (jon)
                <span> Status: pending </span>
                :
                filteredMember.length !== 0 && filteredMember[0].admin === true ? //if you are a member, and an admin as well (jon)
                  <>
                    <Link to='' onClick={() => { approveRequest(element) }}>({' '}Approve{' '}</Link>&nbsp; | &nbsp;
                    <Link to='' onClick={() => { deleteRequest(element) }}>{' '}Deny{' '})</Link>
                  </>
                  :
                  filteredMember.length !== 0 && filteredMember[0].admin === false ? // if you are a member, and not an admin (jon)
                    <span> Status: pending </span>
                    :
                    null

            }

          </div>
        </>
      )
    })
    return (
      <>
        <h3>Join Requests</h3>
        {listRequest}
      </>
    )
  } else {
    return <>There are no pending request.</>
  }
}
