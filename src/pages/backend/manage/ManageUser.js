import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import DashboardHeading from "../../../components/dashboardHeading/DashboardHeading";
import Table from "../../../components/table/Table";
import { db } from "../../../firebase/firebase-config";
import DeleteAction from "../../../components/actions/DeleteAction";
import EditAction from "../../../components/actions/EditAction";
import ViewAction from "../../../components/actions/ViewAction";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { async } from "@firebase/util";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setUsers([...result]);
      });
    });
  }, []);
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
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
        title="Manage User"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <NavLink
          className="py-2 px-4 rounded-lg bg-green-400 text-white"
          to="/manage/add-user"
        >
          Create new user
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Infor</th>
            <th>User name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 4) + "..."}</td>
                <td>
                  <div className="flex gap-x-2 items-center w-max">
                    <img
                      src={`${user.image_url || "/avatar.jpg"}`}
                      alt=""
                      className="w-10 h-10 object-cover "
                    />
                    <div className="flex-1">
                      <h3
                        title={user.id}
                        className="text-sm text-gray-400 font-medium "
                      >
                        {user.fullname}
                      </h3>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="w-max">{user.username}</p>
                </td>
                <td>{user.email.slice(0, 5) + "..."}</td>
                <td></td>
                <td></td>
                <td>
                  <div className="flex gap-x-2 ">
                    <ViewAction></ViewAction>
                    <EditAction
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    ></EditAction>
                    <DeleteAction
                      onClick={() => handleDeleteUser(user)}
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

export default ManageUser;
