import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./Profile.scss";
import Footer from "../footer/Footer";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import isEmpty from "validator/lib/isEmpty";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const Profile = (props) => {
  const [profileFirstname, setProfileFirstName] = useState("");
  const [profileLastname, setProfileLastName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [profileId, setProfileId] = useState(0);
  const [showAvatar, setShowAvatar] = useState("");
  const [avatar, setAvatar] = useState("");
  const [validate, setValidate] = useState("");

  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    props.setProgress(100);
  }, []);

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/check-cookie`,
        {
          headers: {
            "access-token": cookie.get("token"),
          },
        }
      );
      if (verify.data.message === "Success") {
        if (verify.data.auth_provider === "GOOGLE") {
          navigate("/");
        } else if (verify.data.auth_provider === "FACEBOOK") {
          navigate("/");
        } else {
          setProfileFirstName(verify.data.firstName);
          setProfileLastName(verify.data.lastName);
          setProfileEmail(verify.data.email);
          setProfileAvatar(verify.data.avatar);
          setProfileId(verify.data.id);
        }
      } else {
        navigate("/login");
      }
    };
    checkVerify();
  }, []);

  const HandleProfileValidate = () => {
    let msg = {};

    if (isEmpty(profileFirstname)) {
      msg.firstname = "First name is required!";
    }
    if (isEmpty(profileLastname)) {
      msg.lastname = "Last name is required!";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const UploadImage = (event) => {
    let file = event.target.files[0];
    setAvatar(file);
    setShowAvatar(URL.createObjectURL(file));
  };

  const HandleSaveProfile = async () => {
    let isValid = HandleProfileValidate();

    if (!isValid) {
      return;
    }

    let formData = new FormData();
    formData.append("id", profileId);
    formData.append("firstName", profileFirstname);
    formData.append("lastName", profileLastname);
    formData.append("image", avatar);
    let res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/update-profile`,
      formData
    );

    let cookie = new Cookies();

    cookie.set("token", res.data.token, {
      path: "/",
    });

    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Thông tin` : `Profile`}</title>
      </Helmet>
      <Navbar />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>
                  {language === "VN" ? (
                    <>Chúng tôi bán trái cây tươi</>
                  ) : (
                    <>We sale fresh fruits</>
                  )}
                </p>
                <h1>
                  {language === "VN" ? <>Thông tin của tôi</> : <>My Profile</>}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="profile_box"
        style={{
          backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
        }}
      >
        <h3
          style={{
            color: theme === "SUN" ? "#051922" : "white",
          }}
        >
          {language === "VN" ? <>Thông tin của tôi</> : <>My Profile</>}
        </h3>
        <Form>
          <FormGroup>
            <Label
              for="fname"
              style={{
                color: theme === "SUN" ? "#051922" : "white",
              }}
            >
              {language === "VN" ? <>Họ</> : <>First name</>}
            </Label>
            <Input
              type="text"
              name="fname"
              id="fname"
              value={profileFirstname}
              placeholder={
                language === "VN" ? "Nhập họ của bạn..." : "Enter firstname..."
              }
              onChange={(event) => setProfileFirstName(event.target.value)}
            />
            <span className="text-danger msg">{validate.firstname}</span>
          </FormGroup>

          <FormGroup>
            <Label
              for="lname"
              style={{
                color: theme === "SUN" ? "#051922" : "white",
              }}
            >
              {language === "VN" ? <>Tên</> : <>Last name</>}
            </Label>
            <Input
              type="text"
              name="lname"
              id="lname"
              value={profileLastname}
              placeholder={
                language === "VN" ? "Nhập tên của bạn..." : "Enter lastname..."
              }
              onChange={(event) => setProfileLastName(event.target.value)}
            />
            <span className="text-danger msg">{validate.lastname}</span>
          </FormGroup>

          <FormGroup>
            <Label
              for="email"
              style={{
                color: theme === "SUN" ? "#051922" : "white",
              }}
            >
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={profileEmail}
              placeholder="Enter email..."
              onChange={(event) => setProfileEmail(event.target.value)}
              readOnly
            />
          </FormGroup>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FormGroup>
              <Label
                for="avatar"
                style={{
                  color: theme === "SUN" ? "#051922" : "white",
                }}
              >
                {language === "VN" ? (
                  <>Hình đại diện hiện tại</>
                ) : (
                  <>Current Avatar</>
                )}
              </Label>
              <br />
              {profileAvatar === null || profileAvatar === "undefined" ? (
                <FontAwesomeIcon
                  style={{
                    fontSize: "80px",
                    color: theme === "SUN" ? "#051922" : "white",
                  }}
                  icon={icon({ name: "user" })}
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/users/${profileAvatar}`}
                  width="80px"
                  className="show_avatar"
                  alt=""
                />
              )}
            </FormGroup>

            <FormGroup style={{ display: "flex", flexDirection: "column" }}>
              <Label
                for="avatar"
                className="avatar_label"
                style={{
                  color: theme === "SUN" ? "#051922" : "white",
                }}
              >
                {language === "VN" ? (
                  <>Tải lên hình đại diện</>
                ) : (
                  <>Upload Avatar</>
                )}
              </Label>
              <img
                src={showAvatar}
                width="80px"
                className="show_avatar"
                alt=""
              />

              <Input
                type="file"
                name="avatar"
                id="avatar"
                onChange={UploadImage}
              />
            </FormGroup>
          </div>
          <Button onClick={HandleSaveProfile}>
            {language === "VN" ? <>Lưu thay đổi</> : <>Save change</>}
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
