import {
  PanelLeft,
  CircleUser,
  ChevronDown,
  FilePlus2,
  Search,
  ListFilter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppSidebar } from "@/components/app-sidebar"
import { ProtocolCard } from "@/components/protocol-card"

const protocols = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: "BUYING A PRODUCT",
    version: "v 1.1",
    date: "11/02/2026",
    status: "Pending approval",
    description:
      "The purpose of this Code is to establish rules of business conduct and guiding principles for all directors, relevant principals, and employe...",
  }))

export default function Page() {
  return (
    <div className="flex h-screen bg-sidebar overflow-hidden">
      <AppSidebar activeItem="Start" />

      {/* ─── Main panel ─── */}
      <main className="flex-1 m-2 rounded-xl bg-background overflow-auto flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <Button variant="ghost" size="icon" className="text-muted-foreground -ml-1">
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-2 text-sm font-medium h-auto py-1.5 px-2">
              <CircleUser className="h-5 w-5 text-muted-foreground" />
              John Pork
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
            <Button className="gap-2 text-sm" size="sm">
              <FilePlus2 className="h-4 w-4" />
              New protocol
            </Button>
          </div>
        </div>

        {/* Page heading */}
        <div className="px-6 pt-4 pb-5">
          <h1 className="text-2xl font-bold text-foreground leading-tight">Protocols</h1>
          <p className="text-sm text-muted-foreground mt-0.5">12 protocols</p>
        </div>

        {/* Search + filters */}
        <div className="px-6 flex items-center gap-2 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-9 bg-card text-sm"
              placeholder="Search protocol by name, purpose or developer"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-card text-sm font-normal">
            All protocols
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
          <Button variant="outline" className="gap-2 bg-card text-sm font-normal">
            <ListFilter className="h-3.5 w-3.5" />
            Filters
          </Button>
        </div>

        {/* Cards grid */}
        <div className="px-6 pb-6 grid grid-cols-3 gap-3">
          {protocols.map((protocol) => (
            <ProtocolCard key={protocol.id} {...protocol} />
          ))}
        </div>
      </main>
    </div>
  )
}
