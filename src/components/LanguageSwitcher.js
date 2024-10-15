"use client"; // Required for client-side components in App Router

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const searchParams = useSearchParams(); // Get query parameters (if any)

  const changeLanguage = (lang) => {
    const newPathname = `/${lang}${pathname.replace(/^\/[a-z]{2}/, "")}`; // Update the language in the pathname
    router.push(newPathname + "?" + searchParams.toString()); // Keep query parameters
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("hi")}>Hindi</button>
    </div>
  );
}
