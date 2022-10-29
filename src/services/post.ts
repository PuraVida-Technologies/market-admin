import axios from "axios";

export type Post = {
  name?: string;
  status?: boolean;
  description?: string;
  _id?: string;
  address?: string;
  createdAt?: string;
  imagesUrls?: string[];
  mainImageUrl?: string;
  slug?: string;
};

export type PostsResponse = {
  data?: Post[];
  pagination?: {
    total: number;
    numberOfPages: number;
    page: number;
    count: number;
    limit: number;
  };
  errors?: string;
};

type GetPostsAdminOptions = {
  limit: number;
  page: number;
};

export async function postAdminService(
  options: GetPostsAdminOptions
): Promise<PostsResponse> {
  const { limit, page } = options;
  const href = process.env.BASE_URL || "";

  const userData = sessionStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `query($limit: Float, $page: Float){
        getAdminPosts(getAdminPostsInput: { limit: $limit, page: $page }) {   
            data {
                name,
                status,
                description,
                _id,
                address,
                createdAt,
                imagesUrls,
                mainImageUrl,
            },
            pagination {
                total,
                numberOfPages,
                page,
                count,
                limit,
            }
        }
    }`,
      variables: {
        limit,
        page,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data?.data?.getAdminPosts as PostsResponse;
}

export async function getPostDetails(id: string): Promise<Post> {
  const href = process.env.BASE_URL || "";

  const userData = sessionStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `query ($id: String!){
        getAdminPost(id:$id){   
                name,
                status,
                description,
                _id,
                address,
                createdAt,
                imagesUrls,
                mainImageUrl,
      }
    }`,
      variables: {
        id,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data.data.getAdminPost as Post;
}

export async function updatePostStatus(
  id: string,
  status: string,
  reason?: string
): Promise<Post | { message: string }[]> {
  const href = process.env.BASE_URL || "";

  const userData = sessionStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `mutation($status: String!, $postId: String!, $reason: String){
    approveOrDeclinePost(approveOrDeclinePostInput: {
        status: $status,
        postId: $postId
        reason: $reason
        }){   
        _id,
        status
    }
}`,
      variables: {
        status,
        postId: id,
        reason,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );
  if (!response.data.data) {
    return response.data.errors;
  }
  return response.data.data.approveOrDeclinePost as Post;
}
