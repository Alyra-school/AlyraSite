import { permanentRedirect } from "next/navigation";

export default async function ProgrammesSlugRedirectPage({ params }) {
  const { slug } = await params;
  permanentRedirect(`/formations/${slug}`);
}
