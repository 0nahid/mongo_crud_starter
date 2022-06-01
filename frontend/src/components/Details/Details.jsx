import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
    const { id } = useParams();
    const [user, setUser] = useState()
    useEffect(() => {
        fetch(`http://localhost:5500/api/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id])
    return (
        <div>
            <h1>This is Details page of {user}</h1>
        </div>
    )
}
