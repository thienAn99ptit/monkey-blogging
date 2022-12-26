/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import { useAuth } from "../../../contexts/auth-context";
import { Button } from "../../../components/button";
import { auth, db } from "../../../firebase/firebase-config";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import InputPasswordToggle from "../../../components/input/InputPasswordToggle";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

const schema = yup.object({
  email: yup.string().email("Please enter your email"),
  password: yup
    .string()
    .min(6, "Please 6 character")
    .required("Please enter your password"),
});

function SignIn() {
  const { userInfor } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  // Handle Sign In
  const handleSignIn = async (values) => {
    if (!isValid) return;

    const signIn = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log({ signIn });
    navigate("/");
  };
  useEffect(() => {
    const auth = getAuth();
    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //   });
    if (userInfor?.email) navigate("/");
  }, []);
  return (
    <form className="form" onSubmit={handleSubmit(handleSignIn)}>
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

      <div className="button">
        <Button type="submit" isLoading={isSubmitting}>
          Sign In
        </Button>
      </div>
    </form>
  );
}

export default SignIn;
