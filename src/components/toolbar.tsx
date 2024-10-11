import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Group, Ungroup, Copy, Clipboard, Grid } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onGroup: () => void;
  onUngroup: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onToggleSnap: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  onRedo,
  onGroup,
  onUngroup,
  onCopy,
  onPaste,
  onToggleSnap,
}) => {
  return (
    <TooltipProvider>
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onUndo} variant="outline" size="icon">
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onRedo} variant="outline" size="icon">
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onGroup} variant="outline" size="icon">
              <Group className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Group Nodes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onUngroup} variant="outline" size="icon">
              <Ungroup className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ungroup Nodes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onCopy} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onPaste} variant="outline" size="icon">
              <Clipboard className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Paste</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onToggleSnap} variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Snap to Grid</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};