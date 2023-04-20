import { Toaster } from "react-hot-toast";

const Notifications = () => {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
};

export default Notifications;
