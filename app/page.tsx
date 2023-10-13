import getCurrentUser from "./actions/getCurrentUser";

import Navigation from "./components/Navbar";

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <header>
        <Navigation currentUser={currentUser} />
      </header>
      <main></main>
    </>
  );
}
