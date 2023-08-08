import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <main
        className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
      >
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-5">
          <Image
            className="relative"
            layout="fill"
            objectFit="cover"
            src="/icon-home.jpg"
            alt="ilm-link"
          />
        </div>
        <div className="flex flex-col items-center gap-2 w-full mb-1">
          <h1 className="text-3xl font-bold">WELCOME</h1>
          <p className="text-lg">TO</p>
          <h2 className="text-2xl font-bold">ILM Link</h2>
        </div>
        <div className="text-center mb-5 text-sm">
          <p className="flex flex-col mt-4 mb-5">
            Support by <a className="font-bold">Kang Dea Afrizal and Team</a>
          </p>
        </div>
        <div className="flex items-center gap-8 w-full">
          <Link
            className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 text-center rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
            href="/login"
          >
            <p>Login</p>
          </Link>
          <Link
            className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 text-center rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
            href="/sign-up"
          >
            <p>Sign Up</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
