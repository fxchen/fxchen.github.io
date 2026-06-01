---
layout: post
title: "The Handoff Was the Bug. Vertical AI Is the Rewrite."
subtitle: "Quality used to come from approvals. Now it comes from correction."
permalink: vertical-ai-rewrite
share-img: "https://frankc.net/img-posts/vertical-ai-rewrite.png"
---

![Handoffs on the left as a linear stamped chain; loops on the right as a circular write-back cycle](/img-posts/vertical-ai-rewrite.png)

The peaceful era is over.

Last weekend, our operations company's CEO built a thirteen-week cash forecast. Supplier statements, work orders, reservation orders, PM overrides, account-by-account Monte Carlo. No analytics team. No quarter-long project. The speed isn't the story. The story is what stopped being necessary.

For decades, services companies ran one playbook: define the process, staff it, add approvals, enforce quality at each handoff. Quality came from routing work through specialized humans in the right sequence. It worked because labor was specialized and the business could afford to let truth fragment across systems and people.

AI changes the bottleneck.

The shift underneath the noise is less peaceful-to-chaotic than controlled-process-to-corrective-loops. The old operating model paid for quality at human checkpoints. The new one pays for quality through cheap, fast correction against a business that is finally queryable end to end.

The old constraint was "can we get enough specialized people through the approval chain?" The new one is "can the business answer questions about itself fast enough for humans and agents to correct the loop while it is still running?"

The companies that have noticed already stopped optimizing for controlled process. Most services companies don't have a name for the shift yet.

This is what vertical AI is, underneath the category label. Not a smarter model pointed at your industry, not a copilot bolted onto the old process. A rewrite of the operating model around a business the software can finally read in full.

---

Two questions sort the operating model you're in.

The controlled-process question is *how do we make the current workflow more efficient?*

The corrective-loop question is *what parts of the workflow should stop existing, because the knowledge they protected can now live directly in the operating system?*

Different question. Different company.

---

That was possible before. It was just expensive enough that almost no one did it. You needed unusual operating discipline, unusually good memory, and people who knew where the missing context lived. Now search is strong enough to cross docs, objects, messages, decisions, and work-in-flight. Extraction is cheap. A business can become queryable in places that used to require an analyst, a meeting, and folklore.

---

[Last month I wrote about the Salesforce keyhole][capture], Carl's phrase for the old failure mode. Every system of record is a narrow lens shaped by whoever owns it. Salesforce knows some truth. Bill.com knows some. The frontline rep knows what neither system captures. The business lives outside any single keyhole.

[capture]: /capture-before-reasoning

If you reach for AI to make the keyhole more efficient—better dashboards, faster summaries, copilots on top of the same narrow data—you're still optimizing the controlled process. You're improving throughput against a constraint that no longer binds.

The corrective-loop move is to redesign the operating system so the company itself becomes the source of truth. Pull operational reality out of the narrow systems. Represent it as a structured business graph: entities, evidence, constraints, prior decisions, current state, and write-back paths in a form humans and agents can both act on. Then operators and agents can run loops against that graph, keep what works, and write the patterns back into the operating system. Next week starts from a sharper version of the company than this week did.

Inside Balto, that source of truth is not one graph. Most companies already have three graphs. They just live in three filing cabinets connected by humans.

The memory graph is what the company has learned: decisions, people, operating notes, project context, the reasoning trail. The execution graph is what exists and what changed: objects, transforms, permissions, applications, live workflows. The coordination graph is who is doing what now: Slack, Linear, and the vault's change history.

The loop only compounds when all three talk to each other. If Slack never writes back to the vault, the company forgets. If Foundry has objects but no coordination graph, the model knows the business but the team doesn't move. If Linear has tasks with no operating graph underneath, you get project-management theater.

What this buys is a queryable business. An operator or agent can ask "have we seen anything like this before, what changed, and who owns the next move?" and get one answer that pulls from memory, execution, and coordination at once. Search is the visible thing. The deeper shift is that the three graphs stop being separate scavenger hunts.

The specific tools matter less than the coupling. In CS terms, the company needs a distributed system with write-back, not three databases connected by human copy-paste.

---

That sounds abstract. Two concrete loops from this week.

**The fifteen-minute loop.** A residential solar customer with an awkward shape: propane-heated vacation rental in wine country. Normally an annoying account because the utility usage doesn't tell the full story. Seasonal occupancy is weird, the HVAC mix is unusual, the place sits empty half the year. Carl pulled utility data, Zillow square footage, Street View evidence of the AC condenser, and ran the shape through AI tools in parallel. Fifteen minutes to a plausible read on occupancy, seasonal usage, and load-shape scenarios.

The point wasn't the speed. The loop closes when the weird customer becomes an exportable pattern in the business graph: propane-heated rental, seasonal occupancy, weak utility signal, scenario-based load shape. Next time a similar account shows up, different state, different supplier, different sales rep, the loop starts from "we've seen this before" instead of from zero. A one-off analysis becomes a reusable prior.

**The cash loop.** Our operations company buys equipment from a supplier that invoices irregularly. Bill.com lags reality by weeks. So Andrew, the CEO, built a state-aware AP prediction pipeline: twelve months of supplier statements, work orders, and reservation orders, all flowing through the business graph. When no invoice exists yet, the model emits a confidence-scored prediction. When the invoice lands, the prediction swaps for the actual and ties back through the reservation order.

Then he turned the same pipeline toward cash receipts. Thirteen-week Monte Carlo, account by account, with PM overrides where humans know something the model doesn't. The output this week was roughly $800K of projected cash with confidence intervals. First pass is not the same thing as truth, but every invoice that lands tightens the model. Built by the CEO over a weekend. Not by an analytics team over a quarter.

