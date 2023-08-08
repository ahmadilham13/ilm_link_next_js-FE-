import { Inter } from "next/font/google";
import { getAllUsers, getUser } from "@/api/users/user";
import Navbar from "../navbar";
import { getAllLinks, updateLinkUser } from "@/api/links/links";
import { useForm } from "react-hook-form";
import Image from "next/image";
import swal from "sweetalert";
import { getAllMedia, uploadMedia } from "@/api/media/media";

const inter = Inter({ subsets: ["latin"] });

export default function MyLink(data) {
  const { register, handleSubmit, reset, formState } = useForm();

  function onSubmit(userData) {
    const userId = data.data.id;

    // set media to backend
    const photoSelect = document.querySelector("#imageChoose").files[0];
    if (photoSelect != null) {
      uploadMedia(photoSelect).then(function (result) {
        if (result.status == 200) {
          userData.photo = result.id;
          updateLinkUser(userId, userData).then(function (result) {
            if (result.status == 200) {
              swal("Success", "Update Links Successfully", "success");

              // redirect
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else if (result.status == 400) {
              swal("Failed", "Login unsuccessfully", "error");
            } else {
              swal("Failed", "Login unsuccessfully", "error");
            }
          });
        }
      });
    } else {
      updateLinkUser(userId, userData).then(function (result) {
        if (result.status == 200) {
          swal("Success", "Update Links Successfully", "success");

          // redirect
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (result.status == 400) {
          swal("Failed", "Login unsuccessfully", "error");
        } else {
          swal("Failed", "Login unsuccessfully", "error");
        }
      });
    }
  }
  return (
    <div>
      <Navbar username={data.data.username} />
      <main
        className={`flex min-h-screen max-w-3xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
      >
        <div className="w-full">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-neutral-800"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="flex flex-col items-center gap-2 w-full mb-10">
              <h1 className="text-3xl font-bold uppercase">Settings</h1>
            </div>
            {/* First Name */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-5">First Name</label>
                  <div>
                    <div className="flex items-center ml-6 mb-5 w-full">
                      <input
                        type="text"
                        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="First Name"
                        defaultValue={data.data.firstname}
                        {...register("firstname")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Last Name */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-5">Last Name</label>
                  <div>
                    <div className="flex items-center ml-6 mb-5 w-full">
                      <input
                        type="text"
                        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="Last Name"
                        defaultValue={data.data.lastname}
                        {...register("lastname")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Username */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-5">Username</label>
                  <div>
                    <div className="flex items-center ml-7 mb-5 w-full">
                      <input
                        type="text"
                        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="Username"
                        defaultValue={data.data.username}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-10">Email</label>
                  <div>
                    <div className="flex items-center ml-10 mb-5 w-full">
                      <input
                        type="email"
                        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="Email"
                        defaultValue={data.data.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Profile */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-10">Photo</label>
                  <div>
                    <div className="ml-[50px] relative w-[75px] h-[75px] rounded-full overflow-hidden mb-5">
                      {data.data.photo && (
                        <Image
                          className="relative"
                          layout="fill"
                          objectFit="cover"
                          src={`${process.env.NEXT_PUBLIC_ASSET_URL}${data.data.photo.url}`}
                          alt="ilm-link"
                        />
                      )}

                      {!data.data.photo && (
                        <Image
                          className="relative"
                          layout="fill"
                          objectFit="cover"
                          src="/user.png"
                          alt={data.username}
                        />
                      )}
                    </div>
                    <div className="flex items-center ml-10 mb-5 w-full">
                      <input
                        type="file"
                        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="photo"
                        defaultValue={data.data.photo}
                        id="imageChoose"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bio */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-[60px]">Bio</label>
                  <div>
                    <div className="flex items-center ml-10 mb-5 w-full">
                      <textarea
                        name="bio"
                        id="ilmLoginFormControlTextareaBio"
                        className="min-h-[100px] peer block min-h-[auto] w-full resize-none rounded border-[0.5px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200"
                        placeholder="Bio"
                        {...register("bio")}
                        defaultValue={data.data.bio}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Link Ready */}
            <div className="mb-4">
              <div className="items-center mb-4">
                <div className="flex">
                  <label className="mr-10">Links Ready</label>
                  <div>
                    {data.linkData.data.map((value, index) => {
                      const userPermission =
                        value.attributes.users_permissions_user.data;
                      let defaultChecked = "";
                      if (userPermission != null) {
                        const username = userPermission.attributes.username;
                        if (username == data.data.username) {
                          defaultChecked = "defaultChecked";
                        }
                      }
                      return (
                        <div key={index} className="flex items-center mb-5">
                          <input
                            {...{ defaultChecked }}
                            id="checked-checkbox"
                            type="checkbox"
                            value={value.id}
                            name="links"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            {...register("links")}
                          />
                          <label
                            htmlFor="checked-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {value.attributes.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const users = await getAllUsers();
  const dataUsers = await users.data;

  const paths = dataUsers.map((value) => {
    return {
      params: { username: value.username },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const selectedAccount = await getUser(params.username);
  const allLinks = await getAllLinks();
  return {
    props: {
      data: selectedAccount.data[0],
      linkData: allLinks.data,
    },
    revalidate: 10,
  };
}
