---
layout: post
title: "What It Feels Like to Rebuild a Company Around a Graph"
subtitle: "Our CEO went forward-deployed into the ontology. The wonder and the friction, honestly."
permalink: rebuilding-our-company
share-img: "https://frankc.net/img-posts/rebuilding-our-company.png"
---

> *"Why are French restaurants so good? Because the waiter is part of the kitchen: he knows the food, the technique, the method, not just the path from the pass to the table."*
>
> — the question Alex Karp asked Shyam Sankar in 2006, which named the forward-deployed engineer a year later

Six weeks ago we went forward-deployed[^fde] in Foundry through Palantir's Startup Fellowship. What it actually feels like, most days, is being reorganized by your own tools. We're building a company brain that runs across several graphs at once, anchored by the ontology in Foundry.[^graphs] An ontology is just a structured model of how the business actually fits together — the concepts and how they relate — in one shared layer humans and agents can both read. Standing that up means unlearning where our truth used to live and relearning how to ask the business questions through the graph. Some of it is wonder. Most of it is just learning. This post is about how we're rebuilding the company, not what we launched.

![Woodcut engraving: operator-builders climb and construct a stepped company structure wired together by acid-green graph edges.](/img-posts/rebuilding-our-company-cover.png)

It clicked for me mid-demo. We were walking through a Salesforce view and I stopped the room: each of these platforms is just a graph—not a chart with axes, but a web of things and the relationships between them. Slack is people, channels, and messages. Linear is tasks linked to projects linked to owners. GitHub is the unique one: it holds both the code and the agents that execute against it, and those runs link back to the Linear tasks they close and the Slack threads they report into. The Foundry ontology is a graph too, all the way down to the vault. And none of them sits alone — a Slack thread points at a Linear task that points at a GitHub pull request, until the dozen disconnected tools resolve into one connected thing. Once you see it you can't unsee it.

The clearest place to watch it happen is our CEO. James Quazi didn't delegate this one. He did the engineering himself, the operator-builder of our business-model ontology, standing up the tools and the harness all of us think through, today and going forward. That meant building and interrogating a model of the business inside the graph, then exposing relevant slices through an investor portal so they can explore our ontology the same way we do, with the same tools we use,[^tools] and trace any answer back to its source rather than trusting a slide. The portal is the visible edge, and it matters. But it isn't the story. The story is what it took him to get the graph right, what he learned about our own business in the fight, and the moment the whole thing came alive once the context was finally true. That's the wonder. Not a tool we bought, a brain we're building, getting sharper every loop.

![Woodcut cutaway: workers tend many different surfaces on top of a stone block whose interior is one dense green node-and-edge graph.](/img-posts/rebuilding-our-company-surfaces.png)

That's the thing I'd lose if I switched off Foundry tomorrow. Keep it in mind for every complaint below. None of these were bad enough to make us reconsider the bet. They were bad enough to cost us days.

---

Onboarding. The biggest thing I'd have called friction wasn't. The tools I learned in early Foundry have evolved, new UX and new mechanics over the same philosophy, and I'm relearning the surfaces with the team. An ontology is an enabling force, like AI: the work is learning to wield it. Onboarding was skill-formation. Shaping the platform to how we think, building scaffolds. Calling that a paper cut would be lying. Slow at first, then load-bearing.

Now the friction that really was friction. For each: what it was, and where honest, what I'd have wanted instead. One caveat up front: this is a moving target. We feed back almost daily through the Fellowship and watch fixes ship against it, so some of what's below will be gone by the time you read it. It still cost us the days.

**We hit the caching edges because we're using it strangely.** AIP Analyst caches functions and datasets aggressively, and that caching is there for good reason: it keeps answers stable and holds errors down for the normal workflow. Ours isn't the normal workflow. We iterate live, rewiring the graph and re-running the analysis in the same breath, so a cache built to protect most teams serves us a stale answer that looks like a bug. We found the edges by hitting them. The good part is who we hit them with: a developer who's maximally humble and high-agency, where every friction we surface, the small stuff and the genuinely surprising stuff like this, becomes feedback that sharpens the platform. A note in the docs would save the next team doing something this weird. Mostly, this is just what the frontier feels like.

**A description in the ontology is load-bearing, and it cut both ways.** This is the one that cost us days. We were rebuilding a model of the business under different assumptions, querying the graph and rewiring it on the fly through a couple of fast functions, and the answers kept coming out subtly wrong. The functions were right. We'd already fixed those. What was wrong was a single load-bearing assumption buried in an object's description. Our first quick pass had written it badly, and Analyst reasons over those descriptions, so the bad one haunted every downstream answer like an old model hallucination. Nothing errored. It was just quietly, exhaustingly wrong. When we finally fixed the description, everything came out beautifully, same functions. The fix was almost embarrassingly small — one sentence in a description rewritten from a guess into what was actually true — and that single edit flipped every downstream answer from subtly wrong to clean. The ontology is what let us navigate back out. Forming the context in the graph was the key, not the code.

