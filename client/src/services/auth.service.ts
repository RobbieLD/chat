import AuthRequest from "@/models/auth-request";
import User from "@/models/user";
import axios from "axios";

export default class AuthService {

    public async login(req: AuthRequest): Promise<User | null> {
        const result = await axios
            .post(process.env.VUE_APP_AUTH_URL, {}, {
                auth: {
                    username: req.username,
                    password: req.password
                }
            });

            if (result.status != 200) {
                return null;
            }

            return {
                    name: req.username,
                    token: result.data
                };
    }
}