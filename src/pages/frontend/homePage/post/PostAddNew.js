import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ImageUploader from "quill-image-uploader";

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
import { db } from "../../../../firebase/firebase-config";
import Select from "../../../../components/dropdown/Select";
import WrapOption from "../../../../components/dropdown/WrapOption";
import { useAuth } from "../../../../contexts/auth-context";
Quill.register("modules/imageUploader", ImageUploader);

const PostAddNew = () => {
  const [valueContent, setValueContent] = useState("");
  const [categories, setCategories] = useState([]);
  const { userInfor } = useAuth();
  const [placeholderDropDown, setPlaceholderDropDown] = useState("");
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
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
      content: "",
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

  const handleAddPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.content = valueContent;
    cloneValues.createAdd = serverTimestamp();
    if (values.slug === "") {
      cloneValues.slug = slugify(values.title, { lower: true });
    } else {
      cloneValues.slug = slugify(values.slug, { lower: true });
    }

    cloneValues.status = Number(values.status);
    cloneValues.userId = userInfor.uid;

    const colRef = collection(db, "posts");
    const docRef = await addDoc(colRef, {
      ...cloneValues,
      createAdd: serverTimestamp(),
    });
    toast.success("Create new post success !!!");
    reset({
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image_url: "",
      image_name: "",
      userId: "",
    });
    setPlaceholderDropDown("");
    setImage("");
    setProgress(0);
    setValueContent("");
  };
  const watchStatus = watch("status");
  const watchHot = watch("hot");

  // const watchCategory = watch("category");
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    setImage,
    setProgress,
  } = useFirebaseImage(setValue, getValues);

  useEffect(() => {
    document.title = "Monkey Blogging ~ Add new post";
    const getCategories = async () => {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories([...result]);
      setValueContent("");
    };
    getCategories();
  }, []);
  return (
    <div>
      <h1 className="dashboard-heading ">Add new post</h1>
      <form onSubmit={handleSubmit(handleAddPost)}>
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
        <div className="mb-10 relative">
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
        <Button type="submit" className="mx-auto" isLoading={isSubmitting}>
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
