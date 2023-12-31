import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  // console.log(hello.data);
  const allBlogs = api.post.getAllBlogs.useQuery();
  // console.log(allBlogs.data);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 text-white">
        <div className="container gap-12 px-4 mx-auto">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">T3</span> prisma  blog
          </h1>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-8 lg:grid-cols-3">
            {allBlogs.data?.map((blog) => (
            <Link
            href={`/blog/${blog.id}`}
            key={blog.id}>

            <div className="rounded-xl bg-white/10 p-6 ">
              <h3 className="mb-4 text-2xl font-bold">{blog.title}→</h3>
              <div className="mb-4 text-lg">{blog.description}</div>
              <span className="text-base text-gray-400">{blog.createdAt.toLocaleDateString()}</span>
            </div>
            </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
              <Link
              href='/postBlog'
              className="rounded-md bg-orange-400 py-4 px-8">
                POST
              </Link>
          </div>
        </div>
      </main>
    </>
  );
}
