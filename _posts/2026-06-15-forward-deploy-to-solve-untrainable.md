---
layout: post
title: "FD(x): Forward Deploy to Solve the Untrainable"
subtitle: "The cleanest number in our dataset was a lie, and only the operator who owns the loop knew why."
permalink: forward-deploy-to-solve-untrainable
share-img: "https://frankc.net/img-posts/forward-deploy-to-solve-untrainable.png"
---

There's a field in a public solar dataset that flags whether a system is a lease instead of a purchase. For our operations company it reads a clean, machine-precise zero. The data says, flatly, that the company has never once done a lease.

It does. All the time.

I read that zero. A Palantir forward-deployed engineer read it. The AI agent we had running inside Foundry read it, scored it, and ranked on it. Three different kinds of intelligence looked at the same confident number, and all three of us were wrong, because every other field in the row was internally consistent and nothing hinted the number was a lie. Call it a clean lie: false by construction, clean on its face, wrong exactly where it counts.

The person who knew was Shelby. She files the permits. She'd been told, years ago, to leave that box blank, because the form's follow-up questions describe a kind of lease we don't sell. Leaving it empty was the honest answer at filing time. The zero isn't a fact about the business. It's the residue of a verbal instruction, sitting in one person's head, where no founder, no FDE, and no agent could reach it.

Six weeks into Palantir's Startup Fellowship, that gap is the whole post. Nobody at Palantir wrote a line of our ontology, and the reason that's the highest compliment I can pay the program is the same reason the zero stayed a lie until Shelby explained it.

*Disclosure: I'm CTO at Balto Energy, a vertical AI for home energy services company, starting with California solar. The Fellowship, the operations company, and the data below are ours.*

![Woodcut engraving: a ledger row of identical machine-perfect zeros, the central one struck through with a single acid-green correction mark — the clean number that is a lie.](/img-posts/forward-deploy-to-solve-untrainable-clean-number.png)

## Who actually built it

![Woodcut cutaway: founders and operators build inside a great permitting-and-data engine while a guide stands outside it, hands off, pointing a verdigris line at a fault in the mechanism.](/img-posts/forward-deploy-to-solve-untrainable-builders-guides.png)

The legible version of the story is "startup uses Foundry." The real one is that the building was done by two groups who, on paper, had no business doing it: founders and operators.

**Balto built the harness.** Carl, our head of product, and I wired the data, wrote the skills, built the onboarding agents, and sat inside the operating cadence — standups, integrations, the weekly wins review. Forward-deployed means you go to the work instead of shipping software at it. Our CEO went furthest and built the business-model ontology himself, which the friction post covers. None of it was delegated. Not to a contractor, not to a platform team, not to Palantir.

**The operators built the truth.** This is the part that surprised me. Andrew didn't hand us requirements; he built forecasts and conversion models against the graph, the ones the build log put numbers on. Jill, our data lead, built the foundation: the permit-data pipeline that pulls from a sprawl of jurisdictions, the canonical name-cleaning, the policy that decides which clean-looking fields to trust and which to throw out. Shelby holds the other half, the better part of a decade of knowing how each permit office actually wants to be filed, which no system of record contains. And here's the part that should be impossible: almost none of them wrote code before. The people rebuilding the truth are domain experts who'd never opened a developer tool before this. Builders, not informants.[^builder] The canonical layer is true because the people who made it true own it.

**Palantir's FDEs guided, and only guided.** They never built a thing for us. Not one transform, not one object type, not a line of the ontology. What they brought was knowing where the cliffs were, because they'd watched other teams find them the hard way: which primitive fits, what breaks at production scale, why the caching behaves that way, what the platform wants you to do instead of what you're about to do. Real help, in the room, every week. Dzvinka, the FDE who worked with us to refine our architecture, never once touched the keyboard. That restraint turned out to be the entire point.

## The data lies, and only the operator knows why

Go back to the blank box. The thing that makes it dangerous isn't that it's wrong. It's that it's wrong *and* clean. Every field validates. The row survives every statistical sanity check you can throw at it, because the lie is structured, not random — the same false zero shows up for every installer running non-traditional financing, and it fails in exactly the direction that hides them. The dataset doesn't break on noise. It breaks precisely on the cohort you most need to see.

