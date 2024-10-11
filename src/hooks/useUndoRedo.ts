import { useState, useCallback } from "react";
import { Node, Edge } from "@xyflow/react";

export const useUndoRedo = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(-1);

  const takeSnapshot = useCallback(() => {
    setNodes((nodes) => {
      setEdges((edges) => {
        const currentState = { nodes, edges };
        setHistory((prev) => {
          const newHistory = [...prev.slice(0, currentIndex + 1), currentState];
          setCurrentIndex(newHistory.length - 1);
          return newHistory;
        });
        return edges;
      });
      return nodes;
    });
  }, [setNodes, setEdges, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const prevState = history[currentIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, history, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const nextState = history[currentIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, history, setNodes, setEdges]);

  return { undo, redo, takeSnapshot };
};
