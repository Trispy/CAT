import { useNavigate } from "react-router-dom";


export default function M1Nav() {
    const navigate = useNavigate();
    const nav = async (e) => {
        try {
            const jwt = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/api/game/module1/status", {
                method:"GET",
                headers:{
                ContentType:"Application/json",
                Authorization: `Bearer ${jwt}`
                }
            }
            )
            const data = await response.json();
            console.log(data);
            // parse data
            if(!data.symptoms)
                navigate('/module1/symptoms', { replace: true });
            else if(!data.personalHygiene)
                navigate('/module1/personalHygiene', { replace: true });
            else if(!data.location)
                navigate('/module1/onLocation', { replace: true });
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