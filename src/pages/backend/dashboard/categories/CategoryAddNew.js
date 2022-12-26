import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../../components/field";
import { Input } from "../../../../components/input";
import { Label } from "../../../../components/label";
import Radio from "../../../../components/checkbox/Radio";
import { Button } from "../../../../components/button";
import DashboardHeading from "../../../../components/dashboardHeading/DashboardHeading";
import FieldCheckboxes from "../../../../components/field/FieldCheckboxes";
import { useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

const CategoryAddNew = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createAdd: new Date(),
    },
  });
  const watchStatus = watch("status");
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    setLoading(true);
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.name, { lower: true });
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        createAdd: serverTimestamp(),
      });
      toast.success("Creat new category success !!!");
      reset({
        name: "",
        slug: "",
        status: 1,
        createAdd: new Date(),
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                onClick={() => setValue("status", 1)}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 2}
                onClick={() => setValue("status", 2)}
                value={2}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" className="mx-auto" isLoading={loading}>
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
