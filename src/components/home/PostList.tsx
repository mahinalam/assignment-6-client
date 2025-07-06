/* eslint-disable padding-line-between-statements */
// /* eslint-disable padding-line-between-statements */

// import { useState } from "react";
// import PostCard from "./PostCard";
// import { useGetAllPosts } from "@/src/hooks/post.hook";
// import { getAllGardeningPosts } from "@/src/services/PostService";
// const NUMBER_OF_POSTS_TO_FETCH = 10;

// export default function PostList({ initialPosts }: { initialPosts: any }) {
//   console.log("inittialPosts", initialPosts);
//   const [posts, setPosts] = useState<any[]>(initialPosts);
//   const [offset, setOffset] = useState(NUMBER_OF_POSTS_TO_FETCH);

//   const { data, refetch } = useGetAllPosts(offset, NUMBER_OF_POSTS_TO_FETCH);

//   const loadMorePosts = async () => {
//     // const apiPosts = await getAllGardeningPosts(
//     //   offset,
//     //   NUMBER_OF_POSTS_TO_FETCH
//     // );
//     const apiPosts = await refetch();
//     console.log("apiPosts", apiPosts);
//     // setPosts((posts) => [...posts, ...apiPosts]);
//     setPosts((posts: any) => [...posts, apiPosts?.data?.data]);
//     setOffset((offset) => offset + NUMBER_OF_POSTS_TO_FETCH);
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {posts?.length > 0 &&
//         posts?.map((post: any) => <PostCard key={post._id} item={post} />)}
//       <button onClick={loadMorePosts}>Load more</button>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import { useInView } from "react-intersection-observer";
import Loading from "../UI/Loading";
import { Input } from "@nextui-org/input";
import SkeletonLoading from "../UI/SkeletonLoading";

const NUMBER_OF_POSTS_TO_FETCH = 10;

export default function PostList({ initialPosts }: { initialPosts: any }) {
  const [offset, setOffset] = useState(NUMBER_OF_POSTS_TO_FETCH);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search term

  const { refetch, isLoading } = useGetAllPosts(
    offset,
    NUMBER_OF_POSTS_TO_FETCH
  );
  //   console.log("postData", postData);
  const { ref, inView } = useInView();

  // const loadMorePosts = async () => {
  //   console.log("jdhjdjjdj");
  //   const { data } = await refetch();
  //   console.log("from refetch", data?.data);
  //   const newPosts = data?.data;

  //   if (newPosts && newPosts.length > 0) {
  //     setPosts((posts) => [...posts, ...newPosts]);
  //     setOffset((offset) => offset + NUMBER_OF_POSTS_TO_FETCH);

  //     // If the number of posts returned is less than the number we requested,
  //     // it means we've reached the end.
  //     if (newPosts.length < NUMBER_OF_POSTS_TO_FETCH) {
  //       setHasMorePosts(false);
  //     }
  //   } else {
  //     // If no posts are returned, set hasMorePosts to false
  //     setHasMorePosts(false);
  //   }
  // };

  // Reset posts and offset if the search term changes
  // useEffect(() => {
  //   if (searchTerm) {
  //     setPosts([]); // Clear the existing posts
  //     setOffset(0); // Reset the offset
  //     setHasMorePosts(true); // Reset the hasMorePosts state
  //     refetch(); // Refetch posts based on the new search term
  //   }
  // }, [searchTerm, refetch]);

  // useEffect(() => {
  //   if (inView) {
  //     loadMorePosts();
  //   }
  // }, [inView]);

  return (
    <div className="flex flex-col gap-3">
      {/* Search Input */}

      {/* {posts?.length > 0 &&
        posts.map((post: any) => <PostCard key={post._id} item={post} />)}
      {hasMorePosts && (
        <div className="mb-5" ref={ref}>
          <Loading isAlign={false} />
        </div>
      )} */}
      {isLoading ? (
        // Show a single static loading skeleton when data is loading
        <SkeletonLoading />
      ) : (
        <>
          {initialPosts?.length > 0 &&
            initialPosts.map((post: any) => (
              <PostCard key={post._id} item={post} refetch={refetch} />
            ))}
        </>
      )}

      {/* {hasMorePosts && <button onClick={loadMorePosts}>Load more</button>} */}
    </div>
  );
}
