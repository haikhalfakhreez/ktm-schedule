export default function LastUpdated({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 text-xs text-tertiary">
      Last updated: <span className="font-semibold text-primary">{children}</span>
    </p>
  )
}
