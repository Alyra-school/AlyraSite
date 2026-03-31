import AppointmentPage from "../../src/components/AppointmentPage";
import { pageMetadata } from "../../src/lib/seo";

export const metadata = pageMetadata({
  title: "Prendre rendez-vous",
  description:
    "Planifiez un rendez-vous avec un conseiller Alyra pour echanger sur votre projet de formation.",
  path: "/rendez-vous",
});

export default function Page() {
  return <AppointmentPage />;
}
