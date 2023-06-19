import React, { useState } from 'react'
import styled from 'styled-components'
import axios from  "axios";
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from '../redux/userSlice';
import {auth, provider} from "../firebase"
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh-56px);
    color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(100vh-56px);
    background-color: ${({theme}) => theme.bgLight};
    border: 1px solid ${({theme}) => theme.soft};
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.h1`
    font-size: 20px;
`;

const SubTitle = styled.h2`
    font-size: 16px;
    font-weight: 300;
`;

const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    border-radius:3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({theme}) => theme.text};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 600;
    cursor: pointer;
    background-color: ${({theme}) => theme.soft};
    color:${({theme}) => theme.textSoft} ;
`;

const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    color: ${({theme}) => theme.textSoft};
`;

const Links = styled.div`
    margin-left: 50px;
`;

const Link = styled.span`
    margin-left: 30px;
`;

const Login = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async(e)=>{
        e.preventDefault();
        dispatch(loginStart())
        try{
            const res = await axios.post("/auths/signin", {name,password})
            dispatch(loginSuccess(res.data));
        }catch(e){
            dispatch(loginFailure());
        }
    }


    const handleReg = async (e) => {
        e.preventDefault();
        dispatch(registerStart());
        try {
          const res = await axios.post("/auths/signup", { name,email, password });
          dispatch(registerSuccess(res.data));
        } catch (e) {
          dispatch(registerFailure());
        }
      };


    const signinGoogle = async ()=>{
        dispatch(loginStart())
        signInWithPopup(auth,provider).then((result)=>{
            console.log(result)
            axios.post("auths/google",{
                name:result.user.displayName,
                email:result.user.email,
                image:result.user.photoURL
            }).then((res)=>{
                dispatch(loginSuccess(res.data))
            })
        })
        .catch((err)=>{
            dispatch(loginFailure())
        })
    }

  return (
    <Container>
        <Wrapper>
            <Title>LOG IN</Title>
            <SubTitle>to continue with VDOtube</SubTitle>
            <Input placeholder="Username" onChange={(e)=>setName(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <Button onClick={handleLogin} >Log In</Button>
            <Title>OR</Title>
            <Button onClick={signinGoogle} >Signin with Google</Button>
            <Title>OR</Title>
            <Input placeholder="Username" onChange={(e)=>setName(e.target.value)} />
            <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <Button onClick={handleReg} >Register</Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default Login