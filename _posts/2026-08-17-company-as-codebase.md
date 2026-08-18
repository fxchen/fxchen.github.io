---
layout: post
title: "The Company as a Codebase"
subtitle: "Every workflow ships two artifacts: the result, and a versioned improvement to the system that produced it."
permalink: company-as-codebase
share-img: "https://frankc.net/img-posts/company-as-codebase.png"
bigimg: /img-posts/company-as-codebase-banner.webp
---

A rule with no enforcement is a wish.

Palantir's AI FDE, the agent that builds apps inside Foundry, was missing a tool for creating projects from a template. So I made one project by hand with the browser's network tab open, copied the Compass request sitting underneath the interface, and wired the missing action into our harness.

Then I wrote the request, payload, and sharp edges into our company repo as a reusable skill, because in our repo that part is not optional. The next teammate doesn't have to hunt for it. The next agent doesn't have to guess. Six months from now, neither do I.

The skill became a tool our agents can call, and the next missing piece got the same treatment. The endpoint was the trick. The writeback was the work.

That is the two-artifact rule: every workflow ships the result and a versioned improvement to the system that produced it. The first handles today's task. The second changes where everyone after you begins.

We had already [rebuilt our company around a git-backed brain][rebuild]. The new part was not the repository. It was the merge discipline.

[rebuild]: /rebuilding-our-company
[devcon-video]: https://www.youtube.com/watch?v=quawnFQ0V-o

## The writeback is a pull request

We close each Foundry session with a writeback: what changed, what the prompt got wrong, which functions need tags before an agent can find them.[^writeback] The writeback isn't a note in a doc nobody reads. It's a pull request against the company brain. Reviewed, merged, and deployed back into the ontology descriptions the agents reason over, the prompt builder that shapes the next session, and a skill anyone can run. The unit of work isn't the session. It's the diff the session leaves behind.

![A diff against a file labelled "company brain": a removed line reading "the why lived in one person's head", and an added line reading "written down once, where the next job inherits it".](/img-posts/company-as-codebase-writeback-diff.webp){: width="1200" height="630" loading="lazy" decoding="async"}

The boundary matters. The repo gets the rule, never the record. It holds reusable context: doctrine, ontology descriptions, skills, and review rules. Raw customer PII and system-of-record financial data stay behind Foundry permissions. The pull request changes how the company works with the data; it does not copy the data into git.

And many of the people shipping those diffs are not engineers. The writeback bar is lower than the coding bar: code is not the scarce input. Judgment is. And they already have it.

## The discipline came before the agents

Shipping agents first is rational: capability moves too fast to wait for perfect process. But fast output becomes institutional learning only if review can absorb it. We built the CI discipline first: the repo, its conventions, the review gate, the writeback habit, and the merge discipline.[^ci]

So by the time agents were writing into the brain at volume, the checks already existed. Today the Balto vault's review agent inspects every pull request. Any sensitive PII, missing verdict, or unverified review model fails CI and blocks merge. Ordinary content self-publishes when the checks pass. Human approval is reserved for changes to the gate itself.[^gate]

## The loop without a keyboard

![Frank Chen at a lectern on the Palantir DevCon stage, wearing a headset microphone, in front of a screen showing a company context graph linking contractors and homes through a shared ontology.](/img-posts/company-as-codebase-portrait.webp){: width="1200" height="1799" loading="lazy" decoding="async"}

*Palantir DevCon, July 2026. Photo: Charlie Neely.*

The two-artifact rule would be a nice engineering habit if it stopped at Foundry sessions. At Northern Pacific Power, our operations company, the frontline runs the same loop without anyone touching a keyboard.

The moment a judgment happens — why a permit got held, what an inspector actually wanted, why the team made a call on a hard roof — the operator gets prompted, inside the tool they already work in, and the job doesn't advance until they answer. Thirty seconds of talk-to-text. Each capture is a small pull request against the company brain: here's the result, and here's the why that would otherwise have lived in one person's head until they left.

Then the human gate. Twice a week an agent clusters everything captured, and a human decides what becomes doctrine. The bar is three jobs saying the same thing, or one job that was expensive enough on its own. What clears the bar gets written down once, where the next job inherits it. An inspector's preference at a single install is now a line in a county permitting guide. A change order that hurt once — a question nobody thought to ask during sales — is now a checklist line, and it doesn't get to happen twice. Nobody rediscovers it, because nobody has to.

## The thesis in one workflow

