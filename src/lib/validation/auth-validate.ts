import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is Required")
    .email("Invalid Email"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});

export const signupSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  username: string({ required_error: "Username is required" }).min(
    3,
    "Username id required"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is Required")
    .email("Invalid Email"),
  password: string({ required_error: "Password is required" }).min(
    4,
    "Password is required"
  ),
  dateOfBirth: string({ required_error: "Date of Birth" })
    .min(1, { message: "Date of Birth Required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid Date Format",
    }),
});
