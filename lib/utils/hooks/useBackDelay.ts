import { useRouter } from "next/navigation";

export function useBackDelay() {
  const router = useRouter();

  return () => setTimeout(router.back, 400);
}
