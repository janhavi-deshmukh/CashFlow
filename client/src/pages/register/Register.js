import React ,{useState,useEffect} from "react";
import {Form,Input,message} from 'antd';
import "./Register.css";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios"
import img from "../../images/bg.png";
import Spinner from "../../components/Spinner";


export default function Register(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false);

    const submitHandler=async (values)=>{
        try{
          setLoading(true);
          await axios.post('/users/register',values)
          message.success('Registration successfull');
          setLoading(false);
          navigate('/login');
        }catch(error){
           message.error('invalid username or password');
        }
    };

    //prevent for login user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/");

        }
    },[navigate]);
    return(
        <>
          <div className="mainBox"  >
            <div className="register-page">
            {loading && <Spinner/>}
            <Form layout="vertical" onFinish={submitHandler}>
               <h1 className="loginText">Create your Account</h1>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>

                <div className="box">
                    <button className="btn btn-primary">Register</button>
                    <Link to="/login" className="custom-link">Already Registered? Click here to login</Link>
                    
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