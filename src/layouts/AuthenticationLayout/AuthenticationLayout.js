import styled from "styled-components";
import Image from "../../components/image/Image";

const AuthStylesPage = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo-container {
    width: 121px;
    height: 156px;
    margin: 0 auto 20px;
  }
  .logo {
  }
  .title {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }

  .input {
    background-color: ${(props) => props.theme.grayLight};
  }
  .input:focus {
    background-color: #fff;
    border: 1px solid #00b4aa;
  }
  .button {
    text-align: center;
  }
  .have-account {
    margin-bottom: 25px;
    a {
      display: inline-inline-block;
      color: ${(props) => props.theme.primary};
    }
  }
`;

function AuthenticationLayout({ children }) {
  return (
    <AuthStylesPage>
      <div className="container">
        <div className="logo-container">
          {" "}
          <Image src="/logo.png" className="logo"></Image>
        </div>
        <h1 className="title">Monkey Blogging</h1>
        {children}
      </div>
    </AuthStylesPage>
  );
}

export default AuthenticationLayout;
