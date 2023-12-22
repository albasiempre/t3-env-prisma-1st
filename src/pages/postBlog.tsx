import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { api } from "~/utils/api";

const PostBlog = () => {

  //  フォームの最初のインプットを記載、無駄なレンダリングはいらないので、refのフックを使用する
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);


  const router = useRouter();
  const allBlogs = api.post.getAllBlogs.useQuery();

  // procedureは投稿ボタンの上でくくって出す
  const postBlog = api.post.postBlog.useMutation({
    onSettled: () => {
      allBlogs.refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // nullの可能性はあるが、ダイダイこんな風に場合わけでOK
    if(titleRef.current && descriptionRef.current) {
      postBlog.mutate({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      });

    }

    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
    router.push("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="title"
            >
              TITLE
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              type="text"
              placeholder="put your title"
              ref={titleRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="description"
            >
              description
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              placeholder="describe your thoughts"
              ref={descriptionRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:outline-none"
              type="submit"
            >
              POST
            </button>
            <Link
              href="/"
              className="inline-block align-baseline text-sm font-bold text-orange-500 hover:text-orange-800"
            >
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PostBlog;
