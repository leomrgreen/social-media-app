import LoginForm from "@/components/login-form";

export default function Home() {
  return (
    <main className=" min-h-screen bg-red-300  flex flex-col items-center justify-center">
      <a href="/feed"> FEED </a>
      <LoginForm />
    </main>
  );
}
