import { lazy } from "react";

const Home = lazy(() => import("../pages/frontend/homePage/Home"));
const Blog = lazy(() => import("../pages/frontend/blogPage/BlogPage"));
const Contact = lazy(() => import("../pages/frontend/contactPage/ContactPage"));

const SignUp = lazy(() => import("../pages/frontend/Sign/SignUp"));
const SignIn = lazy(() => import("../pages/frontend/Sign/SignIn"));
const PostDetailsPage = lazy(() =>
  import("../pages/frontend/postDetailpage/PostDetailPage")
);
// Backend
const DashboardHomePage = lazy(() =>
  import("../pages/backend/dashboard/DashboardHomePage")
);
const ManagePost = lazy(() => import("../pages/backend/manage/ManagePost"));
const ManageCategory = lazy(() =>
  import("../pages/backend/manage/ManageCategory")
);
const ManageUser = lazy(() => import("../pages/backend/manage/ManageUser"));
const PostAddNew = lazy(() =>
  import("../pages/frontend/homePage/post/PostAddNew")
);
const PostUpdate = lazy(() =>
  import("../pages/backend/dashboard/posts/PostUpdate")
);
const PostAddCatagory = lazy(() =>
  import("../pages/backend/dashboard/categories/CategoryAddNew")
);
const PostUpdateCatagory = lazy(() =>
  import("../pages/backend/dashboard/categories/CategoryUpdate")
);
const PostAddUser = lazy(() =>
  import("../pages/backend/dashboard/user/UserAddNew")
);
const PostUpdateUser = lazy(() =>
  import("../pages/backend/dashboard/user/UserUpdate")
);

const privaryRoute = [
  {
    element: Home,
    path: "/",
  },
  {
    element: Blog,
    path: "/blog",
  },
  {
    element: Contact,
    path: "/contact",
  },
  {
    element: SignUp,
    path: "/sign-up",
    layout: "primary",
  },
  {
    element: SignIn,
    path: "/sign-in",
    layout: "primary",
  },
  {
    element: DashboardHomePage,
    path: "/dashboard",
    layout: "dashboard",
  },
  {
    element: ManagePost,
    path: "/manage/post",
    layout: "dashboard",
  },
  {
    element: ManageCategory,
    path: "/manage/category",
    layout: "dashboard",
  },
  {
    element: ManageUser,
    path: "/manage/user",
    layout: "dashboard",
  },
  {
    element: PostAddNew,
    path: "/manage/add-post",
    layout: "dashboard",
  },
  {
    element: PostUpdate,
    path: "/manage/update-post",
    layout: "dashboard",
  },
  {
    element: PostAddCatagory,
    path: "/manage/add-catagory",
    layout: "dashboard",
  },
  {
    element: PostUpdateCatagory,
    path: "/manage/update-catagory",
    layout: "dashboard",
  },
  {
    element: PostAddUser,
    path: "/manage/add-user",
    layout: "dashboard",
  },
  {
    element: PostUpdateUser,
    path: "/manage/update-user",
    layout: "dashboard",
  },
  {
    element: PostDetailsPage,
    path: "/:slug",
  },
];

const publicRoute = [];
export { privaryRoute, publicRoute };
