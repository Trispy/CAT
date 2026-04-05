import { useNavigate } from "react-router-dom";


export default function M3Nav() {
    const navigate = useNavigate();
    const nav = async (e) => {
        try {
            const jwt = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/api/game/module3/status", {
                method:"GET",
                headers:{
                ContentType:"Application/json",
                Authorization: `Bearer ${jwt}`
                }
            }
            )
            const data = await response.json();
            // parse data
            if(!data.cansort)
                navigate('/module3/canSorting', { replace: true });
            else if(!data.expiration)
                navigate('/module3/expiration', { replace: true });
            else if(!data.allergenIdentification)
                navigate('/module3/allergenIdentification', { replace: true });
            else
                navigate('/map', { replace: true });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    nav();

    return(
        <div>Redirecting...</div>
    )
}