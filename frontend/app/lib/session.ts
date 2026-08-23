export const getSession = async (): Promise<number | null> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL_DEV}/session`, {
    credentials: "include",
  });

  if (!res.ok) return null;

  const body = await res.json();
  return body.user ?? null;
};
