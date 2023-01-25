import { baseUrl } from "@/util/apiUrls";
import axios from "axios";

export type AuthResponse = {
  data?: {
    user: {
      name: string;
      email: string;
    };
    token: string;
    tokenLifeTime: number;
  };
  errors?: string;
};

export async function loginAdminService(
  email: string,
  password: string
): Promise<AuthResponse> {
  const href = baseUrl;

  const response = await axios.post(
    href,
    {
      query: `mutation($email: String!, $password: String!){
            auth(authInput: { email: $email, password: $password }) {
                user {
                    name,
                    email
                }   
                token
                tokenLifeTime
            }
        }`,
      variables: {
        email,
        password,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data as AuthResponse;
}
