import "./login.css";
import {} from 'antd';
import {Form,Input,message} from 'antd';
import "./login.css";
import { Link,useNavigate } from "react-router-dom";
import img from "../../images/rightimg.jpg";
import React,{useState,useEffect} from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";



export default function Login(){
    
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const submitHandler=async (values)=>{
        try{
            setLoading(true)
            const {data}=await axios.post('/users/login',values)
            setLoading(false)
            message.success('Login Success')
            localStorage.setItem("user",JSON.stringify({...data.user,password:""}));
            navigate('/');
        }catch(error){
            setLoading(false)
            message.error('Something went wrong');
        }
    };

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/");

        }
    },[navigate]);
    
    
    return(
        <>
            <div className="mainBox">
            <div className="register-page">
            {loading && <Spinner/>}
            <Form layout="vertical" onFinish={submitHandler}>
               <h1 className="loginText">WELCOME BACK!</h1>
                
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>

                <div className="box">
                    <button className="btn btn-primary">Login</button>
                    <Link to="/register" className="custom-link">Don't have an account? Click here to register</Link>
                    
                </div>
             </Form>
             </div>

             <div className="right-img" style={{
                backgroundImage:`url(${img})`,
                backgroundSize:"cover",
                
            }}></div>
            </div>
            
        </>
    );
};

