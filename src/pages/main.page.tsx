import { Outlet } from "react-router-dom";
import Layout from "../component/layout";
import React from "react";

function MainPage() {
  return (
    <React.Suspense>
      <Layout>
        <Outlet />
      </Layout>
    </React.Suspense>
  );
}
export default MainPage;
