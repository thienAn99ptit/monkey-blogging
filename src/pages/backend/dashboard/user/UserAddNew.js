import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { Button } from "../../../../components/button";
import Radio from "../../../../components/checkbox/Radio";
import DashboardHeading from "../../../../components/dashboardHeading/DashboardHeading";
import { Field } from "../../../../components/field";
import FieldCheckboxes from "../../../../components/field/FieldCheckboxes";
import { Input } from "../../../../components/input";
import InputPasswordToggle from "../../../../components/input/InputPasswordToggle";
import { Label } from "../../../../components/label";
import Textarea from "../../../../components/textarea/Textarea";
import UploadImage from "../../../../components/uploadImage/UploadImage";
import { auth, db } from "../../../../firebase/firebase-config";
import useFirebaseImage from "../../../../hooks/useFirebaseImage";
import { userStatus, userRole } from "../../../../utils/constants";

function UserAddNew() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
      description: "",
      status: 1,
      role: 3,
    },
  });
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    setImage,
    setProgress,
  } = useFirebaseImage(setValue, getValues, "avatar");
  const handleAddUser = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    const colRef = collection(db, "users");
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        cloneValues.email,
        cloneValues.password
      );
      await updateProfile(auth.currentUser, {
        displayName: cloneValues.fullname,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        ...cloneValues,
        username: slugify(values.fullname, { lower: true }),
        createAdd: serverTimestamp(),
      });
      toast.success("Create new user success !!!");
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        avatar: "",
        description: "",
        status: 1,
        role: 3,
      });
      setImage("");
      setProgress(0);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  return (
    <div>
      <DashboardHeading
        title="Add User"
        desc="Manage your user"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <UploadImage
            onChange={handleSelectImage}
            handleDeteleImage={handleDeleteImage}
            name="avatar"
            progress={progress}
            image={image}
          ></UploadImage>
        </div>
        <div className="form-layout grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your full name"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your user name"
            ></Input>
          </Field>
        </div>
        <div className="form-layout grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter your email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              control={control}
              name="password"
              placeholder="Enter your password"
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout grid grid-cols-2 gap-x-4 mb-10">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                onClick={() => setValue("status", userStatus.ACTIVE)}
                value={userStatus.ACTIVE}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                onClick={() => setValue("status", userStatus.PENDING)}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BANNED}
                onClick={() => setValue("status", userStatus.BANNED)}
                value={userStatus.BANNED}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                onClick={() => setValue("role", userRole.ADMIN)}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MODERATOR}
                onClick={() => setValue("role", userRole.MODERATOR)}
                value={userRole.MODERATOR}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                onClick={() => setValue("role", userRole.USER)}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout grid  gap-x-4 mb-10">
          <Field>
            <Label>Description</Label>
            <Textarea
              control={control}
              name="description"
              placeholder="Enter your description"
            ></Textarea>
          </Field>
        </div>
        <Button type="submit" isLoading={loading}>
          Add New User
        </Button>
      </form>
    </div>
  );
}

export default UserAddNew;
