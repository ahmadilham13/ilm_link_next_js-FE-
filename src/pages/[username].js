import { getAllUsers, getUser } from "@/api/users/user";
import { Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export default function SlugPage({ data }) {
  return (
    <div>
      <Navbar username={data.username} />
      <main
        className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24`}
      >
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-5">
          {data.photo && (
            <Image
              className="relative"
              layout="fill"
              objectFit="cover"
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}${data.photo.url}`}
              alt={data.username}
            />
          )}
          {!data.photo && (
            <Image
              className="relative"
              layout="fill"
              objectFit="cover"
              src="/user.png"
              alt={data.username}
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-2 w-full mb-12">
          <h3 className="text-2xl font-bold">
            {data.firstname} {data.lastname}
          </h3>
          <p className="text-lg">{data.bio && data.bio}</p>
        </div>

        <div className="flex flex-col items-center gap-8 w-full">
          {data.links.map((value, index) => {
            return (
              <a
                key={index}
                className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {value.title}
              </a>
            );
          })}
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

  return {
    props: {
      data: selectedAccount.data[0],
    },
    revalidate: 10,
  };
}
