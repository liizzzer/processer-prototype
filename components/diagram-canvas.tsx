"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
  MarkerType,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Minus, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { StartNode } from "@/components/diagram/start-node"
import { StepNode } from "@/components/diagram/step-node"
import { ConditionNode } from "@/components/diagram/condition-node"
import { StepCard, type Step } from "@/components/step-card"

const nodeTypes = {
  start: StartNode,
  step: StepNode,
  condition: ConditionNode,
}

interface Activity {
  id: number
  title: string
  description: string
  owner: string
  tools: string
  inputDoc: string
  outputDoc: string
  isSubprocess: boolean
}

interface DiagramCanvasInnerProps {
  activities: Activity[]
  setActivities: (activities: Activity[]) => void
  onClose: () => void
}

function activitiesToFlow(activities: Activity[]): { nodes: Node[]; edges: Edge[] } {
  const X = 200
  const startNode: Node = {
    id: "start",
    type: "start",
    position: { x: X, y: 0 },
    data: {},
    draggable: true,
  }

  const stepNodes: Node[] = activities.map((a, i) => ({
    id: String(a.id),
    type: "step",
    position: { x: X, y: (i + 1) * 120 },
    data: { label: a.title, owner: a.owner },
    draggable: true,
  }))

  const nodes = [startNode, ...stepNodes]

  const edges: Edge[] = []
  // start → first step
  if (activities.length > 0) {
    edges.push({
      id: "start-1",
      source: "start",
      target: String(activities[0].id),
      markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
      style: { stroke: "#d1d5db" },
    })
  }
  // step → next step
  for (let i = 0; i < activities.length - 1; i++) {
    edges.push({
      id: `e${activities[i].id}-${activities[i + 1].id}`,
      source: String(activities[i].id),
      target: String(activities[i + 1].id),
      markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
      style: { stroke: "#d1d5db" },
    })
  }

  return { nodes, edges }
}

