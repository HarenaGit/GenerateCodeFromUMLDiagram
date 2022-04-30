import React, { useRef } from "react";
import { Circle } from "react-konva";

const STROKE_WIDTH = 2;
const RADIUS = 4;
const HOVER_STROKE_WIDTH = 4;
const HOVER_RADIUS = 6;

function dragBoundFunc(pos, axis, anchorRef, type) {
  if (type !== "tip" && anchorRef.current !== null) {
    const staticPos = anchorRef.current.getAbsolutePosition();
    const otherAxis = axis === "y" ? "x" : "y";
    return {
      [axis]: pos[axis],
      [otherAxis]: staticPos[otherAxis]
    };
  }
  return pos;
}

export function ControlPoint({
  x,
  y,
  axis,
  onDragStart,
  onDragMove,
  onDragEnd,
  type = "control"
}) {
  const anchor = useRef(null);
  return (
    <Circle
      x={x}
      y={y}
      radius={RADIUS}
      fill="white"
      stroke="#b00b69"
      strokeWidth={STROKE_WIDTH}
      onMouseEnter={(e) =>
        e.target.to({ strokeWidth: HOVER_STROKE_WIDTH, radius: HOVER_RADIUS })
      }
      onMouseLeave={(e) =>
        e.target.to({ strokeWidth: STROKE_WIDTH, radius: RADIUS })
      }
      draggable
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      ref={anchor}
      dragBoundFunc={(pos) => dragBoundFunc(pos, axis, anchor, type)}
      perfectDrawEnabled={false}
    />
  );
}
