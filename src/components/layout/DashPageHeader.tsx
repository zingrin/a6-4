import { cn } from '@/lib/utils'
import React from 'react'

type DashPageHeaderProps = {
  title: string
  description: string
  className?: string
}

export default function DashPageHeader({ title, description, className }: DashPageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  )
}
