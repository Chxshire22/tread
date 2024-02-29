import { BACKEND_URL } from "@/app/constants";

async function getUsername(username) {
  const response = await fetch(`${BACKEND_URL}/api/user` + username);
  return response.json();
}

export default async function ProfilePage({ params }) {
  return <div>{params.username}</div>;
}
