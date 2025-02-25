import { RouterProvider } from "react-router";
import { router } from "./provider/router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster
        expand={false}
        duration={2000}
        richColors
        position="bottom-right"
      />
      <RouterProvider router={router} />
    </>
  );
}
