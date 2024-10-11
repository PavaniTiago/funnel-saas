import { Edge, EdgeTypes, Node, NodeTypes } from "@xyflow/react";
import { useState, useCallback } from "react";

interface CopiedElement {
  id: string;
  position?: { x: number; y: number };
  source?: string;
  target?: string;
}

interface UseCopyPasteReturn {
  copySelectedElements: (selectedElements: CopiedElement[]) => void;
  pasteElements: () => void;
}

export const useCopyPaste = (
  nodes: Node[],
  edges: Edge[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
): UseCopyPasteReturn => {
  const [copiedElements, setCopiedElements] = useState<CopiedElement[]>([]);

  const copySelectedElements = useCallback(
    (selectedElements: CopiedElement[]) => {
      setCopiedElements(selectedElements);
    },
    []
  );

  const pasteElements = useCallback(() => {
    if (!copiedElements) return;

    const newNodes = copiedElements
      .filter((el) => el.position)
      .map((node) => ({
        ...node,
        id: `${node.id}-copy`,
        position: { x: node.position!.x + 50, y: node.position!.y + 50 },
      }));

    const newEdges = copiedElements
      .filter((el) => !el.position)
      .map((edge) => ({
        ...edge,
        id: `${edge.id}-copy`,
        source: `${edge.source}-copy`,
        target: `${edge.target}-copy`,
      }));

    setNodes((nds) => ({ ...nds, ...newNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}) }));
    setEdges((eds) => ({ ...eds, ...newEdges.reduce((acc, edge) => ({ ...acc, [edge.id]: edge }), {}) }));
  }, [copiedElements, setNodes, setEdges]);

  return { copySelectedElements, pasteElements };
};
