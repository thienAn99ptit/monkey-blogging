import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase-config";
import HomeFeature from "./homeFeature/HomeFeature";
import HomeNewest from "./homeNewest/HomeNewest";

function Home() {
  return (
    <div className="container">
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </div>
  );
}

export default Home;
