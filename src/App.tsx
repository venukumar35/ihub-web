import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import "@mantine/notifications/styles.css";

export default function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Outlet />{" "}
      </ModalsProvider>
    </MantineProvider>
  );
}
