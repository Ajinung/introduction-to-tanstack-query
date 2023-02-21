import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getAll, newPost } from "../API/Api";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getPost = useQuery({
    queryKey: ["MyPosts"],
    queryFn: getAll,
  });

  const createPost = useMutation({
    mutationFn: newPost,
  });

  const thisPost = () => {
    createPost.mutate({
      title,
      description,
    });
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <input
            type="text"
            placeholder="enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="enter description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <button onClick={thisPost}>upload Post</button>
        </Wrapper>
        <h1>View Post</h1>{" "}
        <PostHolder>
          {getPost.data?.map((props: any) => (
            <Post key={props._id}>
              <p>{props.title}</p>
              <span>{props.description}</span>
            </Post>
          ))}{" "}
        </PostHolder>
      </Container>
    </div>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;

  input {
    width: 400px;
    height: 30px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 0;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  button {
    padding: 10px 30px;
    background-color: #000;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: #fff;
    transition: all ease 0.2s;
    font-size: 16px;
    border: 0;

    :hover {
      cursor: pointer;
      background-color: #fff;
      color: #000;
    }
  }
`;

const PostHolder = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #efeded;
`;
const Post = styled.div`
  width: 350px;
  padding: 20px;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;

  p {
    font-weight: 600;
    font-size: 1.7rem;
    text-align: center;
  }

  span {
    text-align: center;
    font-size: 17px;
  }
`;
