/** @format */

"use client";

import Image from "next/image";
import DarkAndLightBtn from "./components/DarkAndLightBtn";
import SearchAndBtn from "./components/SearchAndBtn";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useState } from "react";

type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: null | string;
  created_at: string;
  email: null | string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null | string;
  type: string;
  updated_at: string;
  url: string;
  documentation_url: string;
  message: string;
};

export default function Home() {
  const [userName, setUserName] = useState("eesheesingh");

  const { isLoading, error, data, refetch } = useQuery<GitHubUser>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json()
      ),
  });
  console.log("data-", data);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <p className="animate-bounce text-2xl text-gray-600 dark:text-gray-200">Loading...</p>
      </div>
    );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100 p-4 dark:bg-gray-900">
      {/* Container */}
      <div className="mx-auto w-full max-w-2xl flex flex-col gap-8 rounded-lg p-6 bg-white shadow-lg dark:bg-gray-800">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Check Out Your Github Profile</h1>
          <DarkAndLightBtn />
        </header>

        {/* Search and Main Content */}
        <section className="flex flex-col gap-6">
          {/* Search and Button */}
          <SearchAndBtn
            onChange={(e) => setUserName(e.target.value)}
            onSubmit={handleSubmit}
            value={userName}
          />
          {data?.message ? (
            <div className="flex flex-col gap-5 rounded-lg bg-red-100 px-4 py-8 text-center text-red-500 dark:bg-red-800 dark:text-red-300">
              User Not Found
            </div>
          ) : (
            <main className="flex flex-col gap-5 rounded-lg bg-white dark:bg-gray-800 px-6 py-8 shadow-xl">
              {/* User Info */}
              <section className="flex gap-4">
                {/* User Image */}
                <Image
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full"
                  src={data?.avatar_url ?? ""}
                  alt="user-img"
                />
                <section className="flex flex-col justify-between sm:flex-row w-full">
                  <div>
                    {/* User Name */}
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{data?.name}</h2>
                    {/* User Login */}
                    <Link
                      target="_blank"
                      className="text-blue-500 hover:underline"
                      href={`https://github.com/${data?.login}/`}
                    >
                      @{data?.login}
                    </Link>
                  </div>
                  {/* Joined Date */}
                  <p className="text-gray-500 dark:text-gray-300">
                    Joined {dateFormat(data?.created_at, "dd mmm yyyy")}
                  </p>
                </section>
              </section>
              
              {/* Bio */}
              <section className="flex flex-col gap-5">
                <p className="text-gray-700 dark:text-gray-300">
                  {data?.bio ?? (
                    <span className="opacity-60">This profile has no bio</span>
                  )}
                </p>
                {/* Repo and Follower Section */}
                <div className="flex justify-between gap-3 rounded-lg bg-gray-100 px-6 py-4 dark:bg-gray-700">
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Repos</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{data?.public_repos}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Followers</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{data?.followers}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Following</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{data?.following}</p>
                  </div>
                </div>

                {/* Address and Extra Links */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-xl text-gray-500 dark:text-gray-300" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {data?.location ?? <span className="opacity-60">Not Available</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosLink className="text-xl text-gray-500 dark:text-gray-300" />
                    {data?.blog ? (
                      <Link
                        title={data?.blog}
                        className="text-blue-500 hover:underline truncate max-w-[220px]"
                        href={data?.blog ?? "#"}
                      >
                        {data?.blog}
                      </Link>
                    ) : (
                      <span className="opacity-60">Not Available</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTwitter className="text-xl text-gray-500 dark:text-gray-300" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {data?.twitter_username ?? <span className="opacity-60">Not Available</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillBuildingsFill className="text-xl text-gray-500 dark:text-gray-300" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {data?.company ?? <span className="opacity-60">Not Available</span>}
                    </p>
                  </div>
                </div>
              </section>
            </main>
          )}
        </section>
      </div>
    </div>
  );
}
