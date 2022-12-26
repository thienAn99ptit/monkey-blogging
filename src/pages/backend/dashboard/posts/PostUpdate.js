import React from "react";
import ReactQuill, { Quill } from "react-quill";

import { useForm } from "react-hook-form";
import slugify from "slugify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";

import { Button } from "../../../../components/button";
import Radio from "../../../../components/checkbox/Radio";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Option from "../../../../components/dropdown/Option";
import { Field } from "../../../../components/field";
import { Input } from "../../../../components/input";
import { Label } from "../../../../components/label";
import { postStatus } from "../../../../utils/constants";
import UploadImage from "../../../../components/uploadImage/UploadImage";
import useFirebaseImage from "../../../../hooks/useFirebaseImage";
import Toggle from "../../../../components/toogle/Toogle";
import { useEffect } from "react";
import { db } from "../../../../firebase/firebase-config";
import { useState } from "react";
import Select from "../../../../components/dropdown/Select";
import WrapOption from "../../../../components/dropdown/WrapOption";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const idParam = param.get("id");
  const [valueContent, setValueContent] = useState("");

  const [categories, setCategories] = useState([]);
  const [imageUser, setImageUser] = useState("");
  const [idCate, setIdcate] = useState("");
  const [post, setPost] = useState({});

  const [placeholderDropDown, setPlaceholderDropDown] = useState("");
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image_url: "",
      image_name: "",
      userId: "",
    },
  });
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
    ],
    // imageUploader: {
    //   upload: (file) => {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve("https://source.unsplash.com/FV3GConVSss/900x500");
    //       }, 3500);
    //     });
    //   },
    // },
  };
  const deleteimage = async () => {
    await setDoc(doc(db, "posts", idParam), {
      ...post,
      image_name: "",
      image_url: "",
    });
  };

  const handleUpdatePost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.content = valueContent;
    cloneValues.slug = slugify(values.slug || values.slug, { lower: true });
    cloneValues.status = Number(values.status);

    await setDoc(doc(db, "posts", idParam), {
      ...cloneValues,
    });

    toast.success("Update post success !!!");
    navigate("/manage/post");
  };
  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues, "image_name", deleteimage);
  useEffect(() => {
    setImage(imageUser);
  }, [imageUser, setImage]);
  useEffect(() => {
    async function getuser() {
      const colRef = doc(db, "posts", idParam);
      const snap = await getDoc(colRef);
      if (snap.data()) {
        reset({
          ...snap.data(),
        });
        setValueContent(snap.data()?.content || "");
        setPost({ ...snap.data() });
        setIdcate(snap.data()?.categoryId || "");
        setImageUser(snap.data()?.image_url || "");
      }
    }
    getuser();
  }, []);

  useEffect(() => {
    document.title = "Monkey Blogging ~ Add new post";
    const getCategories = async () => {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        if (doc.id == idCate) {
          setPlaceholderDropDown(doc.data().name);
        }
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories([...result]);
    };
    getCategories();
  }, [idCate]);
  return (
    <div>
      <h1 className="dashboard-heading ">Update post</h1>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <UploadImage
              type="file"
              name="image"
              image={image}
              progress={progress}
              id=""
              onChange={handleSelectImage}
              handleDeteleImage={handleDeleteImage}
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select
                placeholder={placeholderDropDown || "Please select an option"}
              ></Select>
              <WrapOption>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Option
                      key={category.id}
                      onClick={() => {
                        setValue("categoryId", category.id);
                        setPlaceholderDropDown(category.name);
                      }}
                    >
                      {category.name}
                    </Option>
                  ))}
              </WrapOption>
            </Dropdown>
          </Field>
        </div>
        <div>
          <Field>
            <Label>Content</Label>
            <ReactQuill
              modules={modules}
              name="content"
              className="w-full"
              theme="snow"
              value={valueContent}
              onChange={setValueContent}
              placeholder="Add a description of your event"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPRROVED}
                onClick={() => setValue("status", postStatus.APPRROVED)}
                value={postStatus.APPRROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                onClick={() => setValue("status", postStatus.PENDING)}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECT}
                onClick={() => setValue("status", postStatus.REJECT)}
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