Carl runs the sharpest version in calibration. We build a digital twin of every home we serve, then tune its interacting parameters until the model matches the home's actual usage without getting the right answer for the wrong reason, which is the classic failure mode in building models. That's the first artifact: a locked model of one house.

The second artifact is the loop. Every calibration run feeds its metrics into an ontology and gets compared against a growing set of diagnostics. When a calibration misbehaves, the team root-causes it and captures the cause, so the next time that pattern shows up the system already knows what it's looking at, and the backlog gets prioritized by what the diagnostics say. When something genuinely new appears, an agent traverses the graph and a corpus of building-energy science and proposes a diagnosis, with a human checking the work before anything merges.

Two loops, one shape. Both end the same way: an output, and a system that's sharper for the next pass.

![A woodcut-style figure of an infinity loop, carved in heavy black linework, with arrows running continuously around both halves.](/img-posts/company-as-codebase-two-loops.webp){: width="1200" height="630" loading="lazy" decoding="async"}

## What DevCon changed

At Palantir DevCon in July, I gave this argument on the main stage. Palantir [just posted the talk on YouTube][devcon-video]. The workshops clarified two implementation questions: where a correction should live, and how far an agent should be allowed to range.

![Frank Chen speaking beside a lectern on a black-curtain stage at Palantir DevCon, with green stage accents and no projected slide in frame.](/img-posts/company-as-codebase-devcon-stage.webp){: width="1200" height="630" loading="lazy" decoding="async"}

*Palantir DevCon, July 2026. Photo: Charlie Neely.*

First, put context at the point of use. AI FDE built a plausible scheduling app around an ontology with no attendee concept. The mistake spread into every downstream interface, automation, and function. The durable fix is attaching the correction to the object, property, or column that confused the agent.

Second, size autonomy by blast radius. A scenario agent changed a schedule inside a lightweight branch of operational data, reran the constraints, and discarded the branch without touching production. That is close to the simulation work we already do. Native Scenarios would let us run thousands of simulations without hand-rolling a branch for each one.

Inside a sandbox, let the agent iterate. Before production, keep human judgment at the merge. Before shared doctrine, require a gate that can fail. A merge only proves the correction entered the system. The second artifact compounds when the next person or agent hits the same edge case and takes the right path without asking again.

## What can still break

![Three status rows under the heading "a gate that can fail": BLOCKS MERGE for sensitive PII, a missing verdict, or an unverified review model; SELF-PUBLISHES for ordinary content once the checks pass; HUMAN APPROVAL for changes to the gate itself.](/img-posts/company-as-codebase-gate.webp){: width="1200" height="630" loading="lazy" decoding="async"}

The first failure mode is boredom. CI works in software because a red build is loud and public. Our gates are software in some places — the modal that won't let a job advance, the review agent that fails a pull request on sensitive PII — and culture in others, like the session writeback a tired person could skip on a Friday. The software gates will hold. The human ones are what I watch, because most knowledge systems die the same death: not disproven, just quietly unattended. A couple months of novelty is not evidence against boredom.

The second is closing Carl's gate too early. The cost of a wrong diagnosis merging into doctrine is not symmetric with the cost of a slow one, and "the agent is usually right" is exactly the sentence I'd expect to hear right before doctrine rots. So the gate stays until the diagnostics can catch the agent being wrong, not just the models.

Back to the Compass endpoint. The manual work it saved was gone by lunch. The skill it left in the vault will outlive my memory of writing it, but availability is not inheritance. The receipt comes the next time a teammate or agent reaches the same edge case: do they take the right path without asking? The result depreciates. The improvement compounds only when someone inherits it. Run the company like a codebase, and the second artifact is the company.

[^writeback]: The actual fields, because the specifics are the discipline: what changed in the data source, what the prompt got wrong, which ontology descriptions were missing or misleading, and which functions need tags before agents can find them. A few minutes at the end of a session. It felt like a tax for about two weeks; now a session without one feels unfinished.

[^ci]: Continuous integration was a discipline before it was a product. Teams committed to integrating daily — and dropping everything when the build broke — years before build servers existed to enforce it; the tools encoded a practice that already worked. That order, practice first and automation second, is the entire bet here.

[^gate]: The self-publish default is deliberate: required automated checks review ordinary content, while CODEOWNERS requires human approval for changes to `.github/`, `REVIEW.md`, and `AGENTS.md`. Production-changing operational loops stay human-gated for a different reason: a wrong change costs more than a slow one.