The agent handles search, synthesis, drafting, and checks inside the loop. The human closes it.

What both loops share: the operator isn't doing one step in a chain. They own the whole arc: observation, hypothesis, agent invocation, judgment, write-back. The work product isn't the only output. The business graph is thicker than it was an hour ago, and the next loop starts from there.

We're building that harness around the operating company: vault for memory, Foundry for executable ontology, Slack and Linear for coordination, agents for the repeatable typing. Every real workflow teaches the harness where the graph is missing, where the permissions are wrong, where a human judgment call should remain human, and where a tiny automation can safely take over.

One reason Liu Cixin’s *Three-Body* trilogy is one of my favorite sci-fi series is that the chaos comes from coupling, not mood: each sun keeps pulling the other two off their neat path, and Stable Eras break into Chaotic Eras.[^three-body-series] Same shape here, with much lower stakes. The memory graph, execution graph, and coordination graph each look legible alone. The weirdness starts when they perturb each other.[^three-body-physics]

[^three-body-series]: Netflix’s science explainer for *3 Body Problem* describes the San-Ti planet as moving between Stable and Chaotic Eras because it sits in a three-sun system. Liu Cixin’s trilogy is doing the same thing this post is trying to do in miniature: using a hard science concept as a way to talk about civilization-scale instability. https://www.netflix.com/tudum/articles/3-body-problem-science-explained-burning-questions

[^three-body-physics]: The physics version is older and weirder than the fiction. Scientific American’s overview traces the three-body problem through Poincaré’s discovery of chaotic dynamics and the use of numerical integration to generate useful approximate trajectories even without a clean closed-form answer. https://www.scientificamerican.com/article/the-three-body-problem/

---

The controlled-process org needed many roles because the work passed between functions. Strategist, analyst, PM, designer, engineer, QA, statistician, account lead. Each function protected quality at its checkpoint.

The corrective-loop org needs fewer handoff-shaped roles and more whole-loop owners. The highest-leverage humans become operator-builders. Not doing a step in a chain. Driving loops against the graph. They form a hypothesis, pull in context, hand the typing to an agent, inspect what comes back, make the judgment calls, and leave the system smarter than they found it.

Founders are the extreme case, because founders sit closest to the whole company graph. That's the next post. The operating-model point here is simpler: the valuable human is no longer the checkpoint. The valuable human owns the loop.

---

The implementation sequence I'd trust is narrower than the slogan.

**One: pick one narrow value stream where a miss hurts and rebuild the whole loop.** Not a demo. Not an innovation-theater pilot. A real client workflow with real consequences. Painful enough that everyone feels the drag, bounded enough that you can actually ship. The mistake is trying to AI-ify the whole company at once. The thing you're learning is what a real loop feels like when graph, agents, and operator judgment compose. You can only learn that on one stream at a time.

**Two: write the graph before buying more agents.** Most AI-first competitors will fake this for a while. They'll wrap agents around messy context, get impressive demos, raise money. The durable advantage is the structured representation of the business: what the core entities are, what evidence supports what claim, what prior work is relevant, what constraints bind which decisions. Agents without a graph are clever interns with amnesia. Agents with a graph become operators inside a compounding system.

A blunt test: pick a surprising outcome from last week. Time how long it takes someone who was not in the room to answer, "have we seen anything like this before, and what did we do?" If it takes more than ten minutes, or only one person can answer, the business is not queryable yet. It just feels queryable to the people holding the missing context in their heads.

**Three: climb from augmentation to minimal automation to bounded agency.** Start with augmentation: make the operator faster at seeing, querying, drafting, checking. Then automate the smallest reversible pieces: status updates, deterministic checks, routing, reminders, data hygiene. Only then grant bounded agency: the loop can act, but inside rules the operator wrote and with a clear write-back path. Some roles collapse into operator-builders. Other humans move closer to judgment, taste, customer understanding, exception handling. The accumulated expertise of the company becomes infrastructure instead of headcount.

---

The honest "I don't know" on this is about which specialist expertise translates cleanly into infrastructure and which doesn't.

Some judgment feels structural: the kind of taste a senior PM has about which customers will churn, the read on whether a furious client wants apology or action, the triage move an ops lead makes in a hallway. I don't know if any of that survives the translation to graph + agents. I suspect some does and some doesn't, and the line isn't obvious from where I'm standing.

The simplest tell I've found: expertise that's purely sequential (measure, score, route, approve) or pattern-matched (similar customer, similar move) tends to clean into infrastructure. Expertise that requires judgment in the face of surprises survives longer. We've seen structural judgment survive. We haven't seen it disappear entirely yet, even in loops that execute hundreds of times a week.

One more caveat: graphs decay. Earlier this month two paths in our financial model returned contradictory numbers for the same scenario. The same agent queried two interfaces and got two answers. The graph hadn't gotten worse. The correction loop was load-bearing. A parity contract and a CI check closed the drift path. The cost was a morning we lost finding it. The cost of not finding it would have been a contradictory answer in front of the wrong audience. Graphs compound when correction is cheaper than capture. Without that condition, the graph is a slower keyhole.

I'm also not sure how fast the shift hits any given vertical. The peaceful era doesn't end on a date. It ends on a competitor showing up with a loop-based operating model, pricing meaningfully below your handoff-based one for work that's qualitatively better. That moment is observable in hindsight and mostly invisible until it happens.

---

The question I'd be asking inside any services company right now:

*What knowledge currently lives in someone's head, a Slack thread, a QA checklist, a client deck, or an old experiment readout—and how do we make that knowledge available to every future loop?*

Companies that find good answers become learning machines. Everyone else keeps optimizing handoffs they should be deleting.
