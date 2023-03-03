export interface GlobalError {
  error: string;
}
export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
  name: string;
}
export interface LoginMutation {
  username: string;
  password: string;
  name: string;
}
export interface RegisterMutation {
  username: string;
  password: string;
  name: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Post{
  datetime: string;
  title: string;
  image: string;
  _id: string;
  description: string;
}
export interface commentSet {
  text: string; 
  id: string;
}

export interface PostSet{
  title: string;
  description: string;
  image: string | null;
}

export interface Comment {
  name: string;
  _id: string;
  text: string;
}