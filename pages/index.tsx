import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { User, Post } from "@/components/interface/types";

interface HomeProps {
  users: User[];
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ users, posts }) => {
  const postCountByUser: Record<string, number> = {};

  // Count posts by user
  posts.forEach((post) => {
    const user = users.find((user) => user.id === post.userId);
    const userName = user?.name || "Unknown User";

    if (!postCountByUser[userName]) {
      postCountByUser[userName] = 1;
    } else {
      postCountByUser[userName]++;
    }
  });

  return (
    <>
      <main className="main">
        <h2 className="mb-5">Directory</h2>
        {users.map((user) => (
          <Link
            href={`/user-details/${user.id}`}
            key={user.id}
            className="user mb-3"
          >
            <div>
              Name: <span className="fw-bold">{user.name}</span>
            </div>
            <div>
              Post:{" "}
              <span className="fw-bold">{postCountByUser[user?.name]}</span>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // Fetch data from the external API
  const [usersResponse, postsResponse] = await Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/users"),
    axios.get("https://jsonplaceholder.typicode.com/posts"),
  ]);

  const users: User[] = usersResponse.data;
  const posts: Post[] = postsResponse.data;

  // Pass data to the page via props
  return { props: { users, posts } };
};
export default Home;
