import React, { memo, ReactNode } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';

interface CustomNodeProps extends NodeProps {
  data: {
    label: ReactNode;
  };
}

export const CustomNode = memo(({ data, selected }: CustomNodeProps) => {
  return (
    <>
      <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
      />
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
        <div className="flex items-center justify-center">
          <div className="text-sm font-semibold text-gray-700">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </>
  );
});

CustomNode.displayName = 'CustomNode';