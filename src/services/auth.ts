import { baseUrl } from "@/util/apiUrls";
import axiosClient from "./axios";


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
  const href = baseUrl + "/graphql";

  const response = await axiosClient.post(
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

export type IForgetPasswordResponse = {
  message: string;
}

export async function forgetPassword(email: string): Promise<IForgetPasswordResponse> {
  const href = baseUrl + "/graphql";

  const response = await axiosClient.post(
    href,
    {
      query: `mutation($email: String!) {
        forgetPassword(forgetPasswordInput: {email : $email}) {
          message
        }
      }`,
      variables: {email},
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data?.data?.forgetPassword as IForgetPasswordResponse;
}

export async function updatePassword(
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
): Promise<AuthResponse> {
  const href = baseUrl + "/graphql";
  
  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
    href,
    {
      query: `mutation($oldPassword: String!, $newPassword: String!, $confirmNewPassword: String!){
        updatePassword(updatePasswordInput: {oldPassword: $oldPassword, newPassword: $newPassword,  confirmNewPassword: $confirmNewPassword}) {
                user {
                    name,
                    email
                }   
                token
                tokenLifeTime
            }
        }`,
      variables: {
        oldPassword,
        newPassword,
        confirmNewPassword,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data as AuthResponse;
}
