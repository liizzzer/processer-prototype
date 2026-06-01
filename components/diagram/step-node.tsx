"use client"

import { useState } from "react"
import { Handle, Position, useReactFlow } from "@xyflow/react"
import { GripVertical, Trash2 } from "lucide-react"

interface StepNodeData {
  label: string
  owner?: string
  stepNumber?: number
}

export function StepNode({ id, data }: { id: string; data: StepNodeData }) {
  const [hovered, setHovered] = useState(false)
  const { setNodes, setEdges } = useReactFlow()

  function handleDelete() {
    setNodes((nodes) => nodes.filter((n) => n.id !== id))
    setEdges((edges) => edges.filter((e) => e.source !== id && e.target !== id))
  }

  return (
    <div
      className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg bg-card border border-border text-sm min-w-[160px] max-w-[220px] select-none shadow-xs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="!bg-border !border-border !w-2 !h-2" />

      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate">{data.label || "New step"}</div>
        {data.owner && (
          <div className="text-xs text-muted-foreground truncate">{data.owner}</div>
        )}
      </div>

      <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />

      {hovered && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow"
        >
          <Trash2 className="h-2.5 w-2.5" />
        </button>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-border !border-border !w-2 !h-2" />
    </div>
  )
}
