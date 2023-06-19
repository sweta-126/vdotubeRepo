import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useCookies} from 'react-cookie'
import { logout } from "../redux/userSlice";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLight};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Img = styled.img`
  height: 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 8px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {

  const [, , removeCookie] = useCookies(['token'])
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function Logout(){
    removeCookie('jwt');
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    window.location.href = "/";
  }

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={logo} />
            VDOtube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <AiFillHome />
          Home
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <MdOutlineExplore />
            Explore
          </Item>
        </Link>
        {currentUser ? 
        (<Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <MdOutlineExplore />
            Subscription
          </Item>
        </Link>)
        :
        (<Link
          to="empty"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <MdOutlineExplore />
            Subscription
          </Item>
        </Link>)
        }
        <Hr />
        <Title>Best of VDOtube</Title>
        <Item>
          <MdOutlineExplore />
          Library
        </Item>
        <Item>
          <MdOutlineExplore />
          History
        </Item>
        <Hr />
        {!currentUser ? (
          <>
            <Login>
              Log in to like videos, comment, and subscribe.
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button>
                  <IoPersonCircleOutline />
                  Log in
                </Button>
              </Link>
            </Login>
            <Hr />
          </> )
          :
          (<>
            <Login>
                <Button onClick={Logout} >
                  Log Out
                </Button>
            </Login>
            <Hr />
          </> 

        )}
        <Item>
          <MdOutlineExplore />
          Settings
        </Item>
        <Item>
          <MdOutlineExplore />
          Report
        </Item>
        <Item>
          <MdOutlineExplore />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <MdOutlineExplore />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
