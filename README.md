# graph-mc [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> MCMC for optimizing network efficiency

## Installation

```sh
$ npm install --save graph-mc
```

## Description

This project uses Monte Carlo methods on a Markov Chain between different graph states. Points are placed on a plane using ```graph.place(index, x, y)```, with the first point being a source node. Distances between points are given by the Euclidean distance between them. Edges in a graph are drawn using ```graph.connect(v1, v2)```.

Graphs are proposed from the previous graph by either adding an edge, deleting an edge, or swapping two existing edges. Graphs are accepted based on their relative goodness, which incorporates connectedness, total edge weights, and total source-to-node path lengths. The relative goodness equation is shown below.

$$f(X_i,X_j) = e^{-(wt(X_j) - wt(X_i))/T}$$


Summary statistics such as expected total number of edges, expected central edges, expected furthest distance, and top 1% of graphs are given. 

## Usage

The current usage for this project requires the user to edit index.js runall() function with their graph locations using ```graph.place``` and ```graph.connect``` as decribed above. Running the runall() function will perform the Monte Carlo simulation and print out the summary statistics to the command line.


## License

Apache-2.0 © [Eric Holmgren]()


[npm-image]: https://badge.fury.io/js/graph-mc.svg
[npm-url]: https://npmjs.org/package/graph-mc
[travis-image]: https://travis-ci.org/eholmgren/graph-mc.svg?branch=master
[travis-url]: https://travis-ci.org/eholmgren/graph-mc
[daviddm-image]: https://david-dm.org/eholmgren/graph-mc.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/eholmgren/graph-mc
[coveralls-image]: https://coveralls.io/repos/eholmgren/graph-mc/badge.svg
[coveralls-url]: https://coveralls.io/r/eholmgren/graph-mc
