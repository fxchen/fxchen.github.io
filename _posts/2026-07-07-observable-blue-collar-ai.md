---
layout: post
title: "Blue-Collar AI Is an Observability Problem"
subtitle: "The hard part is ground truth, and ground truth clocks in with the crew."
permalink: observable-blue-collar-ai
share-img: "https://frankc.net/img-posts/observable-blue-collar-ai.png"
---

One year ago, Andrew didn't have the words. Not in the fake-humble way. He's the CEO of the operations company we're forward-deployed with, and back then, literally: ontology was jargon, observability was a software team's problem, and AI inside a residential energy contractor sounded like a demo from another universe.

A few weeks ago he wrote a public post describing his company as a context graph.

His words. Nobody at Balto drafted that sentence, and no benchmark we could publish would say more.

The thesis, stated plainly: blue-collar AI is an observability problem, not a model problem. In a physical, high-trust business, AI becomes useful only when the people closest to reality can write reality into the system, see how the system reasons, and correct it before a mistake becomes customer-facing work. The ontology is the substrate. Observability is the trust layer. Field notes are the maintenance loop. One rule underneath all of it: the field writes back, or the graph goes stale and starts lying politely.

And forward-deployed engineering doesn't solve it. I say that as the forward-deployed party. You can deploy engineers to build the graph. You can't deploy anyone to keep it true. Keeping it true is the experience of running the business, field note to customer promise, and it has to be owned end-to-end from inside.

![Woodcut engraving: a dense stone lattice of graph nodes and edges fills the frame, and a single work-gloved hand reaches in from the edge to land one decisive acid-green check on a node—the field correcting the graph, trust flowing from the edge in.](/img-posts/observable-blue-collar-ai-corrected-node.webp){: width="1536" height="1024" loading="lazy" decoding="async"}

## The wrong story

The easy version of this post is "AI for contractors": the data is messy, we connect it, the model helps them decide. True, and it misses the part that matters.

Residential energy is not a clean SaaS workflow. It's roofs, utility rules, permit offices, equipment substitutions, truck rolls, weather, customer trust, and local weirdness. A model can be impressive in a demo and still fail the moment it touches a job that doesn't look like the last one. And failure here isn't abstract. An estimate is a promise about someone's house. The hard part is ground truth.

## The AI sandwich

The frame that stuck, the one Andrew now explains to other people without us in the room, is what we call the AI sandwich.[^sandwich]

On one side, deterministic layers prepare context before the model sees anything: the ontology, the canonical records, the permit data that's been cleaned and cross-checked. On the other side, deterministic layers evaluate, route, and constrain what the model produces before any of it touches a customer. The model sits in the middle, doing the flexible work models are actually good at.

![Woodcut cutaway: a heavy mechanical press, its two machined plates traced by a single verdigris line, clamps a soft half-formed haze in the middle—deterministic layers on both sides of the flexible part, the trust living in the plates, stamped CHECKED.](/img-posts/observable-blue-collar-ai-ai-sandwich.webp){: width="1536" height="1024" loading="lazy" decoding="async"}

The middle is where the demos live. The bread is where the trust lives. That's the difference between an AI wrapper and a system an operator will stake his company's reputation on.[^honeycomb] The sandwich is also what makes the context graph safe to build experiments on.

## Cheap collisions

Andrew's example is small in the best way. His team combined CRM records with public permit data, scanned lost opportunities against what actually got installed, and ran a win-back campaign. Incremental cost: close to zero.

One campaign doesn't change a company. Ideas like that stop being projects. That's what changes a company. CRM, accounting, design tools, utility data, permit records, and human notes stop behaving like separate applications and start behaving like one collision surface. The data was always there. What's new: the ideas the team can suddenly afford to test.

Observability is what makes those experiments safe to point at real customers. When a lost opportunity shows up on the win-back list, anyone can trace which records put it there. That trace is the sandwich in miniature: a deterministic join built the list, a person who knew the accounts gated the send, and the model only touched the flexible middle. None of it is clever, and all of it is checkable. The wrong entry gets caught by the person who recognizes the name, not by the customer who gets a confusing email.