function DiagramCanvasInner({ activities, setActivities, onClose }: DiagramCanvasInnerProps) {
  const nextNodeId = useRef(1000)
  const initial = useMemo(() => activitiesToFlow(activities), [])
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges)
  const [zoom, setZoom] = useState(100)
  const [editingStep, setEditingStep] = useState<Step | null>(null)
  const { zoomIn, zoomOut, getZoom, setViewport, getViewport } = useReactFlow()

  const allStepsForDialog: Step[] = nodes
    .filter((n) => n.type === "step")
    .map((n) => ({
      id: Number(n.id),
      activity: String(n.data.label ?? ""),
      owner: String(n.data.owner ?? ""),
      stakeholders: (n.data.stakeholders as Step["stakeholders"]) ?? [],
      tools: String(n.data.tools ?? ""),
      previousStep: String(n.data.previousStep ?? ""),
      previousConnector: String(n.data.previousConnector ?? ""),
      nextStep: String(n.data.nextStep ?? ""),
      nextConnector: String(n.data.nextConnector ?? ""),
      notes: String(n.data.notes ?? ""),
    }))

  function handleNodeDoubleClick(_: React.MouseEvent, node: Node) {
    if (node.type !== "step") return
    const step: Step = {
      id: Number(node.id),
      activity: String(node.data.label ?? ""),
      owner: String(node.data.owner ?? ""),
      stakeholders: (node.data.stakeholders as Step["stakeholders"]) ?? [],
      tools: String(node.data.tools ?? ""),
      previousStep: String(node.data.previousStep ?? ""),
      previousConnector: String(node.data.previousConnector ?? ""),
      nextStep: String(node.data.nextStep ?? ""),
      nextConnector: String(node.data.nextConnector ?? ""),
      notes: String(node.data.notes ?? ""),
    }
    setEditingStep(step)
  }

  function handleStepChange(id: number, updated: Partial<Step>) {
    setEditingStep((prev) => (prev ? { ...prev, ...updated } : prev))
  }

  function handleStepSave() {
    if (!editingStep) return
    setNodes((ns) =>
      ns.map((n) =>
        n.id === String(editingStep.id)
          ? {
              ...n,
              data: {
                ...n.data,
                label: editingStep.activity,
                owner: editingStep.owner,
                tools: editingStep.tools,
                previousStep: editingStep.previousStep,
                previousConnector: editingStep.previousConnector,
                nextStep: editingStep.nextStep,
                nextConnector: editingStep.nextConnector,
                notes: editingStep.notes,
                stakeholders: editingStep.stakeholders,
              },
            }
          : n
      )
    )
    setEditingStep(null)
  }

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
            style: { stroke: "#d1d5db" },
          },
          eds
        )
      ),
    [setEdges]
  )

  function handleZoomIn() {
    zoomIn()
    setTimeout(() => setZoom(Math.round(getZoom() * 100)), 200)
  }

  function handleZoomOut() {
    zoomOut()
    setTimeout(() => setZoom(Math.round(getZoom() * 100)), 200)
  }

  function addStep() {
    const id = String(nextNodeId.current++)
    const lastStep = [...nodes].reverse().find((n) => n.type === "step" || n.type === "condition")
    const y = lastStep ? lastStep.position.y + 120 : 120
    const newNode: Node = {
      id,
      type: "step",
      position: { x: 200, y },
      data: { label: "New step", owner: "" },
      draggable: true,
    }
    setNodes((ns) => [...ns, newNode])
    if (lastStep) {
      setEdges((es) => [
        ...es,
        {
          id: `e${lastStep.id}-${id}`,
          source: lastStep.id,
          target: id,
          markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
          style: { stroke: "#d1d5db" },
        },
      ])
    }
  }

  function addCondition() {
    const id = String(nextNodeId.current++)
    const lastStep = [...nodes].reverse().find((n) => n.type === "step" || n.type === "condition")
    const y = lastStep ? lastStep.position.y + 140 : 120
    const newNode: Node = {
      id,
      type: "condition",
      position: { x: 145, y },
      data: { label: "Condition?" },
      draggable: true,
    }
    setNodes((ns) => [...ns, newNode])
    if (lastStep) {
      setEdges((es) => [
        ...es,
        {
          id: `e${lastStep.id}-${id}`,
          source: lastStep.id,
          target: id,
          markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
          style: { stroke: "#d1d5db" },
        },
      ])
    }
  }

  function handleSave() {
    const stepNodes = nodes.filter((n) => n.type === "step")
    const updatedActivities: Activity[] = stepNodes.map((n) => {
      const existing = activities.find((a) => String(a.id) === n.id)
      return existing
        ? {
            ...existing,
            title: String(n.data.label ?? existing.title),
            owner: String(n.data.owner ?? existing.owner),
            tools: String(n.data.tools ?? existing.tools),
          }
        : {
            id: Number(n.id),
            title: String(n.data.label ?? "New step"),
            description: "",
            owner: String(n.data.owner ?? ""),
            tools: String(n.data.tools ?? ""),
            inputDoc: "",
            outputDoc: "",
            isSubprocess: false,
          }
    })
    setActivities(updatedActivities)
    onClose()
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        onNodeDoubleClick={handleNodeDoubleClick}
        onMoveEnd={(_, vp) => setZoom(Math.round(vp.zoom * 100))}
        minZoom={0.2}
        maxZoom={2}
        deleteKeyCode="Delete"
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1.5} color="#d1d5db" style={{ backgroundColor: "#ffffff" }} />

        {/* Left toolbar: add step / add condition */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <button
            onClick={addStep}
            title="Add step"
            className="w-8 h-8 rounded border border-border bg-card shadow-xs flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={addCondition}
            title="Add condition"
            className="w-8 h-8 rounded border border-orange-300 bg-card shadow-xs flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="7" y="0.5" width="9" height="9" rx="1" transform="rotate(45 7 0.5)" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 4.5v5M4.5 7h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Top-left zoom controls */}
        <div className="absolute top-3 left-12 z-10 flex items-center gap-1 bg-card border border-border rounded-lg px-1 shadow-xs">
          <button
            onClick={handleZoomOut}
            className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground w-10 text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Top-right: Save and exit */}
        <div className="absolute top-3 right-3 z-10">
          <Button size="sm" className="gap-1.5 text-xs" onClick={handleSave}>
            <Save className="h-3.5 w-3.5" />
            Save and exit
          </Button>
        </div>
      </ReactFlow>

      {/* Step edit dialog */}
      <Dialog open={!!editingStep} onOpenChange={(open) => { if (!open) setEditingStep(null) }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Edit step {editingStep ? allStepsForDialog.findIndex((s) => s.id === editingStep.id) + 1 : ""}
            </DialogTitle>
          </DialogHeader>
          {editingStep && (
            <StepCard
              step={editingStep}
              allSteps={allStepsForDialog}
              onChange={handleStepChange}
            />
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" size="sm" onClick={() => setEditingStep(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleStepSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function DiagramCanvas(props: DiagramCanvasInnerProps) {
  return (
    <ReactFlowProvider>
      <DiagramCanvasInner {...props} />
    </ReactFlowProvider>
  )
}
