import React, { useState } from 'react'
import { IoPersonCircleOutline, IoSearch } from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {BiVideoPlus} from "react-icons/bi"
import Upload from './Upload';
import person from "../images/person.png"

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.bgLight};
    height: 56px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0px 20px;
    position: relative;
`;

const Search = styled.div`
    width: 40%;
    position: absolute;
    left:0;
    right:0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: ${({theme}) => theme.textSoft} ;
`;

const Input = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({theme}) => theme.text} ;
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    display:flex;
    align-items: center;
    gap: 5px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({theme}) => theme.text} ;
`

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #999;
`

const Navbar = () => {

  const [open, setOpen] = useState(false);

  const {currentUser} = useSelector((state)=>state.user)

  const [q, setQ] = useState("")
  const navigate = useNavigate()
  return (
    <>
    <Container>
        <Wrapper>
            <Search>
                <Input placeholder="Search" onChange={e=> setQ(e.target.value)} />
                <IoSearch onClick={()=>navigate(`/search?q=${q}`)} />
            </Search>
            {currentUser ? 
            <User>
                <BiVideoPlus onClick={()=>setOpen(true)} style={{fontSize: "30px", marginRight:"10px"}} />
                <Avatar  src={currentUser.img || person }  />
                {currentUser.name}
            </User>
            : 
            <Link to="login" style={{textDecoration: "none"}}>
                <Button>
                    <IoPersonCircleOutline />Log in
                </Button>
            </Link>}
        </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar