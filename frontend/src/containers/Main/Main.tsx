import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForPost from "../../components/CardForPost/CardForPost";
import Spinner from "../../components/Spinner/Spinner";
import { getPosts, postArray } from "../../store/ForumSlice";

const Main = () => {
  const arrayWithPosts = useAppSelector(postArray);
  const dispatch = useAppDispatch();
  const requestArtist = useCallback(async () => {
    await dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    requestArtist().catch(console.error);
  }, [requestArtist]);

  const createCard = arrayWithPosts.map((element) => {
    return (
      <CardForPost id={element._id} title={element.title} image={element.image} time={element.datetime} key={element._id}      />
    );
  });
  return arrayWithPosts.length !== 0 ? <div>{createCard}</div> : <Spinner/>;
};

export default Main;