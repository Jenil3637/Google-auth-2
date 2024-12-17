import {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import {useNavigate} from 'react-router-dom';
    
const GoolgeLogin = (props) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
		try {
            const res = await googleAuth(authResult.code);
            if (res.status === 200) {
                localStorage.setItem('user-info', JSON.stringify(res.data));
				navigate('/dashboard');
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<div className="App">
			<button onClick={googleLogin}>
				Sign in with Google
			</button>	
		</div>
	);
};

export default GoolgeLogin;