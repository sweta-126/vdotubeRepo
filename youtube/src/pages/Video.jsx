import React, { useEffect, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiTwotoneDislike,
  AiTwotoneLike,
} from "react-icons/ai";
import { CiSaveDown1 } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import styled from "styled-components";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from  "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const Videowrapper = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.div`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 600;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 450px;
  width: 100%;
  object-fit: contain;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  console.log(currentVideo);

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (e) {
      navigate("/login");
    }
  };
  const handleDislike = async () => {
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (e) {
      navigate("/login");
    }
  };

  const handleSub = async () => {
    try {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
    } catch (e) {
      navigate("/login");
    }
  };

  return (
    <Container>
      {currentVideo && channel && currentUser && (
        <>
          <Content>
            <Videowrapper>
              <VideoFrame src={currentVideo.videoUrl} controls />
            </Videowrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} views • {format(currentVideo.createdAt)}
              </Info>
              <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo.likes?.includes(currentUser?._id) ? (
                    <AiTwotoneLike />
                  ) : (
                    <AiOutlineLike />
                  )}{" "}
                  {currentVideo.likes?.length}
                </Button>
                <Button onClick={handleDislike}>
                  {currentVideo.dislikes?.includes(currentUser?._id) ? (
                    <AiTwotoneDislike />
                  ) : (
                    <AiOutlineDislike />
                  )}{" "}
                  Dislike
                </Button>
                <Button>
                  <CiSaveDown1 />
                  Save
                </Button>
                <Button>
                  <RiShareForwardLine />
                  Share
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img} />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <Description> {currentVideo.desc} </Description>
                </ChannelDetail>
              </ChannelInfo>
              <Subscribe onClick={handleSub}>
                {currentUser &&
                currentUser.subscribedUsers?.includes(channel._id)
                  ? "SUBSCRIBED"
                  : "SUBSCRIBE"}
              </Subscribe>
            </Channel>
            <Hr />
            <Comments videoId={currentVideo._id} />
          </Content>
          <Recommendation tags={currentVideo.tags} />
        </>
      )}
    </Container>
  );
};

export default Video;
