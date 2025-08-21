import React from "react";
import { useNavigate } from "react-router-dom";

const RenderMenuItems = ({ items, selectedTab }) => {
  const navigate = useNavigate();
  return (
    <>
      {items?.map((menu) => (
        <div
          key={menu.label}
          className="drawer-content"
          onClick={() => navigate(`/admin${menu?.path}`)}
        >
          <img
            src={
              selectedTab === menu?.label ? menu.filledIcon : menu.normalIcon
            }
            width={20}
            height={20}
            alt={menu?.label}
          />
          <p
            style={{
              color:
                selectedTab === menu?.label
                  ? "var(--primary-color)"
                  : "var(--text-color)",
            }}
          >
            {menu?.label}
          </p>
        </div>
      ))}
    </>
  );
};

export default RenderMenuItems;
