// pages import
import NoNetwork from "@/Pages/ErrorPages/NoNetwork";
// layout import
import BlankLayout from "@/@core/layouts/BlankLayout";
// react route dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

const NetworkRouter = () => {
  const Network = (
    <BlankLayout>
      <NoNetwork />
    </BlankLayout>
  )
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Network} />
        <Route path="*" element={Network} />
      </Routes>
    </BrowserRouter>
  )
}

export default NetworkRouter;
