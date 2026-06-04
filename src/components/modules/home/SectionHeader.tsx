import { cn } from '@/lib/utils'

export default function SectionHeader({title, description, className} : {title : string, description ?: string, className?: string}) {
  return (
    <div className={cn("mb-12", className)}>
        <h2 className="text-4xl font-bold mb-3">
          {title}
        </h2>
        <p className="text-lg text-secondary-foreground">
          {description}
        </p>
      </div>
  )
}
