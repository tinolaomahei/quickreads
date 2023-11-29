import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
//import images
import avatar1 from "../assets/images/users/avatar-1.jpg";
import { createSelector } from "reselect";

const ProfileDropdown = () => {
  const selectDashboardData = createSelector(
    (state: any) => state.Profile,
    (success) => success
  );
  // Inside your component
  const success = useSelector(selectDashboardData);

  const [username, setusername] = useState<string>("Admin");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setusername(obj.displayName);
      } else if (
        process.env.NEXT_PUBLIC_DEFAULTAUTH === "fake" ||
        process.env.NEXT_PUBLIC_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setusername(obj.username);
      }
    }
  }, [success]);

  return (
    <React.Fragment>
      <Dropdown className="ms-sm-3 header-item topbar-user">
        <Dropdown.Toggle
          type="button"
          className="btn bg-transparent border-0 arrow-none"
          id="page-header-user-dropdown"
        >
          <span className="d-flex align-items-center">
            <Image
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {username}
              </span>
              <span className="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">
                Founder
              </span>
            </span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <Dropdown.Item href="/auth/logout">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
