import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import DashboardHeader from "./dashboardHeader/DashboardHeader";
import DashboardSideBar from "./dashboardSideBar/DashboardSideBar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  overflow-x: hidden;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  if (!userInfor) navigate("/sign-in");
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <DashboardSideBar></DashboardSideBar>
        <div className="dashboard-children">{children}</div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
