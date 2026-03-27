import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-slate-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Pagina niet gevonden
        </h1>
        <p className="text-slate-600 mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors"
        >
          Terug naar home
        </Link>
      </div>
    </main>
  )
}
