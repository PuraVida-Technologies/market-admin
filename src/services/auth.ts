import axios from "axios";

export const loginAdminService: any = async (
  email: string,
  password: string
) => {
  const href = process.env.BASE_URL || "";

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
  return response.data;
};
