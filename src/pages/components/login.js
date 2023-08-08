import { authorizationUserLogin } from "@/api/users/user";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import swal from "sweetalert";
import { setCookieLogin } from "../lib/auth";

export default function LoginAccountForm() {
  // validation start
  const validationSchema = Yup.object().shape({
    identifier: Yup.string().required("Email or Username is Required"),
    password: Yup.string().required("Password is Required"),
  });
  // validation end

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get function to build form with useform() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    authorizationUserLogin(data).then(function (result) {
      if (result.status == 200) {
        swal("Success", "Save Success", "success");
        // set cookie
        setCookieLogin(result.jwt);

        // redirect
        setTimeout(() => {
          window.location = `/${result.username}`;
        }, 2000);
      } else if (result.status == 400) {
        swal("Failed", "Login unsuccessfully", "error");
      } else {
        swal("Failed", "Login unsuccessfully", "error");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4">Please login to your account</p>
      {/* username/email input */}
      <div className="relative mb-4" data-te-input-wrapper-init>
        <input
          type="text"
          name="identifier"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="ilmLoginFormControlInputEmail"
          placeholder="Username Or Email"
          {...register("identifier")}
        />
        <label
          htmlFor="ilmLoginFormControlInputEmail"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          Username or Email
        </label>
        {/* error alert start */}
        <div className="invalid-feedback text-red-500 text-sm">
          {errors.identifier?.message}
        </div>
        {/* error alert end */}
      </div>

      {/* password input */}
      <div className="relative mb-4" data-te-input-wrapper-init>
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
        <div className="invalid-feedback text-red-500 text-sm">
          {errors.password?.message}
        </div>
        {/* error alert end */}
      </div>

      {/* Submit button */}
      <div className="mb-12 pb-1 pt-1 text-center">
        <button
          className="background-button mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          type="submit"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Login
        </button>

        {/* forgot password link */}
        {/* <a href="#">Forgot password?</a> */}
      </div>

      {/* Register button */}
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Don`t have an account?</p>
        <Link
          type="button"
          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
          data-te-ripple-color="light"
          href="/sign-up"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
