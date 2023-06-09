import React, { useEffect, useState , useContext} from 'react'
import { loginApi } from '../services/UserServices'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useContext'

const Login = () => {
    const navigate = useNavigate()
    const { loginContext } = useContext(UserContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const [loadingApi, setLoadingApi] = useState(false)

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if(token) {
    //         navigate("/")
    //     }
    // }, [])

    const handleLogin = async() => {
        if(!email || !password) {
            toast.error("email/password is required");
            return;
        }
        setLoadingApi(true);
        let res = await loginApi(email.trim(), password);
        if(res && res.token) {
            loginContext(email, res.token);
            navigate('/');
        } else {
            if(res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingApi(false);     
    }

    const handleGoBack = () => {
        navigate('/');
    }

    const handlePressEnter = (event) => {
        if(event && event.key === 'Enter') {
            handleLogin()
        }
    }



  return (
    <div className='login-container col-12 col-sm-4'>
        <div className='title'>
            Login
        </div>
        <div className='text'>Email or UserName ( eve.holt@reqres.in )</div>
        <input 
        type='text'
         placeholder='Email or UserName...'
         value={email} 
         onChange={(event) => setEmail(event.target.value)}
         />

        <div className='input-password'>
        <input 
        type={isShowPassword === true ? "text" : 'password'} 
        placeholder='Password'
        value={password}
        onChange={(evvent) => setPassword(evvent.target.value)}
        onKeyDown={(event) => handlePressEnter(event)}
         />
         <i 
         className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} 
         onClick={() => setIsShowPassword(!isShowPassword)}
         ></i>
        </div>

         <div className='for-got'>
            Forgot password ?
         </div>
        <button 
        className={email && password ? "active" : " "}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
        > 
        {loadingApi && <i className="fa-solid fa-sync fa-spin"></i>  } 
        &nbsp;Login
        </button>
        <div className='back'>
        <i className="fa-solid fa-chevron-left"></i> 
        <span onClick={() => handleGoBack()}> &nbsp; Go back</span>
        </div>
     
    </div>
  )
}

export default Login
