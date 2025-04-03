import React from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const Dashboard = () => {
    const { id } = useParams()
    const deleteUser = async () => { 
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`)
            console.log(response.data);
            window.location.href = '/'
        } catch (error) {
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