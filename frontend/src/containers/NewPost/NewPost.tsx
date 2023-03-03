import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import InputBtn from "../../components/InpoutBtn/inputBtn";
import { selectUser } from "../../features/user/userSlice";
import { addPost } from "../../store/ForumSlice";

const NewPost = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  const onCardChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setPost((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setPost((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  let onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (post.image !== null || post.description !== '') {
      await dispatch(addPost(post));
      navigate("/");
    } else {
      window.alert("u should right description or image");
    }
  };

	if (!user) {
    return <Navigate to={"/register"} />;
  }
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <TextField
          required
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name="title"
          value={post.title}
          onChange={onCardChange}
        />
        <div>
          <TextField
						sx={{my: 4}}
            id="outlined-multiline-static"
            label="description"
            multiline
            rows={4}
            name="description"
            value={post.description}
            onChange={onCardChange}
          />
        </div>
        <InputBtn
          onChange={fileInputChangeHandler}
          name={"image"}
          label={"Image"}
        ></InputBtn>
        <Button sx={{my: 4}} variant="outlined" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
