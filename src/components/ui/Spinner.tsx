export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-aqua-300 border-t-aqua-600" />
    </div>
  )
}
