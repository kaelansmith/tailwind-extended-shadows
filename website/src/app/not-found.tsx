import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-40 text-center">
      <p className="text-sm font-medium text-indigo-600">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
        This page does not exist
      </h1>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-indigo-600 hover:underline"
      >
        Go to the home page
      </Link>
    </div>
  );
}
