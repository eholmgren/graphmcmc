const assert = require('assert');
const graphmc = require('../index.js');

describe('graphmc graph connectivity', () => {
  it('should correctly say a graph is connected if it is', () => {
    const graph = new graphmc.Graph(4);
    graph.connect(0, 1);
    graph.connect(1, 2);
    graph.connect(2, 3);
    graph.connect(3, 0);
    const result = graphmc.connected(graph);
    assert(result, 'The graph should have been connected');
  });
  it('should correctly say a graph is disconnected if it is', () => {
    const graph = new graphmc.Graph(4);
    graph.connect(0, 3);
    graph.connect(1, 2);
    const result = graphmc.connected(graph);
    assert(!result, 'The graph should be disconnected');
  });
});

describe('graphmc node locations', () => {
  it('should drop vertices into their correct locations', () => {
    const graph = new graphmc.Graph(4);
    graph.place(0, 0, 0);
    graph.place(1, 0, 4);
    graph.place(2, 1, 1);
    graph.place(3, 3, 0);
    assert(graph.nodelocs[2][0] === 1, 'node2.x should read 1');
    assert(graph.nodelocs[1][1] === 4, 'node1.y should read 4');
  });
});

describe('graphmc distance function', () => {
  it('should correctly calculate distance', () => {
    const graph = new graphmc.Graph(2);
    graph.place(0, 1, 1);
    graph.place(1, 4, 5);
    const result = graphmc.eucldist(graph, 0, 1);
    assert(result === 5.0, 'distance should be 5');
  });
});

describe('graphmc weight function', () => {
  it('should correctly calculate the weight of the graph', () => {
    const graph = new graphmc.Graph(4);
    graph.place(0, 0, 0);
    graph.place(1, 0, 4);
    graph.place(2, 5, 12);
    graph.place(3, 3, 0);
    graph.connect(0, 1);
    graph.connect(0, 2);
    graph.connect(1, 3);
    const result = graphmc.weight(graph);
    assert(result === 22.0, 'The weight should be 22');
  });
  it('should declare unconnected graphs as having infinite weight', () => {
    const graph = new graphmc.Graph(2);
    graph.place(0, 0, 0);
    graph.place(1, 1, 1);
    const result = graphmc.weight(graph);
    assert(result >= 1000000, 'The weight should be infinite');
  });
});

describe('graphmc accept function', () => {
  it('should accept a better graph', () => {
    const oldGraph = new graphmc.Graph(4);
    oldGraph.place(0, 0, 0);
    oldGraph.place(1, 0, 1);
    oldGraph.place(2, 1, 1);
    oldGraph.place(3, 1, 0);
    oldGraph.connect(0, 1);
    oldGraph.connect(0, 2);
    oldGraph.connect(0, 3);
    oldGraph.connect(1, 2);
    oldGraph.connect(1, 3);
    oldGraph.connect(2, 3);
    const newGraph = new graphmc.Graph(4);
    newGraph.place(0, 0, 0);
    newGraph.place(1, 0, 1);
    newGraph.place(2, 1, 1);
    newGraph.place(3, 1, 0);
    newGraph.connect(0, 1);
    newGraph.connect(1, 2);
    newGraph.connect(2, 3);
    newGraph.connect(3, 0);
    assert(graphmc.accept(oldGraph, newGraph, 5), 'The graph should be accepted');
  });
});
