import Link from 'next/link'
import SectionLayout from 'components/SectionLayout'

export default function Home() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <SectionLayout className="w-full">
        <nav className="flex flex-col md:flex-row items-center gap-4 w-full">
          <IndexButton href="/route">Route</IndexButton>
          <IndexButton href="/table">Table</IndexButton>
        </nav>
      </SectionLayout>
    </div>
  )
}

function IndexButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="flex-1 text-center w-full md:w-auto font-semibold hover:text-highlight p-8 border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-200 focus:ring-opacity-70 hover:bg-indigo-50"
    >
      {children}
    </Link>
  )
}
