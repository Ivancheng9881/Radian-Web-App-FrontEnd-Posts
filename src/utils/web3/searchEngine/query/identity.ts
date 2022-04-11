import { gql } from "@apollo/client";

const IDENTITY_LIST = gql`
    query GetIdentityList {
        identityList {
            data {
            id
            content {
                firstName
                lastName
                profilePictureCid
                
            }
            }
            meta {
            skip
            limit
            }
        }
    }
`;


const identityQuery = {
    IDENTITY_LIST,
};

export default identityQuery;