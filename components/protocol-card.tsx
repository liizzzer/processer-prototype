"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { PenLine, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ProtocolCardProps {
  id: number
  title: string
  version: string
  date: string
  status: string
  description: string
}

export function ProtocolCard({ id, title, version, date, status, description }: ProtocolCardProps) {
  const router = useRouter()
  return (
    <Link href={`/protocols/${id}`} className="block group">
      <Card className="bg-card shadow-none ring-0 h-full transition-shadow group-hover:shadow-md">
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs font-medium gap-1.5 px-2.5 py-1 rounded-full">
              <Loader2 className="h-3 w-3 animate-spin" />
              {status}
            </Badge>
            <div className="flex items-center -mr-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={(e) => { e.preventDefault(); router.push(`/protocols/${id}/edit`) }}
              >
                <PenLine className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={(e) => e.preventDefault()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground text-sm leading-snug">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {version}&nbsp;&nbsp;|&nbsp;&nbsp;{date}
            </p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
