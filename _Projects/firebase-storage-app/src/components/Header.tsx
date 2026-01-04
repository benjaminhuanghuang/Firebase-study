import AppsIcon from "@mui/icons-material/Apps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";

import "./Header.css";

type HeaderProps = {
  userPhoto: string;
};

const Header = ({ userPhoto }: HeaderProps) => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src="logo192.png" alt="logo" />
        <span>Storage</span>
      </div>
      <div className="header__searchContainer">
        <div className="header__searchBar">
          <SearchIcon />
          <input type="text" placeholder="Search in Storage" />
          <ExpandMoreIcon />
        </div>
      </div>
      <div className="header__icons">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <AppsIcon />
        <Avatar className="header__iconsAvatar" src={userPhoto} />
      </div>
    </div>
  );
};
export default Header;
