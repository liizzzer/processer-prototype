"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  PanelLeft,
  CircleUser,
  ChevronDown,
  ChevronLeft,
  Plus,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { AppSidebar } from "@/components/app-sidebar"
import { StepCard, type Step, type Stakeholder } from "@/components/step-card"

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground/70">{children}</p>
}

const defaultStep = (): Step => ({
  id: 1,
  activity: "",
  owner: "",
  stakeholders: [],
  tools: "",
  previousStep: "",
  previousConnector: "",
  nextStep: "",
  nextConnector: "",
  notes: "",
})

export default function NewProtocolPage() {
  const [steps, setSteps] = useState<Step[]>([defaultStep()])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const pendingScrollId = useRef<number | null>(null)

  function deleteAllSteps() {
    setSteps([defaultStep()])
    setDeleteDialogOpen(false)
  }

  useEffect(() => {
    if (pendingScrollId.current !== null) {
      document.getElementById(`step-${pendingScrollId.current}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
      pendingScrollId.current = null
    }
  }, [steps])

  function addStep() {
    setSteps((prev) => {
      const newId = Math.max(...prev.map((s) => s.id)) + 1
      pendingScrollId.current = newId
      return [
      ...prev,
      {
        id: newId,
        activity: "",
        owner: "",
        stakeholders: [],
        tools: "",
        previousStep: "",
        previousConnector: "",
        nextStep: "",
        nextConnector: "",
        notes: "",
      },
    ]
    })
  }

  function removeStep(id: number) {
    setSteps((prev) => prev.filter((s) => s.id !== id))
  }

  function updateStep(id: number, updated: Partial<Step>) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)))
  }

  return (
    <div className="flex h-screen bg-sidebar overflow-hidden">
      <AppSidebar activeItem="New protocol" />

      <main className="flex-1 m-2 rounded-xl bg-background overflow-y-auto flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background flex items-center justify-between px-5 pt-4 pb-0">
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
        <div className="sticky top-12 z-10 bg-background px-6 pt-3 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">New protocol</h1>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="px-6 pb-4 flex flex-col gap-4 flex-1">
          {/* Process details */}
          <Card className="bg-card shadow-none ring-0 border-border">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-foreground text-2xl">Process details</h2>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">Protocol name</Label>
                  <Input placeholder="ex: buying a product" className="text-sm" />
                  <FieldHint>Give your protocol a clear, descriptive name</FieldHint>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Expected result</Label>
                    <Textarea
                      placeholder="Any additional comments"
                      className="text-sm resize-none min-h-32"
                    />
                    <FieldHint>What outcome should this protocol produce</FieldHint>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Purpose</Label>
                    <Textarea
                      placeholder="Any additional comments"
                      className="text-sm resize-none min-h-32"
                    />
                    <FieldHint>Why does this protocol exist</FieldHint>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card className="bg-card shadow-none ring-0 border-border">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground text-2xl">Activities</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={addStep}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add step
                  </Button>
                </div>

                {steps.map((step, i) => (
                  <div key={step.id} id={`step-${step.id}`}>
                    {i > 0 && <Separator className="my-2" />}
                    <StepCard
                      step={step}
                      allSteps={steps}
                      onRemove={removeStep}
                      onChange={updateStep}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom action bar */}
        <div className="sticky bottom-0 z-10 border-t border-border bg-card px-6 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={addStep}
            >
              <Plus className="h-3.5 w-3.5" />
              Add step
            </Button>
            {steps.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete all steps
              </Button>
            )}
          </div>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure that you want to delete all steps?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" size="sm" onClick={deleteAllSteps}>
                  Delete all steps
                </Button>
                <Button size="sm" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-2">
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
        </div>
      </main>
    </div>
  )
}
