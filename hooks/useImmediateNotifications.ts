import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useImmediateNotifications = () => {
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (query.success === "false" && query.error) {
      toast.error(query.error as string);
      router.query = {};
    }

    if (query.success === "true" && query.provider) {
      toast.success(`You have successfully connected to ${query.provider}!`);
      router.query = {};
    }

    return () => {
      router.query = {};
    };
  }, [query, router]);

  return {};
};
