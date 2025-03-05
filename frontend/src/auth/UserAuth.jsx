import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'

const UserAuth = ({ children }) => {

    const { user } = useContext(UserContext)
    const [ loading, setLoading ] = useState(true)
    
    const navigate = useNavigate()




    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        console.log(user)
        if (user) {
            setLoading(false)
        }

        if (!token) {
            console.log('no token')
            navigate('/login')
        }

        if (!user) {
            navigate('/login')
        }

    }, [user])
    

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {children}</>
    )
}

export default UserAuth