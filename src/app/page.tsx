import { redirect } from "next/navigation";

// This page handles the root route (/) and redirects to the default locale
export default function RootPage() {
  redirect(`/uk-UA`);
} 