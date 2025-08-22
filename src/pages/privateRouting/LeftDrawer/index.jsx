import React, { useEffect, useState } from "react";
import "./style.css";
import {
  attendanceFilledIcon,
  attendanceNormalIcon,
  candidateFilledIcon,
  candidateNormalIcon,
  closeIcon,
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
import DialogModal from "../../../components/DialogModal";
import { Button } from "@fluentui/react-components";

const LeftDrawer = () => {
  const location = useLocation();
  const {
    selectedLeftDrawer,
    setSelectedLeftDrawer,
    openLogoutModal,
    setOpenLogoutModal,
    handleLogout
  } = useAdminData();

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
    <>
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

      {openLogoutModal && (
        <DialogModal
          isOpen={openLogoutModal}
          reset={() => setOpenLogoutModal(false)}
          width={"600px"}
          parent={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2px",
                backgroundColor: "var(--primary-color)",
                marginTop: "-56px",
                marginLeft: "-24px",
                width: "596px",
              }}
            >
              <div>
                <p style={{ marginLeft: "10px", color: "white" }}>Log Out</p>
              </div>
              <img
                src={closeIcon}
                height={20}
                width={20}
                alt="closeIcon"
                onClick={() => setOpenLogoutModal(false)}
              />
            </div>
          }
        >
          <div className="logout-container">
            <p>Are you sure you want to log out? </p>
            <div className="logout-btn">
              <Button
                style={{
                  padding: "8px 40px",
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  borderRadius: "50px",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setOpenLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button
                style={{
                  padding: "8px 40px",
                  backgroundColor: "#fff",
                  color: "#B70000",
                  border: "1px solid #B70000",
                  borderRadius: "50px",
                }}
                onClick={ handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogModal>
      )}
    </>
  );
};

export default LeftDrawer;
