export function getControlPointCoords(points, edge) {
    const affectedPoints = edge.points.map((i) => points[i]);
    const otherAxis = edge.axis === "y" ? "x" : "y";
    return {
      [otherAxis]:
        affectedPoints[0][otherAxis] +
        (affectedPoints[1][otherAxis] - affectedPoints[0][otherAxis]) / 2,
      [edge.axis]: affectedPoints[0][edge.axis]
    };
  }
  
  export function getControlPointAxis(point1, point2) {
    if (point1.y === point2.y && point1.x !== point2.x) {
      return "y";
    }
    return "x";
  }
  
  function calculateExtrudableEdges(points) {
    const endPoints = [points.length - 2, points.length - 1];
    return [
      {
        axis: getControlPointAxis(points[0], points[1]),
        points: [0, 1]
      },
      {
        axis: getControlPointAxis(points[endPoints[0]], points[endPoints[1]]),
        points: endPoints
      }
    ];
  }
  
  function calculateDraggableEdges(points) {
    return points.reduce((edges, point, index) => {
      if (
        index === 0 ||
        index === points.length - 1 ||
        index + 1 === points.length - 1
      ) {
        return edges;
      }
      const nextIndex = index + 1;
      edges.push({
        axis: getControlPointAxis(points[index], points[nextIndex]),
        points: [index, nextIndex]
      });
      return edges;
    }, []);
  }
  
  export function calculateEdges(points, activeDrag = null) {
    const extrudableEdges = calculateExtrudableEdges(points);
    const edges = calculateDraggableEdges(points);
    return {
      points,
      edges,
      extrudableEdges,
      activeDrag,
      dragging: null
    };
  }
  