import {
  markNodeData
} from './util'

let nodeIdSeed = 1

export default class Node {
  constructor(options) {
    this.id = nodeIdSeed++
    this.data = null;

    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name]
      }
    }
  }

  setData(data) {
    if (!Array.isArray(data)) {
      markNodeData(this, data)
    }
    this.data = data
  }
}