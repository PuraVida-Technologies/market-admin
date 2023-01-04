import { gql } from "@apollo/client";

export const uploadFileMutation = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      url
      filename
    }
  }
`;
