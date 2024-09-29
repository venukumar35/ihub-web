import { Button, Modal, PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";
import provider from "../network/apiProvider";
import { useEffect, useState } from "react";
import commonStore, {
  countryResponseSchema,
  countrySateResponseSchema,
} from "./common_store/commonStore";
import React from "react";
//Zod validation for inputs
const createUserValidation = z.object({
  name: z
    .string()
    .min(2, { message: "User name should contain minimum 2 characters" })
    .max(25, {
      message: "User name should not contain more than 25 characters",
    })
    .regex(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, {
      message: "User name should not contain special characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "User name should not start or end with a space",
    })
    .refine((val) => !/ /.test(val), {
      message: "User name should not contain consecutive spaces",
    }),
  email: z
    .string()
    .min(2, { message: "Enter email address" })
    .email({ message: "Invalid email address" }),
  mobile: z
    .string()
    .regex(/^(?=.{7,15}$).*/, { message: "Invalid mobile number" })
    .refine((value) => value.length > 1, { message: "Enter mobile number" }),

  // Empty string for no error message because the error message is
  // handled in the custom input component. This validation is only for the
  // invalid password field.
  password: z
    .string()
    .min(8, { message: "Password should contain minimum 8 characters" })
    .max(16, {
      message: "Password should not contain more than 16 characters",
    })
    .refine((value) => !/['";]/.test(value) && !/--/.test(value), {
      message: 'Password must not contain the characters: {\'", ", ;, --}',
    }),
});

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const { countryData, stateData, country, state, setCountryId } =
    commonStore();
  const [opened, { open, close }] = useDisclosure(false);

  // Initialize the form with useForm hook and validating
  const form = useForm({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
      stateId: "",
      doorNumber: "",
      streetName: "",
      pincode: "",
    },
    // Set up validation using Zod schema resolver
    validate: zodResolver(createUserValidation),
    validateInputOnChange: true,
  });
  //Api call for creating user
  async function onSubmit(values: typeof form.values) {
    setLoading(true);
    const data = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      stateId: Number(values.stateId),
      doorNumber: values.doorNumber,
      streetName: values.streetName,
      pincode: values.pincode,
    };
    const response = await provider.AddUser(data);
    if (response.status) {
      form.reset();
      close();
    }
    setLoading(false);
  }
  const handleState = async (value: any) => {
    setCountryId(+value);
    state();
  };
  useEffect(() => {
    country();
  }, [opened]);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={<div className="font-bold">Add User</div>}
        size={"50%"}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <div className="flex text-slate-500 flex-col space-y-4">
            <div className="flex space-x-2 w-full">
              <TextInput
                {...form.getInputProps("name")}
                label="User Name"
                placeholder="Enter user name"
                withAsterisk
                className="w-1/2"
              />
              <TextInput
                {...form.getInputProps("email")}
                label="Email"
                placeholder="Enter email"
                withAsterisk
                className="w-1/2"
              />
            </div>
            <div className="flex space-x-2 w-full">
              <TextInput
                {...form.getInputProps("mobile")}
                className="w-1/2"
                type="number"
                label="Mobile"
                placeholder="Enter mobile number"
                withAsterisk
              />
              <PasswordInput
                className="w-1/2"
                {...form.getInputProps("password")}
                withAsterisk
                label="Password"
                placeholder="Enter password"
              />
            </div>
            <div className="flex space-x-2 w-full">
              <Select
                label="Select country"
                placeholder="Select country"
                data={countryData?.data?.map((e: countryResponseSchema) => ({
                  label: e.name,
                  value: e.id.toString(),
                }))}
                clearable
                searchable
                onChange={handleState}
                className="w-1/2"
              />
              <Select
                {...form.getInputProps("stateId")}
                label="Select state"
                placeholder="Select state"
                data={stateData?.data?.map((e: countrySateResponseSchema) => ({
                  label: e.name,
                  value: e.id.toString(),
                }))}
                clearable
                searchable
                className="w-1/2"
              />
            </div>
            <div className="flex space-x-2 w-full">
              <TextInput
                {...form.getInputProps("doorNumber")}
                label="Door number"
                placeholder="Enter Door number"
                withAsterisk
                className="w-1/2"
              />
              <TextInput
                {...form.getInputProps("streetName")}
                label="Street name"
                placeholder="Enter Street name"
                withAsterisk
                className="w-1/2"
              />
            </div>
            <div>
              <TextInput
                {...form.getInputProps("pincode")}
                type="number"
                label="Pincode"
                placeholder="Enter Pincode"
                withAsterisk
                className="w-1/2"
              />
            </div>
          </div>
          <div className="mt-8">
            <Button type="submit" className="w-full" loading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>

      <div onClick={open} className="text-black">
        Create a account
      </div>
    </div>
  );
}
