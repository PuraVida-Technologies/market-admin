import { baseUrl } from "@/util/apiUrls";
import axios from "axios";

export type TagNameObj = {
  language: string;
  name: string;
};

export type Tag = {
  _id: string;
  names?: TagNameObj[];
  icon: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
};

export type TagsResponse = {
  data?: Tag[];
  pagination?: {
    total: number;
    numberOfPages: number;
    page: number;
    count: number;
    limit: number;
  };
  errors?: string;
};

type AdminTagResponse = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  status: string;
  errors?: string;
};

type GetTagssAdminOptions = {
  limit: number;
  page: number;
  order: string;
  status: string;
};

type AdminTagName = {
  language: string;
  name: string;
};

type CreateAdminTagArgs = {
  names: AdminTagName[];
  icon: string;
};

type ApproveOrRejectAdminTagArgs = {
  id: string;
  status: string;
  reason?: string;
  names?: AdminTagName[];
  icon?: string;
};

export async function tagsAdminService(
  options: GetTagssAdminOptions
): Promise<TagsResponse> {
  const { limit, page, order, status } = options;
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `query($limit: Float, $page: Float, $order: String,$status : String){
        getAdminTags(getAdminTagsInput: { limit: $limit, page: $page, order: $order, sortBy: "createdAt",status:$status }){   
          data {
            _id
            names {
              language
              name
              slug
              description
            }
            createdAt
            updatedAt
            status
            icon
          }
        pagination {
            total,
            numberOfPages,
            page,
            count
            limit
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

  return response.data?.data?.getAdminTags as TagsResponse;
}

export async function createAdminTag(
  options: CreateAdminTagArgs
): Promise<AdminTagResponse> {
  const { names, icon } = options;
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `mutation($names: [AdminTagName!]!, $icon: String!){
        createAdminTag(createAdminTagInput: { names: $names, icon: $icon }){   
          _id
          names {
            language
            name
            slug
          }
          icon
          status
        }
      }`,
      variables: {
        names,
        icon,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data?.data?.createAdminTag as AdminTagResponse;
}

export async function approveOrRejectAdminTag(
  options: ApproveOrRejectAdminTagArgs
): Promise<AdminTagResponse> {
  const { id, status, reason, names, icon } = options;
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `mutation($id: String!, $status: String!, $reason: String, $names: [TagName!], $icon: String){
        approveOrRejectAdminTag(approveOrRejectAdminTagInput: { id: $id, status: $status, reason: $reason,names: $names, icon: $icon }){   
          _id
          names {
            language
            name
            slug
            description
          }
          icon
          status
        }
      }`,
      variables: {
        id,
        status,
        reason,
        names,
        icon,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.auth?.token,
      },
    }
  );

  return response.data?.data?.createAdminTag as AdminTagResponse;
}

export async function getTagDetails(id: string): Promise<Tag> {
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `query ($id: String!){
        getAdminTags(getAdminTagsInput: {}){   
        _id,
        name,
        createdAt,
        updatedAt
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

  return response.data.data.getAdminTags as Tag;
}

export async function updateTagStatus(
  id: string,
  status: string,
  reason?: string
): Promise<Tag | { message: string }[]> {
  const href = baseUrl + "/graphql";

  const userData = localStorage.getItem("auth");
  const user = userData && JSON.parse(userData);

  const response = await axios.post(
    href,
    {
      query: `mutation($status: String!, $tagId: String!, $reason: String){
    approveOrDeclineTag(approveOrDeclineTagInput: {
        status: $status,
        tagId: $tagId
        reason: $reason
        }){   
        _id,
        status
    }
}`,
      variables: {
        status,
        tagId: id,
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
  return response.data.data.approveOrDeclineTag as Tag;
}
