# Which one worked best? (v8, the self-guided case study)

Built 2026-09-09 from Tom's feedback on the 9 September call. Prototype. Not deployed.

## What Tom said, and what each point changed

| Tom's feedback | What we built |
|---|---|
| "Everybody sends out case studies. What if we built a self-guided case study?" | The whole tool. Three rounds, each a case study the visitor works through instead of reads. |
| "Here's three examples of content designed to do the same thing. First we ask them to rank them." | Every round is three real series from the approved block library that share one job (prove a product; comedy for the people you sell to; one person tells their own story). Step one is ranking. |
| "Then we reveal which one actually was more effective." | Step two shows the sourced numbers and sorts the cards into their real order. The page ranks by the number in the block's stats. No one picks a winner by hand. |
| "Then they select from a multiple choice why, and we reveal whether their assumptions were correct." | Step three is one question, three options. Every option is a sourced fact about one of the three series. One is true of the winner, two are true of the others. Step four attributes all three and shows the winner's source note. |
| "It works either way: it either reinforces that they get it, or it shows them they need an expert." | Two prepared closings. Four or more of six right gets one, three or fewer gets the other. Neither one criticises the visitor. |
| Evan: "There should be a right answer. Otherwise what is the point?" | Each round names its measure (views, read on the same date from the same source) and the winner is the highest count. Every round has a decisive winner. |
| Evan: "We don't want to shit on a company." | All nine series are in the library because they worked. The page says so at the top of every round. The comparison is reach, never quality. Cleveland Clinic is left out because its YouTube count ignores that it aired on HLN, CNN and Hulu, so ranking it by YouTube reach would be unfair. |
| Tom: "It always says one real person followed for months. No business will spend that. I always change it." | The phrase does not appear anywhere on this page. The one library block that carries it (Cleveland Clinic) is not used. The rule is now in memory so no future card or brief writes it. The block itself still carries the phrase and needs Tom to edit the live card so it can be re-extracted. |
| Tom on the Precedent Playlist: "We can edit it once and then it won't read like AI." | Every word is in `content.js`. Nothing is generated per visitor. Tom edits the file once and it stays edited. |
| Evan: "The AI is never going to invent anything. It's just code." | The nine blocks are copied byte for byte from `format-blocks.json` (checked on generation). The only authored text is the round headings, the three questions, the nine option sentences and three short takeaways, all in one file and all labelled "not yet approved by Tom" on the page. |

## Files

| File | What it is |
|---|---|
| `index.html` | The page and the engine. One render path for every round and every step. |
| `content.js` | Every word. `BLOCKS` (nine library blocks, verbatim), `ROUNDS` (three rounds), `COPY` (page text). |
| `build-content.js` | Regenerates `content.js` from the library and stamps a hash of it onto the `<script src="content.js?v=...">` tag in `index.html`. Run it after any copy change, before deploying. Without the stamp, GitHub Pages can serve a new `index.html` with a stale cached `content.js`, which crashed the rank step on 2026-09-10. |
| `README.md` | This file. |

## How a round works

1. **Rank.** An instruction bar ("Click the cards below in order: first, then second, then third") and three slots that fill with the series name as each card is clicked. Clicking a picked card, or its filled slot, removes that one pick and the others move up; Enter does the same from the keyboard. Reset clears all three. Cards carry the video, the format line and the episode length, all verbatim from the block. Numbers are hidden.
2. **The real order.** A podium: the three in their sourced order, one to three left to right, first place larger with the tallest platform. Every card carries a chip reading "You said second. Real place: first." or "You said third. Right." so the visitor's ranking sits beside the real one.
3. **What did the winner do?** One question, three sourced facts, pick one. The winner is named first, per Tom's flow, so this is a second test rather than the same guess again.
4. **What set the winner apart.** The podium again in compact form, then each fact attributed to its series with "The winner's fact" and "Your answer" chips, the winner's source note with its link, and a short prepared takeaway labelled for Tom's review.

Evan's 2026-09-10 design pass asked for the clearer rank instruction and the podium. The result page repeats the compact podium for each round with a reason row.

The top-left mark is the locked Talex topbar logo from `video-simple.html` (the Wix-hosted PNG with the text fallback), not a placeholder.

## Motion and finish (Evan's 2026-09-10 "more premium" pass)

Brand unchanged: same palette tokens, fonts and logo. What changed is depth, radius and motion.

- Surfaces carry layered shadows and 16px radii; buttons are pills with press feedback; the video facade has a frosted glass play button and a bottom scrim; the header is frosted and sticky with a thin orange progress bar tracking the thirteen steps.
- Every place is the same orange numeral in a circle: on the picked card (large, white ring, pops in), in the slot, and on the podium (largest on first place).
- Picking a card: the card settles, the numeral pops, the slot's name slides in. Only the newest pick animates; re-renders from a pick or an undo do not replay the entrance motion.
- Screen changes fade out, then children rise in with a stagger.
- The winner reveal is a sequence: third rises first, then second, then first lands last; platforms grow up from the floor in the same order; the winner's numeral pops and rings, a spotlight fades in behind it, the card pulses once, and the measured figures count up. Compact recaps read in plain order.
- `prefers-reduced-motion` switches all of it off. The count-up skips when the tab is hidden and has a timer fallback, so a figure is never left at zero.
- Verification note: the Browser pane is usually a hidden tab, which freezes CSS animations and frame callbacks. Motion was verified from the declared animation names and delays via computed styles, plus logic, layout and console; playback itself needs a visible tab.

Score: one for the winner, one for the reason, six in total. The result page lists all three rounds and shows one of two prepared closings.

## What is still open

- Tom has not approved the three round headings, the nine option sentences, the three takeaways or the two closings. The page labels them.
- The measure is reach (views). Tom may prefer a different measure for some rounds. The `measureStat` index in each round points at which stat the page ranks by, so changing the measure is a one-number edit.
- Two library blocks still carry wording Tom said he always changes. Cleveland Clinic says "one real person per episode, followed over months" (not used here). YETI says "one real person per episode" (used in round three, rendered verbatim on its card). Blocks only change when Tom edits the live card and it is re-extracted, so both are library fixes, not v8 fixes. Once the YETI block is re-extracted, run `node build-content.js` and the card updates.
- The language gate has not been run. Mechanical checks only.
- Not deployed. Evan said he would give permission later.
