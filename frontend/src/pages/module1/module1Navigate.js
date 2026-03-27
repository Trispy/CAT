import { useNavigate } from "react-router-dom";


export default function M1Nav() {
    const navigate = useNavigate();
    const nav = async (e) => {
        try {
            const response = await fetch('http://localhost:3001/api/game/module1/status');
            const data = await response.json();
            console.log(data);
            // parse data
            /*if(!true)
                navigate('/module1/symptoms', { replace: true });
            else if(!true)
                navigate('/module1/personalHygiene', { replace: true });
            else
                navigate('/module1/onLocation', { replace: true });*/
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    nav();

    return(
        <div>Redirecting...</div>
    )
}