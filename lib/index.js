'use strict';

Math.seed = 0;

class Graph {
  constructor(nnodes) {
    this.nodes = nnodes;
    this.edges = Array(0);
    this.nodelocs = Array(nnodes);
  }

  connect(start, end) {
    this.edges.push([start, end]);
  }

  place(idx, x, y) {
    this.nodelocs[idx] = [x, y];
  }
}

/**
 * This function determines if nodes i and j are connected in a graph
 * @param {Graph} graph
 * @param {Number} i
 * @param {Number} j
 * @param {Array} visited
 */
function connectedNodes(graph, i, j, visited = []) {
  if (i === j) return true;
  for (let index = 0; index < graph.edges.length; index++) {
    const e = graph.edges[index];
    if ((e[0] === i && e[1] === j) || (e[1] === i && e[0] === j)) return true;
  }
  for (let index = 0; index < graph.edges.length; index++) {
    const e = graph.edges[index];
    if (
      e[0] === i &&
      !visited.reduce((pv, v) => {
        return pv || v === e[1];
      }, false)
    ) {
      if (connectedNodes(graph, e[1], j, visited.concat([i]))) return true;
    }
    if (
      e[1] === i &&
      !visited.reduce((pv, v) => {
        return pv || v === e[0];
      }, false)
    ) {
      if (connectedNodes(graph, e[0], j, visited.concat([i]))) return true;
    }
  }
}

/**
 * This function determines if a graph is connected
 * @param {Graph} graph
 */
