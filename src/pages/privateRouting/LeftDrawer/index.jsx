import React, { useEffect, useState } from "react";
import "./style.css";
import {
  attendanceFilledIcon,
  attendanceNormalIcon,
  candidateFilledIcon,
  candidateNormalIcon,
  employeesFilledIcon,
  employeesNormalIcon,
  leavesFilledIcon,
  leavesNormalIcon,
  logoutFilledIcon,
  logoutNormalIcon,
} from "../../../../image";
import RenderMenuItems from "./components/RenderMenuItems";
import { useLocation } from "react-router-dom";
import { useAdminData } from "../../../context/PrivateContentContext";

const LeftDrawer = () => {
  const location = useLocation();
  const { selectedLeftDrawer, setSelectedLeftDrawer } = useAdminData();

  const menuSections = [
    {
      title: "Recruitment",
      items: [
        {
          label: "Candidates",
          normalIcon: candidateNormalIcon,
          filledIcon: candidateFilledIcon,
          path: "/candidate",
        },
      ],
    },
    {
      title: "Organisation",
      items: [
        {
          label: "Employees",
          normalIcon: employeesNormalIcon,
          filledIcon: employeesFilledIcon,
          path: "/employees",
        },
        {
          label: "Attendance",
          normalIcon: attendanceNormalIcon,
          filledIcon: attendanceFilledIcon,
          path: "/attendance",
        },
        {
          label: "Leaves",
          normalIcon: leavesNormalIcon,
          filledIcon: leavesFilledIcon,
          path: "/leave",
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          label: "Logout",
          normalIcon: logoutNormalIcon,
          filledIcon: logoutFilledIcon,
        },
      ],
    },
  ];

  useEffect(() => {
    let activeTab = "Candidates";
    menuSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.path && location.pathname.startsWith(`/admin${item.path}`)) {
          activeTab = item.label;
        }
      });
    });
    setSelectedLeftDrawer(activeTab);
  }, [location.pathname]);

  return (
    <div className="side-bar-root">
      <p className="title-text">HR Made Easy</p>
      <div>
        {menuSections?.map((section) => (
          <div key={section?.title}>
            <p className="menu-title">{section?.title}</p>
            <RenderMenuItems
              items={section?.items}
              selectedTab={selectedLeftDrawer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftDrawer;
