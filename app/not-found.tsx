import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <PageHeader lines={["404"]} script="lost?" label="Page not found">
      <p className="lead">This page doesn&rsquo;t exist or was moved.</p>
      <Link href="/" className="btn btn-signal">
        <i aria-hidden="true" />
        Back to home
      </Link>
    </PageHeader>
  );
}
