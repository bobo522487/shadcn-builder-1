import Link from "next/link";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Playground</h1>
      <ul>
        <li><Link href="/renderer-demo">Renderer Demo</Link></li>
        <li><Link href="/designer-demo">Designer Demo</Link></li>
      </ul>
    </main>
  );
}
