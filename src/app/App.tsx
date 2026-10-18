import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import IntroVideo from "./components/IntroVideo";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroVideo onDone={() => setIntroDone(true)} />}
      <RouterProvider router={router} />
    </>
  );
}
