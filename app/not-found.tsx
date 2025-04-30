import { GoBackButton } from "@/components";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <Image
        src={"/exellmwemb.png"}
        height={480}
        width={480}
        alt="logo"
        className={"object-cover"}
      />

      <h1>404 - Page not found</h1>

      <GoBackButton />
    </div>
  )
}
