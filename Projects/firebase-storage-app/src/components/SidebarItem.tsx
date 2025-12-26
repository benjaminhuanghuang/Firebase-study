import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./SidebarItem.css";

type SidebarItemProps = {
  arrow?: boolean;
  icon: React.ReactNode;
  label: string;
};

const SidebarItem = ({ arrow, icon, label }: SidebarItemProps) => {
  return (
    <div className="sidebarItem">
      <div className="sidebarItem__arrow">{arrow && <ArrowRightIcon />}</div>
      <div className="sidebarItem__main">
        {icon}
        <p>{label}</p>
      </div>
    </div>
  );
};
export default SidebarItem;
