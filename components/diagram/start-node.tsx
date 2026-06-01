import { Handle, Position } from "@xyflow/react"

export function StartNode() {
  return (
    <div className="px-5 py-2 rounded-full bg-green-100 border border-green-400 text-green-700 text-sm font-medium select-none">
      Start
      <Handle type="source" position={Position.Bottom} className="!bg-green-400 !border-green-600 !w-2 !h-2" />
    </div>
  )
}
