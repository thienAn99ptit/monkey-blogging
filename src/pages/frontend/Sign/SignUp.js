import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../../firebase/firebase-config";
import Image from "../../../components/image/Image";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import { Field } from "../../../components/field";
import { Button } from "../../../components/button";
import { toast } from "react-toastify";
import { flip } from "lodash";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputPasswordToggle from "../../../components/input/InputPasswordToggle";
import slugify from "slugify";

const schema = yup.object({
  fullname: yup.string().required("Please enter your full name"),
  email: yup.string().email("Please enter your email"),
  password: yup
    .string()
    .min(6, "Please 6 character")
    .required("Please enter your password"),
});

function SignUp() {
  const navigate = useNavigate();

  const [togglePassword, setTogglePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  // Handle Sign Up
  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    toast.success("Create User success !!!");
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      createAdd: serverTimestamp(),
    });
    navigate("/");
  };
  useEffect(() => {
    const errorArray = Object.values(errors);
    if (errorArray.length > 0) {
      toast(errorArray[0]?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "error",
      });
    }
  }, [errors]);

  return (
    <form className="form" onSubmit={handleSubmit(handleSignUp)}>
      <Field>
        <Label htmlFor="fullname" className="label">
          Fullname
        </Label>
        <Input
          control={control}
          name="fullname"
          type="text"
          className="input"
          placeholder="Please enter your fullname"
        />
      </Field>
      <Field>
        <Label htmlFor="email" className="label">
          Email address
        </Label>
        <Input
          control={control}
          name="email"
          type="email"
          className="input"
          placeholder="Please enter your email address"
        />
      </Field>
      <Field>
        <Label htmlFor="password" className="label">
          Password
        </Label>
        <InputPasswordToggle control={control}></InputPasswordToggle>
      </Field>
      <div className="have-account">
        You have already account ? <NavLink to="/sign-in">Login</NavLink>
      </div>
      <div className="button">
        <Button type="submit" isLoading={isSubmitting}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
