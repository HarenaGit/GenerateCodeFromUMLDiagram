import { calculateEdges } from "./edges";

export function setActiveDrag(path) {
  return {
    ...path,
    activeDrag: {
      extruded: false
    }
  };
}

export function clearActiveDrag(path) {
  const newPath = calculateEdges(path.points);
  return {
    ...newPath,
    activeDrag: null
  };
}
