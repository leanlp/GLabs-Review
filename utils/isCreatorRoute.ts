import config from "config";
const { APP_ROUTES } = config;

export const isCreatorRoute = (pathname: string): boolean => {
  const creatorRoutes = Object.values(APP_ROUTES.creator);
  return creatorRoutes.includes(pathname);
};
