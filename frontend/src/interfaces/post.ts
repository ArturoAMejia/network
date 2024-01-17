// export interface IPost {
//   id?: number;
//   user: User;
//   likes?: number;
//   content: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

export interface User {
  id: number;
  username: string;
  email: string;
  followers: number;
  following: number;
}

export interface ILike {
  id?:         number;
  created_at?: Date;
  updated_at?: Date;
  user:       number;
  post:       number;
}


export interface IPost {
  id?:         number;
  user:       User;
  likes:      Like[] | [];
  count?:      number;
  content:    string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Like {
  id:         number;
  created_at: Date;
  updated_at: Date;
  user:       number;
  post:       number;
}

