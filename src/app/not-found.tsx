import { Container } from "@/components/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Container>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold text-black dark:text-white">
            Page not found
          </h2>
          <p>This album doesn't exist</p>
          <Link className="underline" href="/">
            Return Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
