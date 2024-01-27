import axios from "axios";
import React, { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const CheckCookie = (props) => {
  const navigate = useNavigate();

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
        if (verify.data.role === "CUSTOMER") {
          navigate(props.url);
        } else {
          navigate("/forbien");
          window.location.reload();
        }
      } else {
        navigate(props.url);
      }
    };
    checkVerify();
  }, []);

  return <></>;
};

export default CheckCookie;
