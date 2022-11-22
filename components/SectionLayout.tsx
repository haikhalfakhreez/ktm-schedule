import { twMerge } from 'tailwind-merge'

type LayoutProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export default function SectionLayout({ children, as, className }: LayoutProps) {
  const Tag = as || 'div'
  return <Tag className={twMerge('max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8', className)}>{children}</Tag>
}
