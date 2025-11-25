import { checkProjectLink } from "~/shared/api";
import useDebounce from "~/shared/utils/use-debounce";

export const checkLinkAvialible = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const debouncedCheckLink = useDebounce((link: string) => {
    if (link.length < 3) return;
    isLoading.value = true;
    checkProjectLink(link)
      .then((res) => {
        if (res.data === true) {
          error.value = "Same link already exist, try another one";
        } else {
          error.value = null;
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }, 500);

  return {
    debouncedCheckLink,
    isLoading,
    error,
  };
};
