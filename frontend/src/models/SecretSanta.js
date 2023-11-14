import { difference, min, sample, without } from "underscore";

export default class SecretSanta {
  constructor() {
    this.names = [];
    this.blacklists = Object.create(null);
  }

  add(name) {
    if (this.names.indexOf(name) !== -1)
      throw new Error("Cannot redefine " + name);

    this.names.push(name);

    var subapi = {};

    subapi.blacklist = function (other) {
      if (!Object.prototype.hasOwnProperty.call(this.blacklists, name))
        this.blacklists[name] = [];

      if (this.blacklists[name].indexOf(other) === -1)
        this.blacklists[name].push(other);

      return subapi;
    }.bind(this);

    return subapi;
  }

  generate() {
    var pairings = Object.create(null);
    var candidatePairings = Object.create(null);

    this.names.forEach(function (name) {
      var candidates = difference(this.names, [name]);

      if (Object.prototype.hasOwnProperty.call(this.blacklists, name))
        candidates = difference(candidates, this.blacklists[name]);

      candidatePairings[name] = candidates;
    }, this);

    var findNextGifter = function () {
      var names = Object.keys(candidatePairings);

      var minCandidateCount = min(
        names.map(function (name) {
          return candidatePairings[name].length;
        })
      );
      var potentialGifters = names.filter(function (name) {
        return candidatePairings[name].length === minCandidateCount;
      });

      return potentialGifters[0];
    };

    while (Object.keys(candidatePairings).length > 0) {
      var name = findNextGifter();

      if (candidatePairings[name].length === 0)
        throw new Error(
          "We haven't been able to find a match for " +
            name +
            '! Press "Generate" to try again and, if it still doesn\'t work, try removing some exclusions from your rules. Sorry for the inconvenience!'
        );

      var pairing = sample(candidatePairings[name]);
      delete candidatePairings[name];

      Object.keys(candidatePairings).forEach(function (name) {
        candidatePairings[name] = without(candidatePairings[name], pairing);
      });

      pairings[name] = pairing;
    }

    return pairings;
  }
}
