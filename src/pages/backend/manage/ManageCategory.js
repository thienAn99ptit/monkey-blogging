import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteAction from "../../../components/actions/DeleteAction";
import EditAction from "../../../components/actions/EditAction";
import ViewAction from "../../../components/actions/ViewAction";
import { Button } from "../../../components/button";
import DashboardHeading from "../../../components/dashboardHeading/DashboardHeading";
import Table from "../../../components/table/Table";
import { db } from "../../../firebase/firebase-config";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const naviagate = useNavigate();
  useEffect(() => {
    const categoriesRef = collection(db, "categories");
    onSnapshot(categoriesRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories([...result]);
      });
    });
  }, []);
  const handleDeleteCategory = async (id) => {
    console.log({ id });
    const colRef = doc(db, "categories", id);
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
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <NavLink
          type="button"
          className="py-2 px-4 rounded-lg bg-green-400 text-white"
          to="/manage/add-catagory"
        >
          Create new
        </NavLink>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <span className="italic text-gray-400">
                      {category.slug}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`font-bold p-2 text-sm   rounded-md  ${
                        Number(category.status) === 1
                          ? "text-green-400  bg-green-100"
                          : "text-orange-500  bg-orange-100"
                      } `}
                    >
                      {Number(category.status) === 1
                        ? "Approved"
                        : "Unapproved"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-x-2">
                      <ViewAction></ViewAction>
                      <EditAction
                        onClick={() =>
                          naviagate(`/manage/update-catagory?id=${category.id}`)
                        }
                      ></EditAction>
                      <DeleteAction
                        onClick={() => handleDeleteCategory(category.id)}
                      ></DeleteAction>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {/* <div className="mt-10">
          <button className="py-2 px-4 rounded-lg bg-red-400 text-white">
            Load more
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ManageCategory;
