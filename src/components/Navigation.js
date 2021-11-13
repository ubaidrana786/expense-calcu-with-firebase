import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { ImageUpload } from "./expense/ImageUpload";
export const Navigation = ({ user }) => {
  const logout = () => {
    auth.signOut();
  };
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg fixed-top navbar-dark"
        style={{ backgroundColor: "#192bc2" }}
      >
        <div class="container">
          <Link class="navbar-brand " to="/">
            Expense Tracker
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">{<></>}</ul>
            <form class="form-inline my-2 my-lg-0">
              {/* <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> */}
                 <ImageUpload /> 
              <button
                class="btn  my-2 my-sm-0"
                style={{
                  backgroundColor: "#e9e6e6",
                  color: "#192bc2",
                  fontWeight: "900px",
                }}
                onClick={logout}
              >
                Log Out
              </button>
            </form>
         
          </div>
        </div>
      </nav>
    </div>
  );
};
