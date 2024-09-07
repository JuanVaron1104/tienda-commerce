import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function Logout() {
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        sessionStorage.clear()
        localStorage.clear()

        setRedirect(true)
    }, [redirect])

    return <Redirect to="/productos" />
}
