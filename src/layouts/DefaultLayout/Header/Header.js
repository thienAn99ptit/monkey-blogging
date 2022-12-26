import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../components/button";
import { SearchIcon } from "../../../components/icons/Icons";
import Image from "../../../components/image/Image";
import { useAuth } from "../../../contexts/auth-context";

const HeaderStyled = styled.header`
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
  background-color: #fff;
  .container {
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left {
      display: flex;
      align-items: center;

      .logo {
        display: block;
        width: 43px;
        height: 56px;
        margin-right: 22px;
      }
      .menu-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 40px;
        a {
          color: #000;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
        }
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .input-container {
        position: relative;
        margin-right: 20px;
        input {
          background: #ffffff;
          border: 1px solid #cfcfcf;
          border-radius: 8px;
          width: 320px;
          padding: 12px 40px 12px 22px;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          ::-webkit-input-placeholder {
            color: #999999;
          }
          ::-moz-input-placeholder {
            color: #999999;
          }
        }
        .search {
          position: absolute;
          z-index: top;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }
      }
      .sign-up {
        width: 150px;
        height: 50px;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
`;
function Header() {
  const { userInfor } = useAuth();
  return (
    <HeaderStyled>
      <div className="container">
        <div className="header-left">
          <NavLink to="/">
            <Image src="/logo.png" className="logo"></Image>
          </NavLink>
          <ul className="menu-list">
            <li className="menu-item ">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="header-right">
          <div className="input-container">
            <input type="text" placeholder="Search posts..." />
            <SearchIcon className="search" />
          </div>
          {userInfor?.displayName ? (
            <h3 className="">
              Welcome
              <strong className="text-green-500 font-semibold ml-2">
                {userInfor.displayName}
              </strong>
            </h3>
          ) : (
            <Button type="link" to="/sign-in" className="sign-up">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </HeaderStyled>
  );
}

export default Header;
