import Link from "next/link";
import { Button } from "../ui/button";


export default function LoginButton() {
  return (
    <Button asChild>
        <Link href="/auth/login">Login</Link>
    </Button>
  );
}