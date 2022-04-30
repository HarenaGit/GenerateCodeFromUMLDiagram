import React, { useState, useEffect } from "react";
import { Path, Group } from "react-konva";
import { ControlPoints } from "./ControlPoints";
import { calculateEdges, getPathData } from "./functions";

export function EditablePath({ x, y, points }) {
  const [path, setPath] = useState(calculateEdges(points));
  const pathData = getPathData(path.points);

  useEffect(() => {
    setPath(calculateEdges(points));
  }, [points]);

  return (
    <Group x={x} y={y}>
      <Path
        x={0}
        y={0}
        data={pathData}
        strokeWidth={1}
        stroke="#b00b69"
        lineCap="round"
        lineJoin="round"
        perfectDrawEnabled={false}
      />
      <ControlPoints path={path} setPath={setPath} />
    </Group>
  );
}