![Woodcut engraving: builders set the keystone of a great arch while a small graph and one corrected node anchor it from below, in coral.](/img-posts/rebuilding-our-company-keystone.png)

The general habit we took from it: merge fast. An ontology with a dozen open proposals isn't one graph, it's a dozen maybes, and the agents slow down guessing between them. Cycle time lives or dies on how fast you converge.

The lesson underneath the lesson: you can't vibe your way to this. Fixing that description took understanding our own business well enough to write down what was actually true, then iterating until the graph agreed. The models and harnesses doing the work have amnesia. Last post I called agents without a graph clever interns with amnesia, and the ontology is the cure: it's where the understanding lives, so the next loop starts sharper instead of from zero. We didn't just teach the model our business. We reshaped our own mental models doing it. The craft has to live in the people, not just the plates they pass.

**Evolving an ontology in production is harder than evolving a database.** The apps, the permissions, and the agents all assume the old shape. Older object types that carry multiple data sources hide incompatibilities, so deleting one stale source breaks types downstream. An int-versus-double mismatch surfaces as a wrong number, not an error, which is the worst way for it to surface.

**Without one source of truth, you hand-roll the sync.** Our model of the business runs as two symmetrical repos that reference each other in their READMEs and agent instructions; keeping them in lockstep is operator discipline, not a platform guarantee. So we built scaffolding for it: an AI FDE prompt builder in GitHub, driven from the company brain, that shapes how we use Foundry's different primitives instead of leaving consistency to memory. Every mirror is a place drift can enter.

**Consumer mode is the cost of the unlock I led with.** Bringing outside investors safely onto the ontology meant working through project permissions, org and space boundaries, and ontology-object access rules. It's the friction I'd most expect a founder to underestimate and least want to get wrong, because the worst case is the wrong person seeing the wrong row, not a botched demo.

**The cost was on us before it was on the tool.** AI FDE and AIP Analyst resend and cache context in ways you can't see, so the same action runs from cents to dollars depending on accumulated context. Easy to blame the UX, and it could be clearer. But most of our bill was a skill gap: we hadn't built the habits yet, fresh sessions for heavy context, cheaper models for lighter work, cheap sub-agents for bounded jobs. Learning to read cost was the skill we'd been missing. The tool didn't change; we did.

---

The honest "I don't know": six weeks in, I still can't cleanly separate what's Foundry and what's just the cost of running a live company-graph. The one that genuinely stumps me is consumer mode, bringing outsiders safely onto the ontology so each can explore a trustworthy slice of it. We built it for investors first, but it's really scaffolding. The same pattern is what we'll want for the partners we work with, to show them how our model accelerates theirs, and eventually the homeowners we serve, each needing to see a different slice and trust where the answer came from. Whether that's irreducibly careful work or a primitive Foundry grows next quarter, I can't tell yet, and we're investing in it now precisely to find out. What I'm surer of: the onboarding and the cost discipline were us catching up, and the schema friction is the shape of the thing itself: Foundry is a tool the forward-deployed engineers built for themselves, honed for the people already in the kitchen and never filed down to be sold.

You spend your days on the cutting edge, you pick up small cuts. That's the deal, and I'd take it again.

What I am sure of: every one of these was survivable, and none of them touched the part that matters. James can still rebuild the business inside the graph and watch it answer back, sharper than the week before. That hasn't moved.

Underneath all of it, we're building a kitchen. Everyone close enough to the craft to fix it when it's wrong, nobody just carrying plates from a pass they don't understand. I argued a while back that [the handoff was the bug][handoff]. A kitchen is what's left when you take the handoffs out: knife skills, shared standards, and a graph everyone can read.

[handoff]: /vertical-ai-rewrite

If you're a founder rebuilding around a graph, that's the read: the friction is real, and the reorientation is worth it. We reshaped our own mental models doing it, and six weeks in, I'd make the same call again.

[^fde]: That borrowing has its own borrowing. The kitchen brigade Karp was pointing at was itself modeled on the military: Auguste Escoffier, who had cooked in the French army, built the brigade de cuisine around army command, clear stations and a chain trained to one standard. So the real lineage runs army to kitchen to engineering, and the same bet shows up at every step, that the people at the edge have to understand the whole, not just pass the plate. https://vick.substack.com/p/forward-deployed

[^graphs]: Three of them, really, once you look closely. Memory: what we've learned, in the vault. Execution: what exists and what changed, the Foundry ontology. Coordination: who's doing what right now, across Slack, Linear, and GitHub. The surprise was that the leverage isn't in any one graph, it's in making them talk to each other. I poked at that split in [the last post](/vertical-ai-rewrite); from there the brain reaches a long tail of other tools.

[^tools]: The same workbench we use internally: AIP Analyst for questions and sensitivities, Contour for analysis, Hubble and Monocle for catalog and lineage. The lineage tools are what make tracing an answer back to its source real rather than aspirational.
