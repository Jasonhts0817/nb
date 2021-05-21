describe("nb", function () {
  var NB = require('./nb.js');
  var nb;
  var imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
  var somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
  var tooManyCooks = ['c', 'g', 'f'];
  var iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
  var babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
  var creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
  var paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
  var toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
  var bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
  var label = { easy: 'easy', medium: 'medium', hard: 'hard' }

  beforeAll(function () {
    nb = new NB();
    nb.train(imagine, label.easy);
    nb.train(somewhere_over_the_rainbow, label.easy);
    nb.train(tooManyCooks, label.easy);

    nb.train(iWillFollowYouIntoTheDark, label.medium);
    nb.train(babyOneMoreTime, label.medium);
    nb.train(creep, label.medium);

    nb.train(paperBag, label.hard);
    nb.train(toxic, label.hard);
    nb.train(bulletproof, label.hard);

    nb.setLabelProbabilities();
    nb.setChordCountsInLabels();
    nb.setProbabilityOfChordsInLabels();
  });

  describe("train", function () {
    it("allChords 沒有重複", function () {
      expect(nb.allChords.length).toBe(37);
    });

    it("labelCounts 計數正確", function () {
      expect(nb.labelCounts[label.easy]).toBe(3);
    });
  });

  describe("getNumberOfSongs", function () {
    it("songs 計數正確", function () {
      expect(nb.getNumberOfSongs()).toBe(9);
    });

  });

  describe("setLabelProbabilities", function () {
    it("LabelProbabilities 計算正確", function () {
      expect(nb.labelProbabilities[label.easy]).toBe(nb.labelCounts[label.easy] / nb.getNumberOfSongs());
    });
  });

  describe("setChordCountsInLabels", function () {
    it("chordCountsInLabels 計算正確", function () {
      var easy = { c: 3, cmaj7: 1, f: 3, am: 2, dm: 1, g: 3, e7: 1, em: 1 };
      expect(nb.chordCountsInLabels[label.easy]).toEqual(easy);
    });
  });

  describe("setProbabilityOfChordsInLabels", function () {
    it("probabilityOfChordsInLabels 計算正確", function () {
      var easy = { c: 3, cmaj7: 1, f: 3, am: 2, dm: 1, g: 3, e7: 1, em: 1 };
      Object.keys(easy).map(k => easy[k] = easy[k] * 1.0 / nb.songs.length)
      expect(nb.probabilityOfChordsInLabels[label.easy]).toEqual(easy);
    });
  });

  describe("classify", function () {
    it("classify 計算正確", function () {
      var chords = ['d', 'g', 'e', 'dm'];
      var classified = nb.classify(chords);

      var easyClassified = nb.labelProbabilities[label.easy] + 1.01;
      chords.map(chord => {
        var probabilityOfChordInLabel = nb.probabilityOfChordsInLabels[label.easy][chord];
        if (probabilityOfChordInLabel === undefined) {
          easyClassified + 1.01;
        } else {
          easyClassified = easyClassified * (probabilityOfChordInLabel + 1.01);
        }
      });

      expect(classified[label.easy]).toEqual(easyClassified);
    });
  });
});
