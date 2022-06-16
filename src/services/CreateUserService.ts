import { injectable } from "tsyringe";
import { User } from "../schemas/User";

interface CreateUserDTO {
  name: string;
  email: string;
  avatar: string;
  socket_id: string;
}

@injectable()
export class CreateUserService {
  async execute({ avatar, email, name, socket_id }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate(
        { _id: userAlreadyExists.id },
        { $set: { socket_id, avatar, name } },
      );

      return user;
    }

    const user = await User.create({
      avatar, email, name, socket_id
    });

    return user;
  }
}