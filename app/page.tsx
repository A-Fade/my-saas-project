import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      
      <h1>🏗️ Builder Management SaaS</h1>
      <p>Welcome to your construction dashboard</p>

      <Link href="/dashboard">
        <button style={{ marginTop: 20, padding: 10 }}>
          Go to Dashboard
        </button>
      </Link>

    </div>
  );
}