function connected(graph) {
  for (let i = 0; i < graph.nodes; i++) {
    for (let j = i + 1; j < graph.nodes; j++) {
      if (!connectedNodes(graph, i, j)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * This function returns the Euclidean distance between two points
 * @param {Graph} graph
 * @param {Number} v1
 * @param {Number} v2
 * @return {Number} distance
 */
function eucldist(graph, v1, v2) {
  let x1 = graph.nodelocs[v1][0];
  let x2 = graph.nodelocs[v2][0];
  let y1 = graph.nodelocs[v1][1];
  let y2 = graph.nodelocs[v2][1];
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * This function performs dijkstra's agorithm
 * @param {Graph} graph
 * @param {Number} start
 * @param {Number} end
 */
function dijkstra(graph, start, end) {
  let weights = { start: 0 };
  let finished = [];
  let front = [start];
  while (front !== [end]) {
    // Iterate until all nodes used up
    let newFront = [];
    for (let i = 0; i < front.length; i++) {
      // Iterate over front
      for (let e = 0; e < graph.edges.length; e++) {
        // Check each edge
        if (graph.edge[e][0] === front[i]) {
          newFront.push(graph.edge[e][1]);
          if (graph.edge[e][0] in weights) {
            weights[graph.edge[e][0]] = Math.min(
              weights[graph.edge[e][0]],
              eucldist(e, graph.edge[e][0]) + weights[i]
            );
          } else {
            weights[graph.edge[e][0]] = eucldist(e, graph.edge[e][0]) + weights[i];
          }
        } else if (graph.edge[e][1] === front[i]) {
          newFront.push(graph.edge[e][1]);
          if (graph.edge[e][1] in weights) {
            weights[graph.edge[e][1]] = Math.min(
              weights[graph.edge[e][1]],
              eucldist(e, graph.edge[e][1]) + weights[i]
            );
          } else {
            weights[graph.edge[e][1]] = eucldist(e, graph.edge[e][1]) + weights[i];
          }
        }
      }
    }
    finished.append(front);
    front = end + finished; // Just to let it compile while testing. Trash this in real code
  }
  return 0;
}

/**
 * This function gives the weight of a network with parameter r determining the relation between edge weight and path weight
 * @param {Graph} graph
 * @param {Number} r
 * @return {Number} weight
 */
function weight(graph, r = 1) {
  if (!connected(graph)) {
    return 1000000;
  }
  let wte = 0;
  let wtp = 0;
  for (let i = 0; i < graph.edges.length; i++) {
    let v1 = graph.edges[i][0];
    let v2 = graph.edges[i][1];
    wte += eucldist(graph, v1, v2);
  }
  for (let i = 1; i < graph.nodes; i++) {
    wtp += dijkstra(graph, 0, i);
  }
  let weight = wte * r + wtp;
  return weight;
}

/**
 * Function deletes a random edge from a graph
 * @param {Graph} graph
 */
function deleteEdge(graph) {
  const newGraph = new Graph(graph.nodes);
  newGraph.nodelocs = graph.nodelocs;
  let index = Math.floor(Math.random() * graph.edges.length);
  graph.edges.splice(index, 1);
  newGraph.edges = graph.edges;
  return newGraph;
}

/**
 * Function tries to add random edge to a graph
 * @param {Graph} graph
 */
function addEdge(graph) {
  const newGraph = new Graph(graph.nodes);
  newGraph.nodelocs = graph.nodelocs;
  newGraph.edges = graph.edges;
  let i = 0;
  while (i < 1000) {
    // Give it up to 1000 tries to find acceptable edge (prevents doubling existing edge)
    i += 1;
    // Grab two random nodes
    let m = 0; // Math.floor(Math.random() * newGraph.nodes);
    let n = 1; // Math.floor(Math.random() * newGraph.nodes);
    // If these aren't an edge and are distinct, accept the new edge and break
    if (
      !(newGraph.edges.includes([m, n]) || newGraph.edges.includes([n, m])) &&
      m !== n
    ) {
      console.log(newGraph.edges.includes((0, 1)));
      console.log(`SURE WHY NOT ${m} ${n}`);
      newGraph.connect(m, n);
      break;
    }
  }
  console.log(`IIIIII ${i}`);
  console.log(newGraph);
  console.log([[0, 1]].includes([0, 1]));
  return newGraph;
}

/**
 * Function swaps two viable edges in a graph
 * @param {Graph} graph
 */
function swapEdge(graph) {
  const newGraph = new Graph(graph.nodes);
  newGraph.nodelocs = graph.nodelocs;
  let i = 0;
  console.log('START HERE AAAAAAAAAAA');
  console.log(graph);
  while (i < 1000) {
    // Give it 1000 tries to find swap
    i += 1;
    let e1 = graph.edges[Math.floor(Math.random() * graph.edges.length)];
    let e2 = graph.edges[Math.floor(Math.random() * graph.edges.length)];
    if (new Set([e1[0], e1[1], e2[0], e2[1]]).size === 4) {
      // Edges don't share vertices
      for (let j = 0; j < graph.edges.length; j++) {
        console.log('LOOP');
        console.log(`E1 ${e1}`);
        console.log(typeof e1);
        console.log(e1 === [0, 1]);
        if (
          !(
            graph.edges[j] === [e1[0], e1[1]] ||
            graph.edges[j] === [e2[0], e2[1]] ||
            graph.edges[j] === [e1[1], e1[0]] ||
            graph.edges[j] === [e2[1], e2[0]]
          )
        ) {
          newGraph.edges.push(graph.edges[j]);
          console.log(`${j} and ${graph.edges[j]}`);
        }
      }
      newGraph.connect(e1[0], e2[0]);
      newGraph.connect(e1[1], e1[1]);
      break;
    }
  }
  return newGraph;
}

/**
 * Function proposes new graph by adding, deleting, or swapping edge
 * @param {Graph} oldGraph
 */
function propose(oldGraph) {
  let roll = Math.random();
  if (roll < 0.333) {
    return deleteEdge(oldGraph);
  } else if (roll < 0.667) {
    return addEdge(oldGraph);
  }
  return swapEdge(oldGraph);
}

/**
 * Function decides whether or not to accept new graph based on relative goodness
 * @param {Graph} oldGraph
 * @param {Graph} newGraph
 * @param {Number} T
 */
function accept(oldGraph, newGraph, T) {
  let goodness = Math.exp(-(weight(newGraph) - weight(oldGraph)) / T);
  let rate = Math.min(1, goodness);
  console.log(`rate ${rate}`);
  let roll = Math.random();
  console.log(`roll ${roll}`);
  if (roll > rate) {
    return false;
  }
  return true;
}

/**
 * Function iterates over list of graph objects to calculate summary statistics
 * @param {Array} graphList
 */
function summary(graphList) {
  let centerEdges = 0;
  let totalEdges = 0;
  let maxDists = 0;
  let totalGraphs = graphList.length;
  for (let g = 0; g < graphList; g++) {
    totalEdges += g.edges.length;
    for (let e = 0; e < g.edges.length; e++) {
      if (e[0] === 0 || e[1] === 0) {
        centerEdges += 1;
      }
    }
    let currMax = 0;
    for (let n = 0; n < g.nodelocs.length; n++) {
      let dist = dijkstra(g, 0, n);
      if (dist > currMax) {
        currMax = dist;
      }
    }
  }
  let expectedCenterEdges = centerEdges / totalGraphs;
  let expectedEdges = totalEdges / totalGraphs;
  let expectedMaxDist = maxDists / totalGraphs;
  console.log(`Expected edges from source: ${expectedCenterEdges}`);
  console.log(`Expected edges in graph: ${expectedEdges}`);
  console.log(`Expected maximum distance from center: ${expectedMaxDist}`);
}

/**
 * Main loop
 */
function runall(tries = 1000, T = 3) {
  // Create custome initial graph here
  let graph = new Graph(6);
  graph.place(0, 0, 0);
  graph.place(1, 4, 3);
  graph.place(2, 2, 5);
  graph.place(3, 1, 0);
  graph.place(4, 6, 1);
  graph.place(5, 6, 7);
  graph.connect(0, 1);
  graph.connect(1, 2);
  graph.connect(2, 3);
  graph.connect(3, 4);
  graph.connect(4, 5);
  let oldGraph = graph;
  let graphList = [graph];
  for (let iter = 0; iter < tries; iter++) {
    let newGraph = propose(oldGraph);
    if (accept(oldGraph, newGraph, T)) {
      oldGraph = newGraph;
      graphList.push(oldGraph);
    } else {
      graphList.push(oldGraph);
    }
  }
  summary(graphList);
}

// [Uncomment this line] runall();

module.exports = {
  Graph,
  connected,
  eucldist,
  weight,
  dijkstra,
  deleteEdge,
  addEdge,
  swapEdge,
  propose,
  accept,
  summary,
  runall
};
