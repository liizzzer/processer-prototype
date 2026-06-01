import Link from "next/link"
import {
  PanelLeft,
  CircleUser,
  ChevronDown,
  ChevronLeft,
  Plus,
  Trash2,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"

const steps = [
  {
    id: 1,
    activity: "What",
    owner: "harry-potter",
    stakeholders: [
      { person: "harry-potter", role: "magician" },
      { person: "willy-wonka", role: "approver" },
    ],
    tools: "SAP, Word",
    notes: "Some comments",
  },
  {
    id: 2,
    activity: "What",
    owner: "harry-potter",
    stakeholders: [
      { person: "harry-potter", role: "magician" },
      { person: "willy-wonka", role: "approver" },
    ],
    tools: "SAP, Word",
    notes: "Some comments",
  },
]

function StepCard({ step }: { step: (typeof steps)[0] }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Step header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground text-lg font-heading">Step {step.id}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Activity description */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Activity description (what)</Label>
        <Input defaultValue={step.activity} className="text-sm" />
      </div>

      {/* Owner */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Owner</Label>
        <div className="flex items-center gap-2">
          <Select defaultValue={step.owner}>
            <SelectTrigger className="flex-1 text-sm">
              <SelectValue placeholder="Select a person" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="harry-potter">Harry Potter</SelectItem>
              <SelectItem value="willy-wonka">Willy Wonka</SelectItem>
              <SelectItem value="john-pork">John Pork</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs shrink-0">
            <UserPlus className="h-3.5 w-3.5" />
            Add stakeholder
          </Button>
        </div>
      </div>

      {/* Stakeholders */}
      {step.stakeholders.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col gap-1 flex-1">
            <Label className="text-xs text-muted-foreground">Stakeholder {i + 1}</Label>
            <Select defaultValue={s.person}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harry-potter">Harry Potter</SelectItem>
                <SelectItem value="willy-wonka">Willy Wonka</SelectItem>
                <SelectItem value="john-pork">John Pork</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <Label className="text-xs text-muted-foreground">Role {i + 1}</Label>
            <Select defaultValue={s.role}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="magician">Magician</SelectItem>
                <SelectItem value="approver">Approver</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive mt-5 shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}

      {/* Tools */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Tools to be used (how)</Label>
        <Input defaultValue={step.tools} className="text-sm" />
      </div>

      {/* Input document */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Input document</Label>
        <Input type="file" className="text-sm cursor-pointer" />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Notes</Label>
        <Textarea
          defaultValue={step.notes}
          className="text-sm resize-none min-h-20"
        />
      </div>
    </div>
  )
}

export default function ProtocolPage() {
  return (
    <div className="flex h-screen bg-sidebar overflow-hidden">
      <AppSidebar activeItem="New protocol" />

      {/* ─── Main panel ─── */}
      <main className="flex-1 m-2 rounded-xl bg-background overflow-y-auto">
        {/* Top bar — sticky */}
        <div className="sticky top-0 z-10 bg-background flex items-center justify-between px-5 pt-4 pb-0">
          <Button variant="ghost" size="icon" className="text-muted-foreground -ml-1">
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-2 text-sm font-medium h-auto py-1.5 px-2">
              <CircleUser className="h-5 w-5 text-muted-foreground" />
              John Pork
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Page heading — sticky */}
        <div className="sticky top-12 z-10 bg-background px-6 pt-3 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Edit | Buy a product</h1>
          </div>
          <p className="text-sm text-muted-foreground pl-9">v 1.1 | 10.02.2026</p>
        </div>

        {/* Scrollable content */}
        <div className="px-6 pb-4 flex flex-col gap-4">
          {/* Process details */}
          <Card className="bg-card shadow-none ring-0" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <CardContent style={{ padding: '24px' }}>
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-foreground text-2xl font-heading">Process details</h2>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">Protocol name</Label>
                  <Input defaultValue="Buy a product" className="text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Expected result</Label>
                    <Textarea
                      placeholder="Any additional comments"
                      className="text-sm resize-none min-h-32"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Purpose</Label>
                    <Textarea
                      placeholder="Any additional comments"
                      className="text-sm resize-none min-h-32"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card className="bg-card shadow-none ring-0" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <CardContent style={{ padding: '24px' }}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground text-2xl font-heading">Activities</h2>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    Add step
                  </Button>
                </div>

                {steps.map((step, i) => (
                  <div key={step.id}>
                    {i > 0 && <Separator className="my-2" />}
                    <StepCard step={step} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom action bar — sticky */}
        <div className="sticky bottom-0 z-10 border-t border-border bg-card px-6 py-3 flex items-center justify-end gap-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="text-sm">
              Cancel
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="text-sm">
            Save as Draft
          </Button>
          <Button size="sm" className="text-sm">
            Save and submit for approval
          </Button>
        </div>
      </main>
    </div>
  )
}
