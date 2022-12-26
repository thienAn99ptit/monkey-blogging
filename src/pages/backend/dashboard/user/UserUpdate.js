import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useAuth } from "../../../../contexts/auth-context";
import { auth, db } from "../../../../firebase/firebase-config";
import useFirebaseImage from "../../../../hooks/useFirebaseImage";
import { userStatus, userRole } from "../../../../utils/constants";

function UserUpdate() {
  const { userInfor } = useAuth();
  const [imageUser, setImageUser] = useState("");
  const [param] = useSearchParams();
  // const idParam = param.get("id");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  const deleteimage = async () => {
    await setDoc(doc(db, "users", userInfor?.uid), {
      avatar: "",
      image_url: "",
    });
  };
  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues, "avatar", deleteimage);
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    console.log({ cloneValues });
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: cloneValues.fullname,
        email: cloneValues.email,
      });
      await setDoc(doc(db, "users", userInfor?.uid), {
        ...cloneValues,
        username: slugify(values.username || values.fullname, { lower: true }),
      });
      toast.success("Create new user success !!!");
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const watchStatus = watch("status");
  const watchRole = watch("role");
  useEffect(() => {
    setImage(imageUser);
  }, [imageUser, setImage]);
  useEffect(() => {
    async function getuser() {
      const colRef = doc(db, "users", userInfor?.uid);
      const snap = await getDoc(colRef);
      reset({
        status: 1,
        role: 3,
        ...snap.data(),
      });
      setImageUser(snap.data()?.image_url || "");
    }
    getuser();
  }, [userInfor]);
  const valueFullname = getValues("fullname", "username");
  if (!valueFullname) return null;
  return (
    <div>
      <DashboardHeading
        title="Update User"
        desc="Manage your user"
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateUser)}>
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
          Update User
        </Button>
      </form>
    </div>
  );
}

export default UserUpdate;
