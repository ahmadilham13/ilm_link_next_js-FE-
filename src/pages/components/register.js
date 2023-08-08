import { createUser } from "@/api/users/user";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import swal from "sweetalert";
import { uploadMedia } from "@/api/media/media";

export default function RegisterAccountForm() {
  // validation start
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    username: Yup.string().required("Username is Required"),
    email: Yup.string().required("Email is Required").email("Email is Invalid"),
    password: Yup.string()
      .min(6, "password must be at least 6 characters")
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords not match")
      .required("Confirm Password is required"),
  });
  // validation end

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get function to build form with useform() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // handles the submit event on form submit
  function onSubmit(data) {
    // image profile
    const photoSelect = document.querySelector(
      "#ilmLoginFormControlInputImageProfile"
    ).files[0];

    if (photoSelect != null) {
      uploadMedia(photoSelect).then(function (result) {
        if (result.status == 200) {
          data.photo = result.id;
          // request data to backend
          createUser(data).then(function (result) {
            if (result.status == 200) {
              swal("Success", "Save Success", "success");

              // redirect
              setTimeout(() => {
                window.location = "/login";
              }, 2000);
            } else if (result.status == 400) {
              swal("Failed", "Create Account unsuccessfully", "error");
            } else {
              swal("Failed", "Create Account unsuccessfully", "error");
            }
          });
        }
      });
    } else {
      // request data to backend
      createUser(data).then(function (result) {
        if (result.status == 200) {
          swal("Success", "Save Success", "success");

          // redirect
          setTimeout(() => {
            window.location = "/login";
          }, 2000);
        } else if (result.status == 400) {
          swal("Failed", "Create Account unsuccessfully", "error");
        } else {
          swal("Failed", "Create Account unsuccessfully", "error");
        }
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <p className="mb-4">Please Register your new account</p>
        <div className="flex mb-6 mt-6">
          {/* First Name */}
          <div className="relative mb-4" data-te-input-wrapper-init>
            <input
              type="text"
              name="firstname"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                errors.firstname ? "is-invalid" : ""
              }`}
              id="ilmLoginFormControlInputFirstName"
              placeholder="First Name"
              {...register("firstname")}
            />
            <label
              htmlFor="ilmLoginFormControlInputFirstName"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              First Name
            </label>
            {/* error alert start */}
            <div className="invalid-feedback text-red-500 text-sm">
              {errors.firstname?.message}
            </div>
            {/* error alert end */}
          </div>
          {/* Last Name */}
          <div className="relative mb-4" data-te-input-wrapper-init>
            <input
              type="text"
              name="lastname"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                errors.lastname ? "is-invalid" : ""
              }`}
              id="ilmLoginFormControlInputLastName"
              placeholder="Last Name"
              {...register("lastname")}
            />
            <label
              htmlFor="ilmLoginFormControlInputLastName"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Last Name
            </label>
            {/* error alert start */}
            <div className="invalid-feedback text-red-500 text-sm">
              {errors.lastname?.message}
            </div>
            {/* error alert end */}
          </div>
        </div>
        {/* username input */}
        <div className="relative mb-6 mt-6" data-te-input-wrapper-init>
          <input
            type="text"
            name="username"
            className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
              errors.username ? "is-invalid" : ""
            }`}
            id="ilmLoginFormControlInputUsername"
            placeholder="Username"
            {...register("username")}
          />
          <label
            htmlFor="ilmLoginFormControlInputUsername"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            UserName
          </label>
          {/* error alert start */}
          <div className="invalid-feedback text-red-500">
            {errors.username?.message}
          </div>
          {/* error alert end */}
        </div>

        {/* email input */}
        <div className="relative mb-6 mt-6" data-te-input-wrapper-init>
          <input
            type="text"
            name="email"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="ilmLoginFormControlInputEmail"
            placeholder="Email"
            {...register("email")}
          />
          <label
            htmlFor="ilmLoginFormControlInputEmail"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Email
          </label>
          {/* error alert start */}
          <div className="invalid-feedback text-red-500">
            {errors.email?.message}
          </div>
          {/* error alert end */}
        </div>

        {/* password input */}
        <div className="relative mb-6 mt-6" data-te-input-wrapper-init>
          <input
            type="password"
            name="password"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="ilmLoginFormControlInputPassword"
            placeholder="Password"
            {...register("password")}
          />
          <label
            htmlFor="ilmLoginFormControlInputPassword"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Password
          </label>
          {/* error alert start */}
          <div className="invalid-feedback text-red-500">
            {errors.password?.message}
          </div>
          {/* error alert end */}
        </div>

        {/* confirm password input */}
        <div className="relative mb-6 mt-6" data-te-input-wrapper-init>
          <input
            type="password"
            name="confirm_password"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="ilmLoginFormControlInputConfirmPassword"
            placeholder="Password"
            {...register("confirmPassword")}
          />
          <label
            htmlFor="ilmLoginFormControlInputConfirmPassword"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Confirm Password
          </label>
          {/* error alert start */}
          <div className="invalid-feedback text-red-500">
            {errors.confirmPassword?.message}
          </div>
          {/* error alert end */}
        </div>

        {/* Image Profile */}
        <div className="relative mb-4 mt-[50px]" data-te-input-wrapper-init>
          <label
            htmlFor="ilmLoginFormControlInputImageProfile"
            className="absolute left-3 bottom-9 mb-2 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Image Profile
          </label>
          <input
            type="file"
            name="image_profile"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="ilmLoginFormControlInputImageProfile"
          />
        </div>

        {/* Bio */}
        <div className="relative mb-4 mt-[50px]" data-te-input-wrapper-init>
          <textarea
            name="bio"
            id="ilmLoginFormControlTextareaBio"
            className="min-h-[100px] peer block min-h-[auto] w-full resize-none rounded border-[0.5px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200"
            placeholder="Bio"
            {...register("bio")}
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="mb-12 pb-1 pt-1 text-center">
          <button
            className="background-button mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="submit"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Register
          </button>
        </div>

        {/* Login button */}
        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Already have an account?</p>
          <Link
            type="button"
            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            data-te-ripple-color="light"
            href="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
