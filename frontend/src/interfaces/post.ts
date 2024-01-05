export interface IPost {
  id?: number;
  user: User | number;
  likes?: number;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  followers: number;
  following: number;
}
