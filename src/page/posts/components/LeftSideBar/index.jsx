import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import GroupsList from "./components/groupsList";

const GROUP_LIST = gql`
  query GetGroupList($filter: GroupFilter, $skip: Int, $limit: Int) {
    getGroupList(filter: $filter, skip: $skip, limit: $limit) {
      data {
        _id
        cid
        name
        description
        thumbnail {
          src
          type
        }
        banner {
          src
          type
        }
        isPublic
        createdBy
        createdAt
        updatedAt
      }
    }
  }
`;

const LeftSideBar = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (groups) {
      console.log(groups);
    }
  });

  const { loading, error, data } = useQuery(GROUP_LIST, {
    variables: {
      filter: null,
      skip: null,
      limit: null,
    },
    onCompleted: (queryData) => {
      const { data } = queryData.getGroupList;
      setGroups(data);
    },
  });

  if (loading) return "loading...";
  if (error) return "error";

  return (
    <div className="rd-left-side-list-wrapper">
      <ul>
        {groups.map((group) => (
          <GroupsList data={group} />
        ))}
      </ul>
    </div>
  );
};

export default LeftSideBar;
