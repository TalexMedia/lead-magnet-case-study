// Regenerates content.js. BLOCKS are copied byte for byte from the block library.
// Run from this folder:  node build-content.js
const fs = require('fs');
const path = require('path');
const libPath = path.join(__dirname, '..', '..', 'ProspectAudit', 'templates', 'format-blocks.json');
const lib = JSON.parse(fs.readFileSync(libPath, 'utf8')).blocks;

const used = [
  'stunt-volvo-live-tests', 'test-blendtec-will-it-blend', 'challenge-cat-trials',
  'sitcom-adobe-marketers', 'sitcom-dennys-grand-slams', 'sitcom-floqast-pbc',
  'docuseries-yeti-presents', 'docuseries-sequoia-crucible', 'docuseries-mailchimp-second-act'
];
const blocks = {};
for (const id of used) { if (!lib[id]) throw new Error('missing block ' + id); blocks[id] = lib[id]; }

const ROUNDS = [
  {
    id: 'prove-the-product',
    job: 'Three series that prove a product by testing it for real',
    measure: 'views on the top film',
    measureStat: 0,
    blocks: ['stunt-volvo-live-tests', 'test-blendtec-will-it-blend', 'challenge-cat-trials'],
    why: {
      question: 'One of these is true of the series that reached the most people. Which one?',
      options: [
        { block: 'test-blendtec-will-it-blend', text: 'The first film reportedly cost fifty dollars.' },
        { block: 'stunt-volvo-live-tests', text: 'The series put a film star between two reversing trucks.' },
        { block: 'challenge-cat-trials', text: 'The operators who run the machines every day did the challenges.' }
      ]
    },
    takeaway: 'The format is the same in all three: one claim, one real test. Blendtec ran the format on a first film that reportedly cost fifty dollars. Volvo ran the same format with a film star and two trucks. The format did not change. The size of the swing did.'
  },
  {
    id: 'comedy-for-the-people-you-sell-to',
    job: 'Three scripted comedies made by a company for the people it sells to',
    measure: 'views on the episode in our library',
    measureStat: 0,
    blocks: ['sitcom-adobe-marketers', 'sitcom-dennys-grand-slams', 'sitcom-floqast-pbc'],
    why: {
      question: 'One of these is true of the series that reached the most people. Which one?',
      options: [
        { block: 'sitcom-dennys-grand-slams', text: 'The cast is the items on a breakfast menu, animated.' },
        { block: 'sitcom-adobe-marketers', text: 'The series was written with Saturday Night Live talent and released weekly.' },
        { block: 'sitcom-floqast-pbc', text: 'The company released the series under its own studio name.' }
      ]
    },
    takeaway: 'Adobe and FloQast are both software companies that made a comedy for the people they sell to. The format is identical. Adobe wrote the series with Saturday Night Live talent, cast known names and released an episode every week. FloQast made PBC in house under its own studio name. Both series did the job they were made for. The reach came from the production choices, not from the idea.'
  },
  {
    id: 'one-person-tells-their-story',
    job: 'Three documentary series where one person an episode tells their own story',
    measure: 'views on the top film or episode in our library',
    measureStat: 0,
    blocks: ['docuseries-yeti-presents', 'docuseries-sequoia-crucible', 'docuseries-mailchimp-second-act'],
    why: {
      question: 'One of these is true of the series that reached the most people. Which one?',
      options: [
        { block: 'docuseries-sequoia-crucible', text: 'A partner at the firm hosts every episode.' },
        { block: 'docuseries-yeti-presents', text: 'The company has published ninety of these films.' },
        { block: 'docuseries-mailchimp-second-act', text: "The episodes run on the producer's channel, not the brand's." }
      ]
    },
    takeaway: 'All three share one shape: one person an episode telling their own story, with the company as the host. YETI has made ninety films. Sequoia and Mailchimp have each made two seasons. The library with the most reach is also the library that kept going the longest.'
  }
];

