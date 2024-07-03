import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  name: string;
  password: string;
};

//TODO: add mongodDb database
const users: User[] = [
  {
    id: '1',
    name: 'John',
    password: 'pass123', //TODO: use a hash instead
  },
  {
    id: '2',
    name: 'Marcus',
    password: 'pass456',
  },
];

@Injectable()
export class UsersService {
  async findUserByName(name: string): Promise<User | undefined> {
    return users.find((u) => u.name === name);
  }
}
