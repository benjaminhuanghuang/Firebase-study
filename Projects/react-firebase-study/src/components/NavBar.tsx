import { NavLink } from "react-router-dom";

const menus = [
  { name: "FirebaseCRUD", to: "/", id: "firebaseCRUD" },
  { name: "Image Upload", to: "/image-upload", id: "imageUpload" },
  { name: "About", to: "/about", id: "about" },
  { name: "Rotate", to: "/rotate", id: "rotate" },
];

const Navbar = () => {
  return (
    <nav
      className="w-full md:h-12 sm:h-14 h-24 flex justify-between items-center xl:px-36 lg:px-24 
    md:px-12 sm:px-6 px-4 py-4 bg-gray-200 dark:bg-gray-800"
    >
      {/* Left Side */}
      <div></div>

      {/* Center - Menu */}
      <div className="flex flex-1 gap-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.to}
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "red" : "black",
            })}
          >
            {menu.name}
          </NavLink>
        ))}
      </div>

      {/* Right Side - User Info */}
      <div className="flex items-center sm:gap-x-4 gap-x-2">
        <a href="#" className="md:text-2xl sm:text-xl text-lg text-yellow-500">
          Ben Huang
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