const COPY = {
  brand: 'Talex Media',
  eyebrow: 'A self-guided case study',
  title: 'Which one worked best?',
  lead: 'Nine real business videos. Three rounds. You call the winner, then we show you what actually happened.',
  intro: [
    'Every company sends case studies. This one asks you first.',
    'In each round you see three series that were made to do the same job. Rank the three by which reached the most people. Then see the real numbers, and guess what the winner did that the other two did not.',
    'Three rounds take about three minutes. No email is needed.'
  ],
  start: 'Start round one',
  roundLabel: 'Round {n} of {total}',
  rankStep: 'Rank',
  rankLead: 'Rank the three by {measure}.',
  rankInstruction: 'Click the cards below in order: first, then second, then third.',
  rankUndo: 'Click a picked card, or its slot, to undo that pick.',
  slotRemove: 'Remove {name} from {place} place',
  slotEmpty: 'Click a card',
  realOrder: 'The real order',
  youSaidRight: 'You said {place}. Right.',
  youSaidWrong: 'You said {place}. Real place: {real}.',
  yourAnswer: 'Your answer',
  winnerFact: 'The winner\'s fact',
  reasonRow: 'Reason',
  measureNote: 'Every count was read from YouTube on 24 August 2026, the date in each source note. Views measure reach, not quality. All three series in a round worked for the company that made them, which is why all three are in our reference library.',
  reset: 'Reset',
  lock: 'Lock in my ranking',
  revealStep: 'The real order',
  calledWinner: 'You called the winner.',
  missedWinner: 'You had {pick} first. {pick} came {place}.',
  yourPick: 'Your pick: {place}',
  whyStep: 'What did the winner do?',
  whyLead: 'The winner is {winner}.',
  choose: 'Lock in my answer',
  whyRight: 'Right. That is {winner}.',
  whyWrong: 'That is true of {other}, not of {winner}.',
  whyRevealStep: 'What set the winner apart',
  optionTrueOf: 'True of {name}',
  takeawayLabel: 'What we take from this',
  approval: 'Prepared for Talex review. Not yet approved by Tom.',
  sourceLabel: 'Source note for the winner',
  nextRound: 'Round {n}',
  seeResult: 'See my result',
  resultStep: 'Your result',
  resultHeading: 'You called {n} of 6.',
  resultSub: 'Three winners and three reasons. Here is how each round went.',
  resultHigh: 'You read these the way we do. You picked the winners and you saw what set them apart. That is the conversation worth having.',
  resultLow: 'Instinct went one way and the numbers went another. That gap is the work we do every day, and it is a normal place to start.',
  highFrom: 4,
  logWinner: 'Winner',
  logWhy: 'Reason',
  logRight: 'called it',
  logMissed: 'missed it',
  cta: {
    heading: 'Want to talk through your own?',
    copy: 'Tell us what your video needs to do, and we will talk through which of these formats fits.',
    button: 'Book A Call With Our Team',
    url: 'https://calendly.com/talextom/20-min-discovery-call'
  },
  share: 'Send this to a colleague',
  shared: 'Link copied',
  print: 'Print my result',
  startOver: 'Start over',
  sample: 'Every company, video and number on this page is real and links to its source. The rounds, the questions and the notes were prepared by Talex and have not yet been approved by Tom.',
  ordinals: ['first', 'second', 'third']
};

const head = [
  '/* Every word the page shows lives in this file.',
  '   BLOCKS is copied byte for byte from ProspectAudit/templates/format-blocks.json by build-content.js.',
  '   Never edit a block here. Edit the live card, re-extract, run build-content.js again.',
  '   ROUNDS and COPY are the only authored text. The page ranks each round by the',
  '   sourced number in stats[measureStat]; nothing in the code decides a winner by hand. */',
  ''
].join('\n');

const out = head +
  'window.BLOCKS = ' + JSON.stringify(blocks, null, 2) + ';\n\n' +
  'window.ROUNDS = ' + JSON.stringify(ROUNDS, null, 2) + ';\n\n' +
  'window.COPY = ' + JSON.stringify(COPY, null, 2) + ';\n';

fs.writeFileSync(path.join(__dirname, 'content.js'), out, 'utf8');

// Checks
let bad = 0;
for (const id of used) if (JSON.stringify(blocks[id]) !== JSON.stringify(lib[id])) { bad++; console.log('MISMATCH', id); }
for (const r of ROUNDS) {
  const s = new Set(r.why.options.map(o => o.block));
  if (s.size !== 3 || ![...s].every(b => r.blocks.includes(b))) { bad++; console.log('WHY OPTIONS BAD', r.id); }
  for (const b of r.blocks) {
    const fig = lib[b].stats[r.measureStat][0];
    if (!/^[\d,]+$/.test(fig)) { bad++; console.log('MEASURE NOT A PLAIN NUMBER', r.id, b, fig); }
  }
}
console.log('content.js written,', out.length, 'chars;', Object.keys(blocks).length, 'blocks;', bad ? bad + ' PROBLEMS' : 'all checks passed');
