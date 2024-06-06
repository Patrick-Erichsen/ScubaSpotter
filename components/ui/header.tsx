export default function Header() {
  return (
    <header className="w-full bg-blue-50 px-4 sm:px-8 md:px-16 lg:px-20 py-6">
      {(process.env.NODE_ENV === "development" ||
        process.env.VERCEL_ENV === "preview") && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          data-project-id="hZXqhGFEmkc7jq13leLca2bQ6aWJBtFI5vR6zvzJ"
          data-is-production-environment="false"
          src="https://snippet.meticulous.ai/v1/meticulous.js"
        />
      )}

      <div className="font-extrabold text-2xl">Scuba Spotter 🤿</div>
    </header>
  );
}
