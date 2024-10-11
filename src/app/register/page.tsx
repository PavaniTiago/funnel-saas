import SignUpForm from "@/src/components/sign-up-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#FBFBFB]">
      {/* @ts-ignore */}
      <SignUpForm />
    </main>
  );
}