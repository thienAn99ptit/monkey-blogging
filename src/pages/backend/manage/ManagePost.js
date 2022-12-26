import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteAction from "../../../components/actions/DeleteAction";
import EditAction from "../../../components/actions/EditAction";
import ViewAction from "../../../components/actions/ViewAction";
import DashboardHeading from "../../../components/dashboardHeading/DashboardHeading";
import Table from "../../../components/table/Table";
import { db } from "../../../firebase/firebase-config";

function ManagePost() {
  const [posts, setPosts] = useState([]);
  console.log({ posts });
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach(async (val) => {
        const cateRef = await doc(db, "categories", val.data().categoryId);
        const authRef = doc(db, "users", val.data().userId);
        const cateSnap = await getDoc(cateRef);
        const authSnap = await getDoc(authRef);

        result.push({
          id: val.id,
          ...val.data(),
          categoryId: cateSnap.data()?.name || "",
          userId: authSnap.data()?.fullname || "",
        });
        setPosts([...result]);
      });
    });
  }, []);
  const handleDeletePost = async (post) => {
    const colRef = doc(db, "posts", post.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <DashboardHeading
        title="Manage Post"
        desc="Manage your post"
      ></DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Infor</th>
            <th>Category</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post, index) => (
              <tr key={post.id}>
                <td title={post.id}>{post.id.slice(0, 4) + "..."}</td>
                <td title={post.title}>
                  <div className="flex gap-x-2 items-center">
                    <img
                      src={`${post.image_url || "/avatar.jpg"}`}
                      alt=""
                      className="w-[40px] rounded-md shadow-md  object-cover "
                    />
                    <div className="flex-1">
                      <h3 className="text-md text-gray-800 font-semibold ">
                        {post.title.slice(0, 6) + "..."}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium ">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{post.categoryId}</td>
                <td>
                  <p className="w-max">{post.userId}</p>
                </td>
                <td>
                  <div className="flex gap-x-2 ">
                    <ViewAction
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ViewAction>
                    <EditAction
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    ></EditAction>
                    <DeleteAction
                      onClick={() => handleDeletePost(post)}
                    ></DeleteAction>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManagePost;
