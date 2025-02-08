import { Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import ResetPassword from "../pages/ResetPassword";
import Verify from "../pages/Verify";
import Personal from "../pages/Personal";

const AsocRoutes = () => {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/*" element={<AboutUs />} />

      {/* Contact route */}
      <Route path="/contact" element={<Contact />} />

      {/* Personal route */}
      <Route path="/personal" element={<Personal />} />

      <Route path="/user/reset-password" element={<ResetPassword />} />

      <Route path="/user/verify-email" element={<Verify />} />
    </Routes>
  );
};

export default AsocRoutes;
