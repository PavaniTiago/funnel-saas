import { useCallback } from 'react';
import { Node } from '@xyflow/react';

export const useGroupNodes = (setNodes: React.Dispatch<React.SetStateAction<Node[]>>) => {
  const groupNodes = useCallback((selectedNodes: Node[]) => {
    if (!Array.isArray(selectedNodes) || selectedNodes.length < 2) return;

    const groupId = `group-${Date.now()}`;
    const groupNode: Node = {
      id: groupId,
      type: 'group',
      position: { x: 0, y: 0 },
      style: {
        backgroundColor: 'rgba(240, 240, 240, 0.5)',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
      },
      data: {},
    };

    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) => {
        if (selectedNodes.some((selected) => selected.id === node.id)) {
          return { ...node, parentNode: groupId };
        }
        return node;
      });

      return [...updatedNodes, groupNode];
    });
  }, [setNodes]);

  const ungroupNodes = useCallback((selectedNodes: Node[]) => {
    if (!Array.isArray(selectedNodes)) return;

    setNodes((nodes) => {
      return nodes.map((node) => {
        if (selectedNodes.some((selected) => selected.id === node.parentId)) {
          const { parentId, ...rest } = node;
          return rest;
        }
        return node;
      }).filter((node) => !selectedNodes.some((selected) => selected.id === node.id && node.type === 'group'));
    });
  }, [setNodes]);

  return { groupNodes, ungroupNodes };
};