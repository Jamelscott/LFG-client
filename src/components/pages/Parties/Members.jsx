import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'


export default function Members({ currentParty, setCurrentParty, currentUser, setCUrrentUser }) {

  const [form, setForm] = useState({
    userId: "",
    admin: true
  })

  // added by jon
  const filteredMember = currentParty.members.filter(member => {
    if (member.userId === currentUser.id)
      return member
  })

  const makeAdmin = async (member) => {
    setForm({ ...form, userId: member.userId })
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/party/${currentParty._id}/co-admin`, form)
      .then(response => {

        setCurrentParty(response.data.foundParty)
      })
  }
  const kickMember = async (member) => {
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/party/${currentParty._id}/kick`, { userId: member.userId })
      .then(response => {
        setCurrentParty(response.data.foundParty)
      })
  }
  const mappedMembers = currentParty.members.map((member, idx) => {
    if (member.admin === true) {
      return <div key={`member-id-${idx}`} className="name-list">🌟{member.userName} (Admin)</div>
    } else {
      return (
        <div key={`member-id-${idx}`} className="name-list">
          {member.userName} &nbsp;&nbsp;
          {
            filteredMember.length === 0 ? // non-members can't kick or make other members an admin (jon)
              null :
              filteredMember.length !== 0 && filteredMember[0].admin === true ? // if you are a member and an admin (jon)
                <>
                  <Link to='' onClick={() => { makeAdmin(member) }}> (Admin </Link> &nbsp; | &nbsp; 
                  <Link to='' onClick={() => { kickMember(member) }}> Kick )</Link>
                </>
                :
                null
          }
        </div>
      )
    }
  })

  return (
    <>
      <h3>Members:</h3>
      {mappedMembers}
    </>
  )

}


