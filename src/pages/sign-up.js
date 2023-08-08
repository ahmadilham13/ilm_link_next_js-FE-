import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import RegisterAccountForm from "./components/register";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen max-w-5xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
    >
      <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="container h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* left column container */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* logo */}
                      <div className="text-center items-center">
                        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-5 m-auto">
                          <Image
                            className="relative"
                            width="200"
                            height="200"
                            src="/icon-home.jpg"
                            alt="ilm-link"
                          />
                        </div>

                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          ILM LINK
                        </h4>
                      </div>
                      {/* form register start */}
                      {RegisterAccountForm()}
                      {/* form register end */}
                    </div>
                  </div>

                  {/* Right column container with background and description */}
                  <div className="background-button flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
