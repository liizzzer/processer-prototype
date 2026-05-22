"use client"

import Link from "next/link"
import {
  PanelLeft,
  CircleUser,
  ChevronDown,
  ChevronLeft,
  Pencil,
  Printer,
  User,
  Wrench,
  FileInput,
  FileOutput,
  Share2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"

const protocol = {
  title: "Buying a product",
  version: "v 1.3",
  date: "11.02.2026",
  purpose:
    "The purpose of this Code is to establish rules of business conduct and guiding principles for all directors, relevant principals, and employees of Makarenko Limited. The purpose of this Code is to establish rules of business conduct and guiding principles for all directors, relevant principals, and employees of Makarenko Limited.",
  expectedResult:
    "Make the things done. The purpose of this Code is to establish rules of business conduct and guiding principles for all directors, relevant principals, and employees of Makarenko Limited.",
}

const activities = [
  {
    id: 1,
    title: "Compile CAPEX",
    description: "Initial budget compilation for the purchase",
    owner: "Harry Potter",
    tools: "Excel/Word",
    inputDoc: "Template",
    outputDoc: "CAPEX document",
    isSubprocess: false,
  },
  {
    id: 2,
    title: "Get commercial offer",
    description: "Request quotes from vendors",
    owner: "John Doe",
    tools: "Word/PDF",
    inputDoc: "Official letter template",
    outputDoc: "Commercial offer with stamp",
    isSubprocess: false,
  },
  {
    id: 3,
    title: "Get approval",
    description: "Obtain management sign-off",
    owner: "Willy Wonka",
    tools: "SAP",
    inputDoc: "Commercial offer",
    outputDoc: "Approval form",
    isSubprocess: false,
  },
  {
    id: 4,
    title: "Place and order",
    description: "Subprocess for order placement",
    owner: "Jack Smith",
    tools: "SAP",
    inputDoc: "Template",
    outputDoc: "Submitted form",
    isSubprocess: true,
  },
]

const leaders = [
  { name: "Harry Potter", role: "Developer" },
  { name: "Harry Potter", role: "Authoriser" },
  { name: "Harry Potter", role: "Developer" },
]
const managers = [{ name: "John Snow", role: "Leader" }]
const associates = [{ name: "John Snow", role: "Manager" }]

const raciPeople = ["John", "Willy", "Harry", "John"]
type RaciKey = 0 | 1 | 2 | 3
const raciRows: { activity: string; assignments: Partial<Record<RaciKey, string>> }[] = [
  { activity: "Compile CAPEX",       assignments: { 2: "R", 3: "C" } },
  { activity: "Get commercial offer", assignments: { 1: "C", 3: "R" } },
  { activity: "Get approval",         assignments: { 0: "A", 1: "R" } },
  { activity: "Place an order",       assignments: { 0: "A", 1: "R" } },
]

const raciColors: Record<string, string> = {
  R: "bg-neutral-900 text-white",
  A: "bg-teal-600 text-white",
  C: "bg-amber-500 text-white",
  I: "bg-muted text-muted-foreground",
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
}

function PersonCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="text-xs font-semibold">{initials(name)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

export default function ProtocolViewPage() {
  return (
    <div className="flex h-screen bg-sidebar overflow-hidden">
      <AppSidebar activeItem="New protocol" />

      <main className="flex-1 m-2 rounded-xl bg-background overflow-auto flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
          <Button variant="ghost" size="icon" className="text-muted-foreground -ml-1">
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="gap-2 text-sm font-medium h-auto py-1.5 px-2">
            <CircleUser className="h-5 w-5 text-muted-foreground" />
            John Pork
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </div>

        {/* Page heading */}
        <div className="px-5 pt-3 pb-0 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground mt-1 shrink-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground leading-tight">{protocol.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{protocol.version} | {protocol.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 mt-1">
              <Link href={`/protocols/1/edit`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                <Printer className="h-3.5 w-3.5" />
                Print
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden px-5 pt-4">
          <TabsList className="shrink-0 w-full">
            {["details", "people", "raci", "diagram", "changes"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 data-active:bg-card"
              >
                {tab === "raci" ? "RACI" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Details */}
          <TabsContent value="details" className="flex-1 overflow-auto mt-4 flex flex-col gap-4 pb-6">
            {/* Purpose + Expected result */}
            <div className="grid grid-cols-2 rounded-xl overflow-hidden bg-muted">
              <div className="p-6 pb-10">
                <p className="text-xs font-semibold tracking-widest text-foreground/60 uppercase mb-3">Purpose</p>
                <p className="text-sm text-foreground leading-relaxed">{protocol.purpose}</p>
              </div>
              <div className="p-6 pb-10">
                <p className="text-xs font-semibold tracking-widest text-foreground/60 uppercase mb-3">Expected result</p>
                <p className="text-sm text-foreground leading-relaxed">{protocol.expectedResult}</p>
              </div>
            </div>

            {/* Activities */}
            <Card className="bg-card shadow-none border-border py-0">
              <CardContent className="p-0">
                <div className="px-6 pt-6 pb-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-foreground">Expected activities</h2>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Share2 className="h-3.5 w-3.5" />
                    Open in diagram
                  </Button>
                </div>

                <div className="flex flex-col">
                  {activities.map((activity, i) => (
                    <div key={activity.id}>
                      {i > 0 && <Separator className="my-4" />}
                      <div className="flex items-start gap-4">
                        {/* Number circle */}
                        <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                          {activity.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                            {activity.isSubprocess && (
                              <Badge variant="outline" className="text-xs border-dashed px-2 py-0.5">
                                ↔ Subprocess
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{activity.description}</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="h-3.5 w-3.5 shrink-0" />
                              {activity.owner}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Wrench className="h-3.5 w-3.5 shrink-0" />
                              {activity.tools}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <FileInput className="h-3.5 w-3.5 shrink-0" />
                              {activity.inputDoc}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <FileOutput className="h-3.5 w-3.5 shrink-0" />
                              {activity.outputDoc}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* People */}
          <TabsContent value="people" className="flex-1 overflow-auto mt-4 pb-6">
            <Card className="bg-card shadow-none border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Behaviours</h2>

                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-foreground/60 uppercase mb-4">Leaders</p>
                    <div className="flex flex-wrap gap-6">
                      {leaders.map((p, i) => <PersonCard key={i} {...p} />)}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-foreground/60 uppercase mb-4">Managers</p>
                    <div className="flex flex-wrap gap-6">
                      {managers.map((p, i) => <PersonCard key={i} {...p} />)}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-foreground/60 uppercase mb-4">Associates</p>
                    <div className="flex flex-wrap gap-6">
                      {associates.map((p, i) => <PersonCard key={i} {...p} />)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RACI */}
          <TabsContent value="raci" className="flex-1 overflow-auto mt-4 pb-6 flex flex-col gap-4">
            {/* Legend */}
            <div className="flex items-center gap-4 flex-wrap">
              {Object.entries({ R: "Responsible", A: "Accountable", C: "Consulted", I: "Informed" }).map(
                ([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${raciColors[key]}`}>
                      {key}
                    </div>
                    <span className="text-sm text-foreground">{label}</span>
                  </div>
                )
              )}
            </div>

            {/* Table */}
            <Card className="bg-card shadow-none border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-semibold tracking-widest text-muted-foreground uppercase px-5 py-3 w-full">
                      Activity
                    </th>
                    {raciPeople.map((name, i) => (
                      <th key={i} className="text-center text-sm font-medium text-foreground px-4 py-3 min-w-20">
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {raciRows.map((row, ri) => (
                    <tr key={ri} className="border-b border-border last:border-0">
                      <td className="px-5 py-4 text-sm text-foreground">
                        {ri + 1}. {row.activity}
                      </td>
                      {raciPeople.map((_, ci) => (
                        <td key={ci} className="px-4 py-4 text-center">
                          {row.assignments[ci as RaciKey] && (
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold mx-auto ${raciColors[row.assignments[ci as RaciKey]!]}`}>
                              {row.assignments[ci as RaciKey]}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>

          {/* Diagram */}
          <TabsContent value="diagram" className="flex-1 overflow-auto mt-4 pb-6">
            <Card className="bg-card shadow-none border-border h-full min-h-80 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Diagram — coming soon</p>
            </Card>
          </TabsContent>

          {/* Changes */}
          <TabsContent value="changes" className="flex-1 overflow-auto mt-4 pb-6">
            <Card className="bg-card shadow-none border-border h-full min-h-80 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Changes — coming soon</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
