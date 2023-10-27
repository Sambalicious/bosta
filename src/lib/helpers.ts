import { AxiosError } from "axios";
import { toast } from "sonner";

export const errorHandler = (err: unknown) => {
  const error = err as AxiosError<{ detail: { message: string | undefined } }>;

  // Don't report cancelled request
  if (error.name === "CancelledError") return;

  toast.error(
    !navigator.onLine
      ? "Please check your internet connection"
      : error.response?.data?.detail?.message ?? "Something went wrong",
  );
};