## The field writes back

The phrase I want to keep is blue-collar AI. The field doesn't need a chatbot. The field knows things the system doesn't.

A crew sees why an install got weird. A sales lead hears why the customer hesitated. A permit specialist knows which jurisdiction changed its intake process last month, and a manager can tell whether a delay is noise or the first sign of a broken workflow. That's the ground truth everything above depends on, and in most companies it lives in heads and Slack threads, where it decays.

![Early woodcut engraving: an open, hand-written field notebook at the base of the frame, its ink dissolving upward into a dense constellation of graph nodes, one gold thread tracing a single written line up to a single illuminated node above—the field's observation becoming the system's memory.](/img-posts/observable-blue-collar-ai-field-writes-back.webp){: width="1536" height="1024" loading="lazy" decoding="async"}

So we gave it somewhere to land. Field observations, written as plain markdown journal entries, go into the company's shared context, link to the jobs and equipment they describe, and compound.[^journals] Before: a crew's read on a weird install died in the truck cab on the drive back. After: it's context the next estimate reasons against, and the crew can see that it is.

There's a lag in that loop today. A note lands, someone reviews it, and it reaches the next estimate a cycle later. The direction we're building toward also comes from behavioral science: just-in-time adaptive intervention, the lesson coming back to the crew at the moment the next job needs it instead of after review. Not shipped yet. But it changes the bet on the writing habit, because the faster a note returns as help, the less the loop runs on discipline.

## The receipt is the language

The receipt for all of this isn't a dashboard screenshot. It's operator language. When the operator can explain the ontology, name the guardrails, describe the field-note loop, and find his own examples, the system has crossed a threshold. It stops being a tool someone installed from the outside and starts becoming a way the company thinks.

What I can't tell yet is whether the writing habit survives being routine. The field-note loop still has the energy of being early, and from the inside, novelty looks a lot like durable practice. Closing the lag is the bet against that decay, because a note that comes back as help is easier to keep writing than one that vanishes into review. That loop isn't shipped. So the open question is now a race: does it arrive before the discipline erodes, or does the crew stop filing the weird-install note in year two, when the system mostly works and nobody's watching? If the field stops writing first, the graph goes quietly stale and every layer of trust above it decays on a delay. That's the failure mode I watch for, and I'll report it either way.

That's what I mean by vertical AI. Not AI pointed at a vertical. A vertical learning to make itself legible enough for AI to help, one field note at a time.

[^sandwich]: Yes, the name is cuter than the discipline deserves. The serious version is old engineering religion: never let a nondeterministic component touch a customer without deterministic layers on both sides of it. But "deterministic context cultivation with post-hoc evaluation" never once got repeated back to me by a permitting team, and "AI sandwich" did. Others use the name for human-AI-human workflows. Different sandwich: our bread is deterministic code, not human review. A name people actually use beats a name that's technically dressed.

[^honeycomb]: The software world got here first. Honeycomb's *Observability Engineering* crowd has argued for years that observability matters more as systems get less deterministic, and AI is the extreme case of that curve. My amendment for physical businesses: the model is only half the nondeterminism. The world supplies the rest. Roofs, weather, permit offices that change their forms. You need observability pointing both directions: into how the system reasons, and out into what the field is seeing.

[^journals]: "Write reality in" could be misread as "log everything the crew does." It's the opposite. Field journals are sampled observations, written by the person who had them, shared so the next crew starts smarter. The moment it turns into surveillance, the field stops writing the truth, and the whole loop dies. It runs on trust in both directions or it doesn't run. Behavioral science has a name for this design: the experience sampling method, a 1970s psychology technique built on the same bet, since picked up by industrial and process-engineering research, fields a lot closer to a job site than a lab. Sample people in the moment of the work instead of asking them to reconstruct it later, because reconstruction is where the truth leaks out. We didn't invent the loop; we pointed an old one at install crews.
