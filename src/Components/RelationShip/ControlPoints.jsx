import React from "react";
import { ControlPoint } from "./ControlPoint";
import {
  clearActiveDrag,
  getControlPointCoords,
  setActiveDrag,
  updatePath,
  updatePathFromExtrude,
  updatePathFromTip
} from "./functions";

export function ControlPoints({ path, setPath }) {
  const sourcePoint = path.points[0];
  const destinationPoint = path.points[path.points.length - 1];
  const source = (
    <ControlPoint
      x={sourcePoint.x}
      y={sourcePoint.y}
      type="tip"
      onDragMove={(e) => {
        setPath(updatePathFromTip(path, 0, e.target.getPosition()));
      }}
    />
  );
  const destination = (
    <ControlPoint
      x={destinationPoint.x}
      y={destinationPoint.y}
      type="tip"
      onDragMove={(e) => {
        setPath(
          updatePathFromTip(
            path,
            path.points.length - 1,
            e.target.getPosition()
          )
        );
      }}
    />
  );
  const controls = path.edges.map((edge, index) => {
    const { x, y } = getControlPointCoords(path.points, edge);
    const key = `control-point-${index}`;
    return (
      <ControlPoint
        key={key}
        x={x}
        y={y}
        axis={edge.axis}
        onDragMove={(e) => {
          setPath(updatePath(path, edge, e.target.getPosition()));
        }}
      />
    );
  });
  const extrudables = path.extrudableEdges.map((edge, index) => {
    const { x, y } = getControlPointCoords(path.points, edge);
    const key = `extrude-point-${index}`;
    return (
      <ControlPoint
        key={key}
        x={x}
        y={y}
        axis={edge.axis}
        onDragStart={() => {
          setPath(setActiveDrag(path));
        }}
        onDragMove={(e) => {
          setPath(updatePathFromExtrude(path, edge, e.target.getPosition()));
        }}
        onDragEnd={() => {
          setPath(clearActiveDrag(path));
        }}
      />
    );
  });
  return (
    <>
      {source}
      {controls}
      {extrudables}
      {destination}
    </>
  );
}
