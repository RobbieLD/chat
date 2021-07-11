import User from '../models/user';
export default class UserRepository {
    users: User[];

    constructor() {
        // TODO: Make this come from a database
        this.users = [
            {
                username: 'admin',
                password: 'password'
            },
            {
                username: 'rob',
                password: 'password'
            },
            {
                username: 'fred',
                password: 'password'
            }
        ];
    }

    public getUser(username: string) {
        return this.users.find(u => u.username === username);
    }
}