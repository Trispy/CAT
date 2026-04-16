
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import Menu from "../../components/menu.js";
const API = process.env.REACT_APP_API_URL;


export default function M1Nav() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const nav = async (e) => {
        try {
            const jwt = localStorage.getItem("token");
            const response = await fetch(`${API}/api/game/module1/status`, {
                method:"GET",
                headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
                }
            }
            )
            const data = await response.json();
            console.log(data);
            // parse data
            if (!data.symptoms)
                navigate('/module1/symptoms', { replace: true });
            else if (!data.personalHygiene)
                navigate('/module1/personalHygiene', { replace: true });
            else if (!data.location)
                navigate('/module1/onLocation', { replace: true });
            else
                setShowMenu(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
    nav();
    }, []);

    return (
        <div>
            <div>
                {!showMenu && (
                    <div>
                        Redirecting...
                    </div>
                )}
            </div>
            <div
                style={{
                    height: "100vh",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "black"
                }}
            >
                {showMenu && (
                    <div>
                        <div
                        style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <p style={{ color: "white" }}>You have already completed this module!</p>
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                height: "100%",
                                zIndex: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Menu />

                            <div
                                onClick={() => navigate('/map', { replace: true })}
                                style={{
                                    position: "absolute",
                                    top: "2px",
                                    right: "120px",
                                    fontSize: "40px",
                                    color: "white",
                                    cursor: "pointer",
                                    zIndex: 30
                                }}
                            >
                                ✖
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}