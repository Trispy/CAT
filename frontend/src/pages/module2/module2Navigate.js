import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;


export default function M2Nav() {
    const navigate = useNavigate();
    const nav = async (e) => {
        try {
            const jwt = localStorage.getItem("token");
            const response = await fetch(`${API}/api/game/module2/status`, {
                method:"GET",
                headers:{
                ContentType:"Application/json",
                Authorization: `Bearer ${jwt}`
                }
            }
            )
            const data = await response.json();
            // parse data
            if(!data.module2part1)
                navigate('/module2/therm', { replace: true });
            else if(!data.chopping)
                navigate('/module2/cleaning', { replace: true });
            else if(!data.cooking)
                navigate('/module2/cooking', { replace: true });
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