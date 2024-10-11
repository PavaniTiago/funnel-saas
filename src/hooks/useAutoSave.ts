import { Edge, EdgeTypes, Node, NodeTypes } from '@xyflow/react';
import { useEffect, useRef } from 'react';

export const useAutoSave = (nodes: Node[], edges: Edge[]) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('flowData', JSON.stringify({ nodes, edges }));
    };

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(saveData, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [nodes, edges]);
};