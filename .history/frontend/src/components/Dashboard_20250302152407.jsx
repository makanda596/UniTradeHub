import React from 'react'

const Dashboard = () => {
const {id} = useParams()
    const deleteUser =async()=>{
        try{
            const response = await axios.delete(`http://localhost:5000/auth/delete/:${id}`)
        }catch(error){
            console.log(error.response ? error.response.data.message : ' failed');
        }
    }
  return (
    <div>
        <button onClick={deleteUser}>DELETE</button>D
    </div>
  )
}

export default Dashboard