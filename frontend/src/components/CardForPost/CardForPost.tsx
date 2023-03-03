import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { BaseUrl } from "../../constants";
import { selectUser } from "../../features/user/userSlice";

interface Props {
  title: string;
  image: string;
  time: string;
  id: string;
}

const CardForPost: React.FC<Props> = ({id, title, image, time }) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  let cardImage =
    'data:image/png;base64,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';

  if (image) {
    cardImage = BaseUrl + '/'  + image;
  }
  const onCardlick = (id: string) => {
    navigate('/comments/' + id)
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} onClick={() => onCardlick(id)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={cardImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dayjs(time).format("DD.MM.YYYY HH:mm:ss")}
          </Typography>
          <Typography onClick={() => onCardlick(id)} variant="body2" color="text.secondary">
            by: {user?.name}
          </Typography>
          <strong>{title}</strong>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardForPost;
