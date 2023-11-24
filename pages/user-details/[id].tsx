import { GetServerSideProps, NextPage } from "next";
import { User, Post } from "@/components/interface/types";
import axios from "axios";
import PostCard from "@/components/post-card";
import { useRouter } from "next/router";
import ClockTime from "@/components/clock-time";

interface UserDetailsProps {
  user: User;
  posts: Post[];
}

const UserDetails: NextPage<UserDetailsProps> = ({ user, posts }) => {
  const router = useRouter();
  return (
    <div className="main">
      <div className="row w-100">
        <div className="col-3 mb-3">
          <button className="btn btn-dark" onClick={() => router?.push("/")}>
            Back
          </button>
        </div>
        <div className="col d-flex justify-content-end">
          <ClockTime />
        </div>
      </div>
      <h2 className="my-5">Profile Page</h2>
      <div className="user row">
        <div className="col-12 col-sm-6 mb-2">
          Name:
          <span className="fw-bold"> {user.name} </span>
        </div>
        <div className="col-12 col-sm-6 mb-2">
          Address:
          <span className="fw-bold">
            {" "}
            {`${user.address?.street}, ${user?.address?.suite} ${user?.address?.city} - ${user?.address?.zipcode}`}
          </span>
        </div>
        <div className="col-12 col-sm-6 mb-2">
          Username:
          <span className="fw-bold"> {user?.username}</span>
        </div>
        <div className="col-12 col-sm-6 mb-2 ">
          Email | Phone :
          <span className="fw-bold"> {`${user?.email} | ${user?.phone}`}</span>
        </div>
      </div>
      <div className="row my-5">
        {posts?.map((post) => (
          <div className="col-12 col-lg-3 col-sm-4" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<UserDetailsProps> = async ({
  params,
}) => {
  const userId = params?.id;

  try {
    // Fetch user details using the ID passed in the route parameters
    const [userResponse, postsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);

    const user: User = userResponse.data;
    const posts: Post[] = postsResponse.data;

    // Pass user and post details to the page via props
    return { props: { user, posts } };
  } catch (error) {
    // Handle errors, for example, if the user is not found
    console.error("Error fetching user details:", error);
    return { notFound: true };
  }
};

export default UserDetails;
