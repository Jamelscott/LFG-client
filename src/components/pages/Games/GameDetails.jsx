// import axios from 'axios'
// import { useEffect, useState } from 'react'

export default function GameDetails ({ gameId }) {
//   const [gameDetails, setGameDetails] = useState(null)
    
//   const endpoint = `https://api.rawg.io/api/games/${gameId}?key=23b559a79a044fe7af5046ac579bd71b`
//   console.log(endpoint)
//   useEffect(() => {    
//       (async () => {
//           const resp = await axios.get(endpoint)                
//               setGameDetails(resp.data)
//               console.log(endpoint)
//               console.table(gameDetails)         

//       })()
//   },[gameId])
  return (
  <>
  <div className='box stack-top'>
      <div className='new-form'>
          {/* <p>Name : {gameDetails.name}</p>  */}
          {/* <p>Description : {gameDetails.description}</p>  */}
          
         
      </div>
  </div>
  </>
  )
}
