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
 * This graph returns the Euclidean distance between two points
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

function dijkstra(graph, start, end) {
  let weights = { 0: 0 };
  let finished = [];
  let front = [0];
  while (front !== [end]) {
    let newFront = [];
    for (let i = 0; i < front.length; i++) {
      for (let e = 0; e < graph.edges.length; e++) {
        if (graph.edge[e][0] === front[i]) {
          newFront.push(graph.edge[e][1]);
          if (graph.edge[e][0] in weights) {
            weights[graph.edge[e][0]] = Math.min(
              weights[graph.edge[e][0]],
              eucldist(e, graph.edge[e][0])
            );
          } else {
            weights[graph.edge[e][0]] = eucldist(e, graph.edge[e][0]);
          }
        } else if (graph.edge[e][1] === front[i]) {
          newFront.push(graph.edge[e][1]);
          if (graph.edge[e][1] in weights) {
            weights[graph.edge[e][1]] = Math.min(
              weights[graph.edge[e][1]],
              eucldist(e, graph.edge[e][1])
            );
          } else {
            weights[graph.edge[e][1]] = eucldist(e, graph.edge[e][1]);
          }
        }
      }
    }
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

// Everything below this line is past the first milestone
function deleteEdge(graph) {
  return graph;
}

function addEdge(graph) {
  return graph;
}

function swapEdge(graph) {
  return graph;
}

function propose(oldGraph) {
  let roll = Math.random();
  if (roll < 0.333) {
    return deleteEdge(oldGraph);
  } else if (roll < 0.667) {
    return addEdge(oldGraph);
  }
  return swapEdge(oldGraph);
}

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

module.exports = { Graph, connected, eucldist, weight, dijkstra, propose, accept };
