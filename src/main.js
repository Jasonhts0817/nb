var NB = require('./feature/nb/nb.js');

// songs
imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
tooManyCooks = ['c', 'g', 'f'];
iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];

var nb = new NB();

nb.getNumberOfSongs();
nb.train(imagine, 'easy');
nb.train(somewhere_over_the_rainbow, 'easy');
nb.train(tooManyCooks, 'easy');

nb.train(iWillFollowYouIntoTheDark, 'medium');
nb.train(babyOneMoreTime, 'medium');
nb.train(creep, 'medium');

nb.train(paperBag, 'hard');
nb.train(toxic, 'hard');
nb.train(bulletproof, 'hard');

nb.setLabelProbabilities();
nb.setChordCountsInLabels();
nb.setProbabilityOfChordsInLabels();
nb.classify(['d', 'g', 'e', 'dm']);
nb.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);