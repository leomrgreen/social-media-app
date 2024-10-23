import LoginForm from "@/components/login-form";

export default function Home() {
  return (
    <main className=" min-h-screen font-[family-name:var(--font-geist-sans)]">
      <a href="/feed"> FEED </a>
      <LoginForm />
    </main>
  );
}
