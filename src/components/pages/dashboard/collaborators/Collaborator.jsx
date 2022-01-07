import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./collaborator.css";

export default function Collaborator() {
  console.log("this are the params", useParams());
  return (
    <div className="collaborator">
      <div className="collaboratorTitleContainer">
        <h1 className="collaboratorTitle">Edit Collaborator</h1>
        <Link to="newCollaborator">
          <button className="collaboratorAddButton">Create</button>
        </Link>
      </div>
      <div className="collaboratorContainer">
        <div className="collaboratorShow">
          <div className="collaboratorShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="collaboratorShowImg"
            />
            <div className="collaboratorShowTopTitle">
              <span className="collaboratorShowUsername">Anna Becker</span>
              <span className="collaboratorShowUserTitle">
                Software Engineer
              </span>
            </div>
          </div>
          <div className="collaboratorShowBottom">
            <span className="collaboratorShowTitle">Account Details</span>
            <div className="collaboratorShowInfo">
              <PermIdentity className="collaboratorShowIcon" />
              <span className="collaboratorShowInfoTitle">annabeck99</span>
            </div>
            <div className="collaboratorShowInfo">
              <CalendarToday className="collaboratorShowIcon" />
              <span className="collaboratorShowInfoTitle">10.12.1999</span>
            </div>
            <span className="collaboratorShowTitle">Contact Details</span>
            <div className="collaboratorShowInfo">
              <PhoneAndroid className="collaboratorShowIcon" />
              <span className="collaboratorShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="collaboratorShowInfo">
              <MailOutline className="collaboratorShowIcon" />
              <span className="collaboratorShowInfoTitle">
                annabeck99@gmail.com
              </span>
            </div>
            <div className="collaboratorShowInfo">
              <LocationSearching className="collaboratorShowIcon" />
              <span className="collaboratorShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="collaboratorUpdate">
          <span className="collaboratorUpdateTitle">Edit</span>
          <form className="collaboratorUpdateForm">
            <div className="collaboratorUpdateLeft">
              <div className="collaboratorUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="collaboratorUpdateInput"
                />
              </div>
              <div className="collaboratorUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="collaboratorUpdateInput"
                />
              </div>
              <div className="collaboratorUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="collaboratorUpdateInput"
                />
              </div>
              <div className="collaboratorUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="collaboratorUpdateInput"
                />
              </div>
              <div className="collaboratorUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="collaboratorUpdateInput"
                />
              </div>
            </div>
            <div className="collaboratorUpdateRight">
              <div className="collaboratorUpdateUpload">
                <img
                  className="collaboratorUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="collaboratorUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="collaboratorUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
