import axios from "axios";

export default function useFetchData() {
    interface Props {
        name: string;
        email: string;
        password: string;
    }
    type LoginProps = Omit<Props, "name">;

    const URL = "http://localhost:3000/api/auth";

    async function signup(props: Props) {
        const { name, email, password } = props;
        
        
        if (!name || !email || !password) {
            throw new Error("entities not found ");
        }
        try {
            const response = await axios.post(`${URL}/signup`, {
                name,
                email,
                password,
            });
            console.log(response);
            
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`something went wrong: ${error}`);
        }
    }

    async function login(props: LoginProps) {
        const { email, password } = props;
        if (!email || !password) {
            throw new Error("entities not found ");
        }
        try {
            const response = await axios.post(`${URL}/login`, {
                email,
                password,
            });
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`something went wrong: ${error}`);
        }
    }

    async function logoutUser() {
        try {
            await axios.post(`${URL}/logout`);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to logout user");
        }
    }

    return {
        signup,
        login,
        logoutUser
    };
}
