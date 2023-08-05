import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { SectionLayout } from '@/components/section-layout'
import { ForwardIcon, TableCellsIcon } from '@heroicons/react/24/outline'
import { siteConfig } from '@/lib/site-config'

const pages = [
  {
    title: 'Route',
    description:
      'Select your personalized journey by choosing departure and destination stations for detailed train schedules.',
    href: '/route',
    icon: ForwardIcon,
  },
  {
    title: 'Table',
    description: 'View the full train schedule in a table format.',
    href: '/table',
    icon: TableCellsIcon,
  },
]

export default function Home({}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <SectionLayout className="w-full">
        <Announcement />

        <nav className="flex flex-col md:flex-row items-stretch gap-4 w-full">
          {pages.map((item, index) => (
            <IndexButton href={item.href} key={index}>
              <h2 className="font-semibold text-xl flex items-center space-x-2">
                <span>{item.title}</span>
                <item.icon className="w-5 h-5" />
              </h2>
              <p className="text-xs text-gray-500 font-normal">
                <Balancer>{item.description}</Balancer>
              </p>
            </IndexButton>
          ))}
        </nav>
      </SectionLayout>
    </div>
  )
}

function IndexButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="flex-1 text-center w-full md:w-auto hover:text-highlight p-8 border border-slate-200 rounded-md focus:ring-2 focus:border-highlight focus:ring-highlight/50 hover:bg-indigo-50 flex items-center justify-center flex-col space-y-1"
    >
      {children}
    </Link>
  )
}

function Announcement() {
  return (
    <div className="flex items-center rounded-md py-2 px-4 text-secondary font-medium border border-indigo-100 bg-indigo-50/50 text-xs mb-6">
      <span className="tabular-nums font-semibold text-[10px] text-white bg-green-600 py-0.5 px-1.5 rounded-full mr-2">
        NEW
      </span>
      <span>
        Update: Stay informed with the latest information! KTM data has been updated to the July
        2023 version.{' '}
        <a
          href={`${siteConfig.links.github}#update-july-2023`}
          className="text-blue-600 hover:underline"
        >
          Read more
        </a>
      </span>
    </div>
  )
}
