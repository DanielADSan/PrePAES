import React, {useEffect, useState} from 'react'
import { Apiurl } from '../../../Services/apirest';
import axios from 'axios'
const Logros = () => {
    const urlGetLogros = `${Apiurl}/achievment_user/`
    const [logros, setLogros] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token')
        const getLogros = async () => {
            try {
                const response = await axios.get(urlGetLogros, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setLogros(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getLogros()
    },[])

    return (
        <>
            <div className='logros-container'>
                {logros.map((logro) => (
                    <div key={logro.id} className={logro.flag == true ? 'card-logro' : 'card-logro disabled'}>
                        <div className='img-container-logro'>
                        <img src={logro.achievement.image_url} alt="Nombre del logro" />
                    </div>
                    <div>
                        <h2>{logro.achievement.name}</h2>
                        <p>{logro.achievement.description}</p>
                    </div>

                </div>
                ))}
            </div>
        </>
    )
}

export default Logros