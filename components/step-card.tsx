"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export type Stakeholder = { id: number; person: string; role: string }
export type Step = {
  id: number
  activity: string
  owner: string
  stakeholders: Stakeholder[]
  tools: string
  previousStep: string
  previousConnector: string
  nextStep: string
  nextConnector: string
  notes: string
}

let nextStakeholderId = 100

interface StepCardProps {
  step: Step
  allSteps: Step[]
  onRemove?: (id: number) => void
  onChange: (id: number, updated: Partial<Step>) => void
}

export function StepCard({ step, allSteps, onRemove, onChange }: StepCardProps) {
  function addStakeholder() {
    onChange(step.id, {
      stakeholders: [
        ...step.stakeholders,
        { id: nextStakeholderId++, person: "", role: "" },
      ],
    })
  }

  function removeStakeholder(sid: number) {
    onChange(step.id, {
      stakeholders: step.stakeholders.filter((s) => s.id !== sid),
    })
  }

  function updateStakeholder(sid: number, field: keyof Stakeholder, value: string) {
    onChange(step.id, {
      stakeholders: step.stakeholders.map((s) =>
        s.id === sid ? { ...s, [field]: value } : s
      ),
    })
  }

  const otherSteps = allSteps.filter((s) => s.id !== step.id)

  return (
    <div className="flex flex-col">
      {onRemove && (
        <>
          <div className="flex items-center justify-between pb-4">
            <span className="font-semibold text-foreground text-lg">Step {step.id}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(step.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Separator className="mb-5" />
        </>
      )}

      {/* Activity */}
      <div className="flex flex-col gap-2 pb-5">
        <Label className="text-sm font-medium text-foreground">Activity description (what)</Label>
        <Input
          value={step.activity}
          onChange={(e) => onChange(step.id, { activity: e.target.value })}
          placeholder="New step"
          className="text-sm"
        />
      </div>
      <Separator className="mb-5" />

      {/* Owner + Add stakeholder */}
      <div className="flex flex-col gap-2 pb-4">
        <Label className="text-sm font-medium text-foreground">Owner</Label>
        <div className="flex items-center gap-2">
          <Select
            value={step.owner || null}
            onValueChange={(v) => onChange(step.id, { owner: v ?? "" })}
          >
            <SelectTrigger className="flex-1 text-sm">
              <SelectValue placeholder="Select a person" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="harry-potter">Harry Potter</SelectItem>
              <SelectItem value="willy-wonka">Willy Wonka</SelectItem>
              <SelectItem value="john-pork">John Pork</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-sm shrink-0"
            onClick={addStakeholder}
          >
            <Plus className="h-3.5 w-3.5" />
            Add stakeholder
          </Button>
        </div>
      </div>

      {/* Stakeholders */}
      {step.stakeholders.map((s, i) => (
        <div key={s.id} className="flex items-end gap-2 pb-4">
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-sm font-medium text-foreground">Stakeholder {i + 1}</Label>
            <Select
              value={s.person || null}
              onValueChange={(v) => updateStakeholder(s.id, "person", v ?? "")}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a person" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harry-potter">Harry Potter</SelectItem>
                <SelectItem value="willy-wonka">Willy Wonka</SelectItem>
                <SelectItem value="john-pork">John Pork</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-sm font-medium text-foreground">Role {i + 1}</Label>
            <Select
              value={s.role || null}
              onValueChange={(v) => updateStakeholder(s.id, "role", v ?? "")}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a role" />
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
            className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => removeStakeholder(s.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Separator className="mb-5" />

      {/* Tools */}
      <div className="flex flex-col gap-2 pb-5">
        <Label className="text-sm font-medium text-foreground">Tools to be used (how)</Label>
        <Input
          value={step.tools}
          onChange={(e) => onChange(step.id, { tools: e.target.value })}
          placeholder="ex: Excel, SAP, Word"
          className="text-sm"
        />
      </div>

      {/* Input document */}
      <div className="flex flex-col gap-2 pb-5">
        <Label className="text-sm font-medium text-foreground">Input document</Label>
        <Input type="file" className="text-sm cursor-pointer" />
      </div>
      <Separator className="mb-5" />

      {/* Previous step + connector */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Previous step</Label>
          <Select
            value={step.previousStep || null}
            onValueChange={(v) => onChange(step.id, { previousStep: v ?? "" })}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select a step" />
            </SelectTrigger>
            <SelectContent>
              {otherSteps.map((s) => (
                <SelectItem key={s.id} value={String(s.id)}>
                  {s.activity || `Step ${s.id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Connector type</Label>
          <Select
            value={step.previousConnector || null}
            onValueChange={(v) => onChange(step.id, { previousConnector: v ?? "" })}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="- - - - - - - -" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequential">Sequential</SelectItem>
              <SelectItem value="parallel">Parallel</SelectItem>
              <SelectItem value="conditional">Conditional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Next step + connector */}
      <div className="flex items-end gap-2 pb-5">
        <div className="flex flex-col gap-2 flex-1">
          <Label className="text-sm font-medium text-foreground">Next step</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-sm shrink-0">
              <Plus className="h-3.5 w-3.5" />
              Add condition
            </Button>
            <Select
              value={step.nextStep || null}
              onValueChange={(v) => onChange(step.id, { nextStep: v ?? "" })}
            >
              <SelectTrigger className="flex-1 text-sm">
                <SelectValue placeholder="Select a step" />
              </SelectTrigger>
              <SelectContent>
                {otherSteps.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.activity || `Step ${s.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[calc(50%-0.25rem)]">
          <Label className="text-sm font-medium text-foreground">Connector type</Label>
          <Select
            value={step.nextConnector || null}
            onValueChange={(v) => onChange(step.id, { nextConnector: v ?? "" })}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="- - - - - - - -" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequential">Sequential</SelectItem>
              <SelectItem value="parallel">Parallel</SelectItem>
              <SelectItem value="conditional">Conditional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-5" />

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-foreground">Notes</Label>
        <Textarea
          value={step.notes}
          onChange={(e) => onChange(step.id, { notes: e.target.value })}
          placeholder="Any additional comments"
          className="text-sm resize-none min-h-24"
        />
      </div>
    </div>
  )
}
