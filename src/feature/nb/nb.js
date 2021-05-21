var _ = require('lodash')
module.exports = class NB {
    songs = [];
    labels = [];
    allChords = [];
    labelCounts = [];
    labelProbabilities = [];
    chordCountsInLabels = {};
    probabilityOfChordsInLabels = {};

    constructor() { }

    train(chords, label) {
        var self = this;
        self.songs.push([label, chords]);
        self.labels.push(label);
        for (var i = 0; i < chords.length; i++) {
            if (!self.allChords.includes(chords[i])) {
                self.allChords.push(chords[i]);
            }
        }
        if (!!(Object.keys(self.labelCounts).includes(label))) {
            self.labelCounts[label] = self.labelCounts[label] + 1;
        } else {
            self.labelCounts[label] = 1;
        }
    };

    classify(chords) {
        var self = this;
        var ttal = self.labelProbabilities;
        var classified = {};
        Object.keys(ttal).forEach(function (obj) {
            var first = self.labelProbabilities[obj] + 1.01;
            chords.forEach(function (chord) {
                var probabilityOfChordInLabel =
                    self.probabilityOfChordsInLabels[obj][chord];
                if (probabilityOfChordInLabel === undefined) {
                    first + 1.01;
                } else {
                    first = first * (probabilityOfChordInLabel + 1.01);
                }
            });
            classified[obj] = first;
        });
        return classified;
    };

    getNumberOfSongs() {
        var self = this;
        return self.songs.length;
    };

    setLabelProbabilities() {
        var self = this;
        Object.keys(self.labelCounts).forEach(function (label) {
            var numberOfSongs = self.getNumberOfSongs();
            self.labelProbabilities[label] = self.labelCounts[label] / numberOfSongs;
        });
    };

    setChordCountsInLabels() {
        var self = this;
        self.songs.forEach(function (i) {
            if (self.chordCountsInLabels[i[0]] === undefined) {
                self.chordCountsInLabels[i[0]] = {};
            }
            i[1].forEach(function (j) {
                if (self.chordCountsInLabels[i[0]][j] > 0) {
                    self.chordCountsInLabels[i[0]][j] =
                        self.chordCountsInLabels[i[0]][j] + 1;
                } else {
                    self.chordCountsInLabels[i[0]][j] = 1;
                }
            });
        });
    }

    setProbabilityOfChordsInLabels() {
        var self = this;
        self.probabilityOfChordsInLabels = _.cloneDeep(self.chordCountsInLabels);
        Object.keys(self.probabilityOfChordsInLabels).forEach(function (i) {
            Object.keys(self.probabilityOfChordsInLabels[i]).forEach(function (j) {
                self.probabilityOfChordsInLabels[i][j] = self.probabilityOfChordsInLabels[i][j] * 1.0 / self.songs.length;
            });
        });
    }
}