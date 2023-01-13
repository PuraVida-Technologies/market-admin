import axios from "axios";

type AdminPostTag = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
};

type Owner = {
  phoneNumber: string;
  isPhoneVerified: boolean;
  email: string;
  hidePhoneNumber: boolean;
};

export type PostData = {
  _id?: string;
  name?: string;
  tags?: AdminPostTag[];
  location?: Location;
  owner?: Owner;
  description?: string;
  mainImageUrl?: string;
  imagesUrls?: string[];
  address?: string;
  userId?: string;
  status?: string;
  openHours?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  reason?: string;
};
export type Post = {
  _id?: string;
  postId?: string;
  postData?: PostData;
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

export async function getUpdatePostsRequests(
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
        getUpdatePostsRequests(getRequestUpdatePostsInput: { limit: $limit, page: $page }) {   
            data {
              _id,
              postId,
              postData {
                _id,
                name,
                location {
                  type,
                  coordinates
                },
                owner {
                  phoneNumber,
                  isPhoneVerified,
                  email,
                  hidePhoneNumber,
                  },
                description,
                mainImageUrl,
                imagesUrls,
                address,
                userId,
                status,
                openHours,
                slug
              }
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
  const data = response.data?.data?.getUpdatePostsRequests.data.map(
    (getPostRest: Post) => ({
      ...getPostRest,
      postData: {
        ...getPostRest.postData,
        _id: getPostRest._id,
      },
    })
  );

  return {
    data,
    pagintion: response.data?.data?.getUpdatePostsRequests.pagination,
  } as PostsResponse;
}

export async function getSingleUpdatePostsRequest(id: string): Promise<Post> {
  const href = process.env.BASE_URL || "";

  const userData = sessionStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `query ($id: String!){
        getUpdatePostsRequest(id:$id){
          _id,
          postId,
          postData {
            _id,
            name,
            location {
              type,
              coordinates
            },
            owner {
              phoneNumber,
              isPhoneVerified,
              email,
              hidePhoneNumber,
              },
            description,
            mainImageUrl,
            imagesUrls,
            address,
            userId,
            status,
            openHours,
            slug
          }
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
  console.log(response.data);
  return response.data.data.getUpdatePostsRequest as Post;
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
      query: `mutation($status: String!, $requestId: String!, $reason: String){
        approveOrDeclineUpdatePostRequest(approveOrDeclineUpdatePostRequestInput: {
        status: $status,
        requestId: $requestId
        reason: $reason
        }){   
        _id,
        postId
    }
}`,
      variables: {
        status,
        requestId: id,
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
  return response.data.data.approveOrDeclineUpdatePostRequest as Post;
}