And the field gets *scored on*. Third-party-owned share feeds models downstream. So a number that is false-by-construction for the most interesting companies quietly poisons everything that consumes it, and the only thing standing between the false zero and a false strategy is a person who knows the zero is a lie.

Here's a different-shaped version of the same thing. Andrew built a careful comparison of how our operations company looks in the public data against how it actually runs. On paper, one read made us look like we were lagging. Then Andrew, who actually runs the business, explained why that read was structurally invalid: we file interconnection paperwork before we build, where a lot of the field files after. Same column, two completely different meanings. The clincher was watching it happen, he caught his own AI reaching the same wrong read off the same clean data. The rows were accurate. The story they told was false. The correction lived in him, not in the data.

One more, and this one is still open. Jill keeps a table of which installer names are really the same company — which brand is a DBA of which parent, which two near-identical entities are one business and which are a coincidence. No rule infers it. Right now there are names sitting blocked in that table, waiting on Andrew's local knowledge to settle whether one specific installer is a DBA of another. Not resolved. Waiting. The canonical entity layer of a company we're modeling depends on a question only a person who's been in the market for years can answer, and until he answers it, the honest move is to leave it blocked rather than guess.

That's the moat, and notice how I'm showing it. Not by asserting that operators are valuable. By failing without them. Three kinds of intelligence read a zero as true. A careful comparison ranked us backward. An entity graph stalls on a judgment call. Every time, the same clean lie: internally consistent, confidently wrong, recoverable only by a person who knew why.

## Why you can't just teach the agent the list

