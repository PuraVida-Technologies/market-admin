import { baseUrl } from "@/util/apiUrls";
import axiosClient from "./axios";

export type Post = {
  name?: string;
  status?: string;
  description?: string;
  _id?: string;
  address?: string;
  createdAt?: string;
  imagesUrls?: string[];
  mainImageUrl?: string;
  slug?: string;
  reason?: string;
  tags?: {
    _id: string;
    name: string;
  }[];
  location?: {
    coordinates: number[];
  },
  owner?: {
    phoneNumber?: string;
    email?: string;
    isPhoneVerified?: boolean;
  }
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

export type PostReport = {
  _id?: string;
  post?: Post;
  createdAt?: string;
  reason: string;
  userId: string;
};

export type PostReportsResponse = {
  data?: PostReport[];
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
  order: string;
  status: string;
};

export async function postAdminService(
  options: GetPostsAdminOptions
): Promise<PostsResponse> {
  const { limit, page, order, status } = options;
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
    href,
    {
      query: `query($limit: Float, $page: Float, $order: String,$status : String){
        getAdminPosts(getAdminPostsInput: { limit: $limit, page: $page, order: $order, sortBy: "createdAt",status:$status}) {   
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
        order,
        status,
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
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
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
                reason,
                location {
                  coordinates
                }
                tags {
                  _id
                  name
                }
                owner {
                  phoneNumber,
                  email
                  isPhoneVerified
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
console.log("response.data?.data?.getAdminPost", response.data?.data?.getAdminPost);

  return response.data?.data?.getAdminPost as Post;
}

export async function updatePostStatus(
  id: string,
  status: string,
  reason?: string
): Promise<Post | { message: string }[]> {
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
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

export async function getPostReportsAdminService(
  options: GetPostsAdminOptions
): Promise<PostReportsResponse> {
  const { limit, page, order } = options;
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
    href,
    {
      query: `query($limit: Float, $page: Float, $order: String){
        getAdminReportedPosts(getAdminReportedPostInput: { limit: $limit, page: $page, order: $order, sortBy: "createdAt"}) {   
          data{
            post{
              _id
              name
            }
            _id
            createdAt
            reason
            userId
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
        order,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data?.data?.getAdminReportedPosts as PostReportsResponse;
}

export async function ignorePostReportAdminService(
  reportId: string
): Promise<PostReport> {
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
    href,
    {
      query: `mutation($reportId: String!){
        ignorePostReport(id: $reportId) {   
          _id
        }
    }`,
      variables: {
        reportId,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data?.data?.ignorePostReport as PostReport;
}

export async function removePostAdminService(postId: string): Promise<Post> {
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axiosClient.post(
    href,
    {
      query: `mutation($postId: String!){
        removeAdminPost(id: $postId) {   
          _id
        }
    }`,
      variables: {
        postId,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data?.data?.removeAdminPost as Post;
}
