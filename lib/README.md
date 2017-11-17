# Markov Chain Monte Carlo

### Finding an optimally connected centralized network

##### Eric Holmgren

This project uses Monte Carlo methods on a Markov Chain between different graph states. Points are placed on a plane using ```graph.place(index, x, y)```, with the first point being a source node. Distances between points are given by the Euclidean distance between them. Edges in a graph are drawn using ```graph.connect(v1, v2)```.

Graphs are proposed from the previous graph by either adding an edge, deleting an edge, or swapping two existing edges. Graphs are accepted based on their relative goodness, which incorporates connectedness, total edge weights, and total source-to-node path lengths. 

Summary statistics are given.

##### Milestone 1

Currently implemented is the graph structure drawing, and the graph weight calculations.