import { IUser } from "./user";

export interface IPost {
  id?:         number;
  content:    string;
  created_at?: Date;
  updated_at?: Date;
  user:       number | IUser;
}