![Woodcut: a Jacquard training-loom devours a deck of identical punched cards but cannot draw in the single green thread an operator holds just off the deck — the knowledge that isn't in the data by construction.](/img-posts/forward-deploy-to-solve-untrainable-untrainable.png)

The obvious objection is that this is temporary. Catalog the lies, write the overrides into code, let the agent learn the distrust list, and the operator ages out of the loop. We did write the overrides into code. The pipeline is taught to disbelieve the third-party-owned field for exactly the installers Jill knows are misfiling, and to substitute an estimate instead. The distrust list is real and it runs in production.

It also goes stale the moment the world moves, which is constantly. A permitting authority swaps its software vendor and the scraper goes quiet with no error, so a drop in observability looks identical to a drop in business — and only Shelby, now filing through the new portal, knows which one it is. A utility changes a form field. A national installer fragments into new legal entities. The vendor regenerates its contractor IDs on an edit. There is no stable function here to learn. The override table is re-authored continuously, because the thing it corrects keeps changing shape underneath it.

So the agent can apply today's distrust list. It cannot author tomorrow's. That's not a gap that closes with a better model. It's the difference between running a correction and knowing, this month, in this jurisdiction, what just quietly broke. An agent inherits the schema and the SOPs when it lands in a new region. It does not inherit the operator who knows which clean numbers are lying, and it can't derive her, because what she knows isn't in the data by construction.

## Why "guided, not done-for" is the design

Now the FDEs' restraint makes sense. A company brain is two rebuilds happening at once: the systems, and the thinking. Anything a partner builds *for* you skips the second rebuild, and the second rebuild is the asset. When Jill writes a distrust rule, the pipeline gets a correction and Jill gets a sharper model of how this data lies. When Andrew rebuilds his forecast against the ontology, the graph gets a model and Andrew gets a new way to interrogate his own business. Outsource the work and you get the artifact without the understanding. The artifact rots the day the contract ends. The understanding is the part that lasts.

That's why guidance beats delegation, and it's not a soft point. Guidance writes into your people. Delegation writes into someone else's. Run the counterfactual. Drop the founders and this is a consulting engagement: correct, slow, orphaned at handoff. Drop the operators and you get a beautiful graph of a business that doesn't exist. Drop the guides and you rediscover everything Palantir already knows about ontology evolution, one production incident at a time. All three were necessary. Only one of the three could be hired by the hour, and it wasn't the two doing the building.

## The pattern has a name: FD(x)

![Woodcut: two colossal parenthesis press-jaws clamp one fused machine of work-tools threaded by a single ochre drive-belt — FD(x), the whole company evaluated as one function over the org chart.](/img-posts/forward-deploy-to-solve-untrainable-fdx.png)

What actually happened over six weeks is that we forward-deployed the whole company into one vertical AI business. Not a founder parachuting in. The whole company relocated into the work. Our engineers rebuilt the systems. Our operators rebuilt and kept correcting the truth. Forward-deploy as a function, evaluated over the org chart, everyone landing inside the same operating company instead of shipping at it from outside.

The same function keeps getting named in other domains by people who aren't us,[^fdx] and a couple of prominent investors are arguing a nearby version of it from the top down.[^block] When AI compresses execution, the scarce thing stops being who can do a task and becomes who can own a constraint end to end and keep the system honest after each pass. FD(x) is what that ownership looks like when you take it seriously enough to relocate. No value of x can be outsourced, because you can rent expertise about the platform but you cannot rent the rebuild of your own thinking.

## The leg that isn't yours to build

So here's the inversion hiding inside the notation. Forward deploying sounds like it's about the people you send in. It isn't. Six weeks of evidence says the opposite. Founders and FDEs are necessary. They are not sufficient. The one leg none of us could build, hire in, or parachute into a new region is the data foundation, and it's owned by the operators who were already inside the business before we showed up. Shelby's decade in the permit offices. Andrew's read on what a clean comparison actually means. Jill's table of which company is really which. You can forward-deploy founders and engineers all day. You cannot forward-deploy the years someone spent learning where their own data lies. [Sarah Guo](https://sarahguo.com) has a word for the parts of a market that stay this way: untrainable.

The startup version of the lesson: stop asking partners "what will you build for us?" Ask "what will you make us capable of building?" The first question buys artifacts. The second buys the thing that compounds. Then go find the people who already know why your numbers are lying, because that's the leg you can't construct from outside, no matter how good your founders or your FDEs or your agents are.

## What I don't know

Whether this survives scale. The builders-and-guides split works at one operating company; I don't know if it holds at five, or whether each one needs its own Shelby and its own Jill making its own truth. Whether the guide has to be Palantir or any partner with real production scar tissue works. And what the operator leg means for a five-person company with no Andrew and no Shelby to deploy. Maybe the founder wears that hat. Maybe that's where the pattern breaks.

One thing cuts both ways. Once the operator leg exists, it's cheap to run: a correction is an edit someone makes in an afternoon, not an engineering project — and it leaves a trail. Jill's distrust rules live in a written table, not in her head; Andrew's forecast is a rebuild he can run again, not a one-time read. If the pattern travels, those artifacts are the onboarding material for company two: not a handoff of answers, but a template for asking which clean numbers are lying in a new market. So the real test isn't whether one operator is irreplaceable. It's whether the practice — asking *why did the data tell us that lie?* — can be owned by someone new. That's what I'd want before I call this a design instead of a story.

The receipts these builders produced are in last week's build log. This post is who made them, who very deliberately didn't, and the one person in every story who knew the clean number was a lie.

[^builder]: One honest asterisk on "builders." Shelby never wrote a line of code or committed a pipeline; Jill, Andrew, the founders, and an agent running inside Foundry did the building. What Shelby built was the correctness, the knowledge that told the builders which clean numbers were lying. Call her a builder in the system-design sense, not the keyboard sense. That gap is the whole post: the leg you can't commit is the leg you can't replace.

[^fdx]: Function notation, on purpose. "FDX" is FedEx's ticker, and an acronym buries the point, which is that x is a variable you evaluate across the org chart. Palantir shipped FD(engineers) two decades ago; the week I drafted this, Eric Siu published FD(marketers), rebuilding the agency org chart around who owns the loop. Same function, new argument. https://levelingup.com

[^block]: Jack Dorsey makes a nearby argument in "From Hierarchy to Intelligence": a company "world model" absorbs the information-routing that middle management used to do, leaving the people "on the edge" as the ones who reach where the model can't go yet. My one amendment: once the building itself moves to agents, the edge that's left is the domain expert this whole post is about, the operator who knows why the data lies. You don't reduce that role. You re-skill it. https://block.xyz/inside/from-hierarchy-to-intelligence
