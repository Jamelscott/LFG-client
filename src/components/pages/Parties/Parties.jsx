import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Parties({ parties, currentParties, setCurrentParties, currentGame, setCurrentGame, currentParty, setCurrentParty, refresher, setRefresher}) {

  const [search, setSearch] = useState("")
  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/party/${currentGame._id}`)
        .then((res) => {          
          setCurrentParties(res.data);          
        });      
    } catch (err) {
      console.log(err);
    }
  }, [currentGame,refresher]);  
  
  const handlePartySelect = party => {      
    setCurrentParty(party)
  }


  let filteredParties = currentParties.filter(party => party.partyName.toLowerCase().trim().includes(search.toLowerCase().trim()))
  
  const listParties = filteredParties.map((element, idx) => {
    return (      
        <div key={`part-id-${idx}`}>      
        <Link to='' onClick={() => handlePartySelect(element)} key={`${element.name}-part-${idx}`}>{element.partyName}</Link>
      </div>
    );
  });

  console.log(currentGame)
  // console.log(currentParties.filter(party => party.partyName.includes(search)))



  return(
  <>
    <div className="navbar-party">    
    {/* <div className='header-on-dark'><h1>{currentGame.name}</h1></div> */}
    <div className='header-on-dark'><img width={'250px'} src={`${currentGame.image}`} alt={`${currentGame.name}`}></img></div>
    <div style={{textAlign: "center"}}>
      <h4 style={{marginBottom: 0}}>Search parties</h4>
      <input style={{height:'40px', fontSize: "11px",width:"250px"}} type="text" placeholder={`search ${currentGame.name} parties`} value={search} onChange={(e)=> setSearch(e.target.value)}/>
    </div>
    <fieldset>
    <legend><h2>Parties</h2></legend>
    {listParties}
    </fieldset>
    </div>
    <div className='navbar-party-footer'>
    <p><Link to='/party'>Create a party</Link></p>
    </div>  
  </>  
  
  ) 
}