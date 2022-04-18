import axios from "axios"
import { useEffect, useState } from "react"
import moment from "moment"
export default function MessageBoards({currentUser, currentParty}){
    const [form, setForm] = useState({
        message: "",
        userId: currentUser.id,
        userName : currentUser.username
      })
    const [boardMsg, setBoardMsg] = useState([]) 
    const [board, setBoard] = useState(null)       
    const [fetchMsg, setFetchMsg] = useState(false)    
    
    useEffect(()=>{     
        let counter = 0     
        let interval = setInterval(()=> {
            (async ()=>{
                axios.get(`${process.env.REACT_APP_SERVER_URL}/board/${currentParty._id}`)
                .then(resp => {
                    setBoardMsg(resp.data[0].messages)       
                    setBoard(resp.data[0])        
                    updateScroll()                                             
                    // scrollToBottom()
                    counter += 1        
                    console.log(counter)            
                    if(counter === 15) return clearInterval(interval)
                })
            })()
        }, 2000)          
        
        return () => {            
            clearInterval(interval)
        }
    },[currentParty, fetchMsg])

    moment.locale('en')

    // const messageEndRef = useRef(null)
    
    // const scrollToBottom = () => {
    //     messageEndRef.current.scrollIntoView({ behavior : 'smooth'})
    // }

    const listChatMsg = boardMsg.map((element, idx) => {
        return (
            <>
            <div className={currentUser.id === element.userId ? "message-container chat-user-color" : "message-container" } >
             <span className='chat-user'><small>{moment(element.createdAt).format('HH:mm DD MMM yyyy ddd')}</small></span>
             <span className='chat-user' key={`user-key${idx}`}><p>
                 {
                     currentUser.id===element.userId
                     ?
                     `You `
                     :
                    `${element.userName} ` 
                 }
                 said:</p></span>
             <p key={`message-key${idx}`}>{element.message}</p>
            </div>            
            <hr />
            </>
        )
    })
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        // console.log(form)
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/board/${board._id}`, form)
        .then(resp => {
            setFetchMsg(!fetchMsg)                     
            // scrollToBottom()
            updateScroll()
            setForm({...form, message:''})                 
        })
    }
    function updateScroll(){
        let element = document.getElementById("msg");
        element.scrollTop = element.scrollHeight + 100;
        // element.scrollIntoView({behavior:'smooth', block:'center'})
    }

    return(
        <>
        <div className="msg-disp" id='msg'>
            {listChatMsg}            
        </div>          
        <div className='message-footer'>  
        <form onSubmit={handleFormSubmit}>
        <label htmlFor='message' className="msg-ele"></label> 
        <textarea className='msg-ele' type='text' id='message' value={form.message} onChange={(e) =>setForm({...form, message:e.target.value})} onFocus={()=>setFetchMsg(!fetchMsg)} required/>
        <button type='submit'>Send</button>
        </form>
      </div>
        </>
    )
}