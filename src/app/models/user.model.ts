import {Category} from "./product.model";

export interface User {
  id: string;
  email: string;
  password: string;
  avatar: string;
  name: string;
  role: string
}

export interface CreateUserDTO extends Omit<User, 'id'>{

}
