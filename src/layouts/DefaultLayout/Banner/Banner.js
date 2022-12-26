import styled from "styled-components";
import { Button } from "../../../components/button";
import Image from "../../../components/image/Image";
import { useAuth } from "../../../contexts/auth-context";

const BannerStyled = styled.div`
  margin-top: 86px;
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
      .started {
        width: 230px;
        background: #fff;
        color: ${(props) => props.theme.primary};
      }
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }
  }
`;

function Banner() {
  const { userInfor } = useAuth();
  return (
    <BannerStyled>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium magnam similique accusantium natus esse facilis!
              Quaerat voluptates possimus dolorem officiis pariatur, repellat,
              cupiditate porro, quidem molestiae impedit laudantium neque quo!
            </p>
            {userInfor?.displayName ? null : (
              <Button className="started" to="/sign-in" type="link">
                Get started
              </Button>
            )}
          </div>
          <div className="banner-image">
            <Image src="/banner.png" alt="banner"></Image>
          </div>
        </div>
      </div>
    </BannerStyled>
  );
}

export default Banner;
