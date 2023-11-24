import { GetServerSideProps, NextPage } from "next";
import { User, Post } from "@/components/interface/types";
import axios from "axios";
import PostCard from "@/components/post-card";
import { useRouter } from "next/router";
import ClockTime from "@/components/clock-time";
import { API_BASE_URL } from "@/utils/constants";

interface UserDetailsProps {
  user: User;
  posts: Post[];
}

const UserDetails: NextPage<UserDetailsProps> = ({ user, posts }) => {
  const router = useRouter();

  const goBack = () => {
    router?.push("/");
  };

  return (
    <div className="main">
      <div className="row w-100">
        <div className="col-3 mb-3">
          <button className="btn btn-dark" onClick={goBack}>
            Back
          </button>
        </div>
        <div className="col d-flex justify-content-end">
          <ClockTime />
        </div>
      </div>
      <h2 className="my-5">Profile Page</h2>
      <div className="user row">
        {renderUserDetail("Name", user.name)}
        {renderUserDetail(
          "Address",
          `${user.address?.street}, ${user?.address?.suite} ${user?.address?.city} - ${user?.address?.zipcode}`
        )}
        {renderUserDetail("Username", user?.username)}
        {renderUserDetail("Email | Phone", `${user?.email} | ${user?.phone}`)}
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

const renderUserDetail = (label: string, value: string) => (
  <div className="col-12 col-sm-6 mb-2" key={label}>
    {label}:<span className="fw-bold"> {value}</span>
  </div>
);

export const getServerSideProps: GetServerSideProps<UserDetailsProps> = async ({
  params,
}) => {
  const userId = params?.id;

  try {
    const [userResponse, postsResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/users/${userId}`),
      axios.get(`${API_BASE_URL}/posts?userId=${userId}`),
    ]);

    const user: User = userResponse.data;
    const posts: Post[] = postsResponse.data;

    return { props: { user, posts } };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { notFound: true };
  }
};

export default UserDetails;
