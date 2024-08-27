import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUserData } from "../../Redux/user/userSlice";
function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("Token");
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <div className="navbar bg-blue-500 sticky top-0 z-50">
      <div className="flex-1">
        <button className="btn btn-ghost font-Rubik text-xl text-white" onClick={() => navigate("/")}>
          Job-App
        </button>
      </div>
      <div className="flex-none gap-2">
      
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button onClick={() => navigate("/user/appliedjobs")}>
                Applied Jobs
              </button>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
