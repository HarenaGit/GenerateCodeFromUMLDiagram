export function updatePath(path, edge, position) {
    const newPoints = path.points.map((item, index) => {
      if (edge.points.includes(index)) {
        return {
          ...item,
          [edge.axis]: position[edge.axis]
        };
      }
      return item;
    });
    return {
      ...path,
      points: newPoints
    };
  }
  
  export function getPathData(points) {
    return points
      .map((point) => `${point.command} ${point.x} ${point.y}`)
      .join(" ");
  }
  
  export function updatePathFromExtrude(path, edge, position) {
    // Create copies so can mutate them
    const newPoints = [...path.points];
    const newExtrudableEdges = [...path.extrudableEdges];
    const newActiveDrag = path.activeDrag;
    // Set up configuration, check if starting edge, get the axis to update and the other axis
    // with the node to base the other axis' value off
    const isStartEdge = edge.points[0] === 0;
    const axis = edge.axis;
    const otherAxis = edge.axis === "y" ? "x" : "y";
    const nodeToUpdate = isStartEdge ? 0 : 1;
  
    // update edge's axis with teh current position
    newPoints[edge.points[0]][axis] = position[axis];
    newPoints[edge.points[1]][axis] = position[axis];
  
    // Check if the extruded flag has been set, that means we should create the new edge to extrude
    if (!path.activeDrag.extruded) {
      // Create the new edge using the current axis position and the other axis value from the next or previous point depending on
      // if the extruding edge is at the start or end
      const newCommand = {
        command: "L",
        [axis]: position[axis],
        [otherAxis]: newPoints[edge.points[nodeToUpdate]][otherAxis]
      };
      // Add that new line command into the array after the first line
      newPoints.splice(edge.points[1], 0, newCommand);
      // Set extruded to true so we don't create anymore new edges during the active drag
      newActiveDrag.extruded = true;
      // Update the drag handles so UX wise it feels like we're extruding the edge although at this point
      // we're actually setting the coordinates on the new edge
      if (isStartEdge) {
        newExtrudableEdges[0].points = [1, 2];
        newExtrudableEdges[1].points = [
          newPoints.length - 2,
          newPoints.length - 1
        ];
      } else {
        newExtrudableEdges[1].points = [
          newPoints.length - 3,
          newPoints.length - 2
        ];
      }
    }
    return {
      ...path,
      points: newPoints,
      extrudeableEdges: newExtrudableEdges,
      activeDrag: newActiveDrag
    };
  }
  
  export function updatePathFromTip(path, index, position) {
    // clone points and update position
    const newPoints = [...path.points];
    newPoints[index] = {
      ...newPoints[index],
      ...position
    };
    // Get the index of the other point to update
    const otherIndex = index === 0 ? 1 : index - 1;
    // Calculate the axis that the edge leading to the tip is on
    const axis = path.points[index].y === path.points[otherIndex].y ? "y" : "x";
    // If the position has changed then update the value on the axis to move the edge with the tip
    if (position[axis] !== path.points[index][axis]) {
      newPoints[otherIndex][axis] = position[axis];
    }
    return {
      ...path,
      points: newPoints
    };
  }
  