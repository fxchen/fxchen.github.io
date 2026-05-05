---
layout: post
title: "The Operations CEO Doesn't Wait for the Dashboard"
subtitle: "What happens when the forward-deployed engineer is the CEO himself."
permalink: forward-deployed-engineer-executive
---


Seven a.m. Tuesday. Andrew, the CEO of the operations company we're forward-deployed with, is at his desk, running a forecast iteration on a cost model he wrote himself. By the time most of his team has logged on, he's already cycled through three or four iterations and pinged his sales lead with a tightened lead-conversion target the model surfaced.

This is what most operations CEOs do at 7 a.m.: read a dashboard somebody on their team built last quarter.

The one I work with does something different. He runs the integration himself. Daily.

---

*Disclosure: we're Balto Energy, an early-stage vertical AI company in the Palantir Startup Fellowship, building on Foundry.*

[Last week's post][capture] argued the moat is what you capture. I didn't make the part clear that's been the most surprising in production: *the domain expert is the one running the capture*. Not consuming it. Not approving the agent's output. *Running the loop.*

[capture]: /capture-before-reasoning

That sentence sounds tiny. The implications aren't.

In a normal arrangement, an analytics team builds a model, hands it to the CEO, waits for feedback. The feedback loop is weeks. The CEO is reading other people's work; he can't tell the model what's wrong with it because he doesn't actually know what the model is doing under the hood. So he says vague things and the analytics team makes vague changes and the model never gets sharper.

Replace the analytics team with [our forward-deployed company graph][vault].[^dorsey] The graph is what we call the substrate: ontology, Foundry transforms, the skill files Andrew edits. The CEO is now writing the rules the model encodes, configuring how the transforms compose, watching agents run. He sees how the model fails because he's the one running it. The next iteration is *that morning*, not next quarter.

[vault]: /company-vault
[dorsey]: https://block.xyz/inside/from-hierarchy-to-intelligence

[^dorsey]: For 2,000 years organizations used hierarchy because humans were the only information-routing mechanism. [Dorsey][dorsey] argues AI changes that at org scale. What I'm describing is the same shift, at one operator's keyboard.

The feedback loop is no longer measured in sprints. It's measured in Peet's iced cold brew.

Twenty years of operator instinct, becoming a thing his team can edit.

---

What he's actually doing.

Two of his routines, lightly disguised. One in sales, one in operations.

**Sales.** A **lead-conversion prediction model** he runs against the deal pipeline every morning. Output feeds his sales team's targeting for the day. Built on Foundry. Refined by him.

**Operations.** A **cost model** he iterates against new project bids. Inputs are messy—labor allocations, equipment availability, jurisdiction-specific permit timing. He's tightened it iteratively against actual outcomes until it's narrow enough to bid against. (Numbers in six weeks; this post is about the practice, not the precision.)

Two loops. Daily integrations. Weekly wins.

Each daily cycle thickens the graph. Tomorrow's reasoning is sharper than today's because he wrote what worked yesterday into the schema. The next person on his team gets a richer route because he authored that route last Tuesday.

---

Engineers scaffold the harness. Foundry wires up the data. AI FDE gives him the agent surface. We can build the plumbing.

What we cannot build is what each of those models needs to encode about *his* business: which lead signals are predictive, which jurisdictions ramp slow, which equipment tradeoffs only apply to the kind of work his crews actually do.

All that plumbing has to point at something.

[Garry Tan][garry] called the fat skill the moat. The skill file is the contract underneath—the domain expert authors it.

[garry]: https://x.com/garrytan/status/2042925773300908103

[Shyam Sankar's][sankar] forward-deployed engineer goes vendor-to-customer—the Palantir model, embedded with the buyer to ship the work where the work is.[^fde] What I keep watching is the inverse: the customer-side executive embedded with the vendor's tools, running the loop himself. Call him a forward-deployed engineer-executive if you want a label. The CEO at the keyboard is just the cleanest version of it.

[sankar]: https://www.tbpndigest.com/story/2025-04-17/palantirs-shyam-sankar-on-enterprise-ai-autonomy-defense-reformation-and-why-the-forward-deployed-engineer-cant-be-cargo-culted

[^fde]: a16z has [a useful read on how forward-deployed job titles are spreading][a16z] across vertical AI—engineers, founders, even product managers all moving into embedded roles. The customer-side inversion isn't there yet, but the vector is the same.

[a16z]: https://a16z.com/forward-deployed-job-titles/

When the CEO is the author, the contract gets re-edited every morning. Most companies do not have this. Most companies have a CEO who reads dashboards and an analytics team who builds them, with a feedback loop measured in months. Foundry's value at our size isn't "the platform." It's that the platform is approachable enough for the actual decision-maker to *pick up and run.* That's when it earns its keep.

And so does Andrew's. What he gets isn't faster mornings. It's the curve. Each iteration sharpens the model, the model sharpens the decisions, the decisions sharpen the data the next model trains on. A few months in, that's a different business. The vertical AI thesis pays the operator closest to the loop.

---

The same pattern shows up at the other end of the seniority spectrum.

A few weeks ago I [wrote about Maria][onboarding]—she joined as a new hire, the onboarding agent welcomed her, asked about her last project, wrote what she said into her person-note. Today she's three weeks into the vault. She's tested three Linear CLI tools, formed an opinion on which is better for the team's workflow, and pinged me with a proposal to swap. The thing she's working on next week is sketching an agent for an IRS web interface that hasn't been redesigned since 1998.

[onboarding]: /ai-onboarding

CEO at the top of the org. New onboarder at the other end. Both at the keyboard. Both editing the skill files the agents read.

Not a coincidence. The same architecture invites both. A skill file is markdown. A Foundry transform is a function. Anyone who can read can edit either. The architecture doesn't gatekeep. **The only bar is whether you can describe what you actually do.**

The bar moved. The old one was "can you build the model." The new one is "can you describe what you actually do." Different muscle. And the people who can describe what they actually do best are the people who do it most—the CEO who runs the business, the sales lead who's been on the calls and knows what to show, the senior operator who runs the function, the new hire still forming opinions about how the work works.

---

The line I keep sitting with.

Some of his loops will stay augmentation forever. The read on a partner negotiation, the call on whether a customer relationship is worth the margin pressure, the gut on whether a project is going to slip—those aren't in any markdown file. The cost model lives mostly here today. He runs the model, reads the output, makes the bid call himself. The skill makes him faster at the *prep*. It doesn't replace the call.

Some are heading toward automation. The "is this lead converting" check fires deterministically once the heuristic stack is encoded. Sales is the cleanest case. Signals clean, consequences reversible, volume high enough to pay off the encoding fast. The cost-model precision tightens with every closed bid. Eventually the morning iteration runs without him and pings him only when the distribution shifts enough to warrant attention.

A few are creeping toward agency—the loop acting on his behalf, within rules he's encoded. Not autonomous; just routed. The lead-converting check that doesn't just fire but routes the lead to the right rep, drafts the outreach, schedules the follow-up. The cost model that flags when a permit-timing assumption is drifting and asks the project team to confirm before the bid goes out. Augment lets him work faster. Automate lets him stop doing that piece. Agency lets the loop act on his behalf.

**Augment, automate, agency.** Watching him cycle through the cost model on a Tuesday morning, you can see where each loop sits—some he runs himself, some run for him, some are starting to act on his behalf. He decides where it lands by editing the file.

And the same shape sits differently across functions. Sales is the furthest along the spectrum, for the reasons above. Operations is in between. Calibrated enough to automate, consequential enough that he keeps his hand on it. How fast a loop advances depends on the function more than the platform.

And the loops don't have to stay his. The sales lead is closer to the conversion data than the CEO. The CEO wrote the first versions. The next versions belong to the people who run those functions every day.

---

Things I don't know.

Whether this generalizes. The CEO I'm describing has a quantitative bent and a hands-on disposition. Most operations CEOs don't. If the model only works when the CEO happens to be technical-curious, it's a much narrower bet than I want it to be.

How it scales. Fifty domain experts at the keyboard is a different problem from five. Skill conflicts, ontology drift, who arbitrates when two experts disagree about how a route should fire. None of that is stress-tested at our size.

The labor-productivity loop. Two of his three current loops are built; the labor join—payroll against the CRM, by job type—is the one we haven't done yet. Job types are different shapes and misallocating a crew costs you for weeks. We know the analysis we want. We don't have it running.

What the right interface is at scale. Markdown is what we have. Some functions will want a structured form. Some will want a UI. The bottleneck is taste, not syntax, but I'd believe arguments either way.

---

For now: the CEO writes. Twenty years of operator instinct, encoded weekly. The model gets sharper. The graph thickens. Tomorrow's loop is bigger than today's because of who's at the keyboard.
