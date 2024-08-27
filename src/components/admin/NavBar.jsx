import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAdminData } from "../../Redux/admin/adminSlice";

export function NavbarDefault() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const handleLogout = () => {
    localStorage.removeItem("Token");
    dispatch(removeAdminData());
    navigate('/')
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto  max-w-screen-3xl px-4 py-2 lg:px-8 lg:py-4 bg-blue-500">
      <div className="container mx-auto  flex items-center justify-between text-blue-white-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium text-white"
        >
          Job-App
        </Typography>
     <div className="flex items-center gap-x-1">
          <Button
            onClick={() => {
              navigate("/admin/postjob");
            }}
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Add Job</span>
          </Button>
          <Button
            onClick={handleLogout}
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Log Out</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Add Job</span>
            </Button>
            <Button
              onClick={handleLogout}
              fullWidth
              variant="gradient"
              size="sm"
            >
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
