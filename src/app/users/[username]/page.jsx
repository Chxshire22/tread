// user context
// fetch user data
async function getUsername(username) {
  const response = await fetch("https://localhost:3000/api/users" + username);
  return response.json();
}

export default async function ProfilePage({ params }) {
  // const user = await getUsername(params.username);

  return <div>{params.username}</div>;
}
