"use client"

import { useState } from "react"
import { Handle, Position, useReactFlow } from "@xyflow/react"
import { Trash2 } from "lucide-react"

interface ConditionNodeData {
  label: string
}

export function ConditionNode({ id, data }: { id: string; data: ConditionNodeData }) {
  const [hovered, setHovered] = useState(false)
  const { setNodes, setEdges } = useReactFlow()

  function handleDelete() {
    setNodes((nodes) => nodes.filter((n) => n.id !== id))
    setEdges((edges) => edges.filter((e) => e.source !== id && e.target !== id))
  }

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 110, height: 110 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="!bg-orange-400 !border-orange-500 !w-2 !h-2" style={{ top: 0 }} />

      {/* Diamond shape */}
      <div
        className="absolute inset-0 border-2 border-orange-400 bg-orange-50"
        style={{ transform: "rotate(45deg)", borderRadius: 4 }}
      />

      <div className="relative z-10 text-orange-600 text-xs font-medium text-center px-2 leading-tight">
        {data.label || "Condition?"}
      </div>

      {hovered && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 z-20 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow"
        >
          <Trash2 className="h-2.5 w-2.5" />
        </button>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="!bg-orange-400 !border-orange-500 !w-2 !h-2"
        style={{ bottom: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="no"
        className="!bg-orange-400 !border-orange-500 !w-2 !h-2"
        style={{ right: 0 }}
      />
    </div>
  )
}
