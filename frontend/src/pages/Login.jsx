import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login(){
    const [Logininfo,setLoginInfo]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target
        console.log(name,value)
        const copyLogininfo={...Logininfo}
        copyLogininfo[name]=value;
        setLoginInfo(copyLogininfo)
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        const {email,password}=Logininfo
         if(!email || !password){
            return handleError('All fields are required')
         }
         try{
            const url="http://localhost:8080/auth/login"
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Logininfo)
            })
            const result=await response.json();
            const{success,message,jwttoken,name,error}=result;
            if(success){
                handleSuccess(message)
                localStorage.setItem('token',jwttoken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(() => {
                    navigate('/home')
                },1000);
            }
            else if(error){
                const details=error?.details[0].message;
                handleError(details);
             }
             else if(!success){
                handleError(message )
             }
            
         } catch(err){
            handleError(err);
         }

    }

    console.log('loginInfo->',Logininfo)
    return(
        <div className='container'>
           <h1>Login</h1>
           <form onSubmit={handleLogin}>
            
            <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email...'
                value={Logininfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                onChange={handleChange}
                type='password'
                name='password'
                autoFocus
                placeholder='Enter your password...'
                value={Logininfo.password}
                />
            </div>
            <button>Login</button>
            <span>Don't have an account?
                <Link to='/signup'>Signup</Link>
            </span>
           </form>
           <ToastContainer/>
        </div>
    )
}

export default Login