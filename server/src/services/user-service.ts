import UserRepository from '../repositories/user-repository';
import basicAuth from 'express-basic-auth';

export default class UserService {
    public VerifyUser(username: string, password: string) {
        const userRepository: UserRepository = new UserRepository();

        const user = userRepository.getUser(username);

        if (user)
        {
            const passwordMatches = basicAuth.safeCompare(password, user.password);
            return passwordMatches
        }
        else
        {
            return false;
        }
    }
}