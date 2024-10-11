"use client";

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  OnSelectionChangeParams,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { CustomNode } from "@/src/components/custom-node";
import { useUndoRedo } from "@/src/hooks/useUndoRedo";
import { useGroupNodes } from "@/src/hooks/useGroupNodes";
import { useAutoSave } from "@/src/hooks/useAutoSave";
import { Toolbar } from "@/src/components/toolbar";
import { useCopyPaste } from "@/src/hooks/useCopyPaste";
import { useHelperLines } from "@/src/hooks/useHelperLines";


const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "2", type: "custom", position: { x: 0, y: 100 }, data: { label: "Process" } },
  { id: "3", type: "custom", position: { x: 0, y: 200 }, data: { label: "Decision" } },
  { id: "4", type: "custom", position: { x: -100, y: 300 }, data: { label: "Output A" } },
  { id: "5", type: "custom", position: { x: 100, y: 300 }, data: { label: "Output B" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
];

const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElements, setSelectedElements] = useState<Node[]>([]);

  const { undo, redo, takeSnapshot } = useUndoRedo(setNodes, setEdges);
  useAutoSave(nodes, edges);
  const { groupNodes, ungroupNodes } = useGroupNodes(setNodes);
  const { copySelectedElements, pasteElements } = useCopyPaste(nodes, edges, setNodes, setEdges);
  const { snapToGrid, toggleSnapToGrid } = useHelperLines();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      takeSnapshot();
    },
    [setEdges, takeSnapshot]
  );

  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    setSelectedElements(params.nodes || []);
  }, []);

  const onNodeDragStop = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  return (
    <div className="w-full h-screen">
      <Toolbar
        onUndo={undo}
        onRedo={redo}
        onGroup={() => groupNodes(selectedElements)}
        onUngroup={() => ungroupNodes(selectedElements)}
        onCopy={() => copySelectedElements(selectedElements)}
        onPaste={pasteElements}
        onToggleSnap={toggleSnapToGrid}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        snapToGrid={snapToGrid}
        snapGrid={[15, 15]}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

const Page = () => {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  );
};

export default Page;