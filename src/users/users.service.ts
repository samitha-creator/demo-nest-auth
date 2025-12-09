import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
};

const users: User[] = [
  {
    id: 100000,
    username: 'Kokila',
    password: 'Abc123++',
  },
];

@Injectable()
export class UsersService {
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username == username);
  }
}
