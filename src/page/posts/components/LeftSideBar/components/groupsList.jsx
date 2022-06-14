import { ipfsCloudFrontRoot } from "../../../../../commons/web3";



const GroupsList = (props) => {


  return (
    <div className="rd-group-list-container">
      <div>Title: {props.data.name}</div>
      <div>CID: {props.data.cid}</div>
      <div>Created at: {props.data.createdAt}</div>
      <div>Created by: {props.data.createdBy}</div>
      <div>Description: {props.data.description}</div>
      <div>Public Level: {props.data.level}</div>
      <div>Group id: {props.data._id}</div>
      {/* <div>{ipfsCloudFrontRoot}{props.data</div> */}
    </div>
  );
};

export default GroupsList;
