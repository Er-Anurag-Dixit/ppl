import React from "react";
import { BrowserRouter } from "react-router-dom";

import SwitchComponent from "./switch";
import Header from "../HeaderFooter/header";
import Footer from "../HeaderFooter/footer";

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Header />
      <SwitchComponent />
      <Footer />
    </BrowserRouter>
  );
}
