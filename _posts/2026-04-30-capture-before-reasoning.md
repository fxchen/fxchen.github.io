---
layout: post
title: The Moat Is What You Capture
subtitle: "Reasoning gets cheaper. Capture compounds."
permalink: capture-before-reasoning
---


By the end of the Palantir kickoff build week I'd figured out where the leverage actually is in a vertical AI build. Not the model. Not the agents on top. The graph underneath — and the loop that thickens it.

Day two. The night before, I'd wired up a Salesforce dump from our operations company. The dump did show real bottlenecks — which projects were stalled, where deal velocity dropped, what was sitting in pipeline too long. By morning Carl had a dashboard up. By afternoon he'd iterated into agents wrapping the same data, exploratory loops you could ask questions of. Real tool, by every standard of a two-day build.

I still hated it.

Not the build. The build was crisp. The thing itself.

Dashboard or agent loop, the shape was the same. It took data, made it pretty, made it queryable, and went home. The PMs who'd actually use it would learn nothing from it that they didn't already know in their bones — and the things they did know in their bones, none of it could see. We'd shipped a status report with reasoning bolted on.

The dissatisfaction stuck for the rest of the night.

---

Same morning, same flip — Carl in the shower, me in the gym (they don't all happen in the shower). Both chewing on the limits of what we'd shipped.

Carl walked in with a name for it. The data was too narrow. Salesforce shows you what got typed into Salesforce — a narrow opening you peer through into a much bigger room you can't see. The PM has the room in their head. The dashboard only has the slot. He called it the *Salesforce keyhole*. Every BI tool sits in front of one. The reason the dashboard couldn't say anything new is that no Salesforce dashboard ever can. The signal lives somewhere else.

You can't reason your way out of thin context. No matter how good the model.

So the question we'd been asking — *how do I give the PM insights from this data?* — was the wrong question. The right question was inverted: *how do I get what's in the PM's head into the ontology?*

That flip has rewritten how I think about building AI inside a company. Most teams are pointing the model at the existing graph and asking it to be clever. The leverage is on the other side. It's in widening the graph.

Carl was already iterating on it — in code. The agents he'd wrapped around the dashboard on day two were writing back into the graph as they ran. Same flip from different angles: his in implementation, mine in framing.

Capture before reasoning.

---

Two flavors of AI work, and the industry is wildly lopsided on which one it talks about.

**Insight tools.** Read the graph. Compose. Predict. Summarize. Recommend. This is where almost all the noise is. Dashboards-with-LLMs, copilots, BI agents. They're useful at the margin. They're capped by the graph underneath them.

**Capture tools.** Interview a person. Watch a meeting. Read a contract. Extract structure. Write back to the graph. Make tomorrow's reasoning richer than today's.

The dashboard was an insight tool. It was going to be capped by the keyhole forever. The thing I should have built was a capture tool — an agent that interviewed the PM about the project the way a senior PM interviews a junior one, then wrote what came out into the ontology. Not "what's the cycle time" but "why did this project stall and what does that tell us about the next ten." The first question is in the data. The second is in the PM's head.

```
  insight tools:    graph ───► answer
                    (capped by what's already in the graph)

  capture tools:    person ───► graph
                    (compounds; tomorrow's graph is bigger)
```

If you have to pick one to bet on this year, it's not close. Capture compounds. Insight doesn't.

---

We're in week two of [@palantirtech][palantir-fellowship]'s eight-week Startup Fellowship, and I've been rebuilding Balto's operating system around this idea ever since.

The architecture call was easy once the frame clicked. The Foundry ontology is the source of truth. Everything else is a view.

Salesforce, QuickBooks, Bill.com, meeting notes, contracts, our own [code-and-context vault][vault] — they all flow into the ontology. Agents read from it. And, critically, agents write back to it. We're treating capture and reasoning as one loop, not two systems.

[palantir-fellowship]: https://www.palantir.com/fellowships/startup/
[vault]: /company-vault

The shape we're settling into:

| layer | direction | role |
|---|---|---|
| data sources, humans, agents | flow into | the ontology |
| ontology | is read by | apps and agents |
| apps and agents | flow back into | the ontology |

The last row is the part most companies skip. That's where the capture lives. Salesforce write-back. Agent-driven interviews that enrich a project record. Meeting note extractors that update the people graph instead of just sitting in a Notion folder. The whole point is that the ontology gets thicker, not just queried.

Andrew and his entire team got onboarded to Foundry last week. One week in, they're already shipping their own integrations and surfacing wins faster than I expected. Integrations daily, wins bubbling up weekly.

Six weeks of build time and then we'll see what the graph looks like — how many writes a day, from how many sources, with what fan-out into the apps that read it. I'm writing this down now so I can compare. If the curve is flat, the bet is wrong, and I'd rather notice that publicly than quietly.

---

We already have one capture loop working in production, and I missed the framing on it the first time around.

[Two posts ago][onboarding] I wrote about our onboarding agent — a fat skill that interviews a new hire, reads their git config, picks the meetings they should know about, and gives them context. I described it as a router. Read the graph, route the right context to the new hire.

[onboarding]: /ai-onboarding

That description was half right.

The half I missed: the same agent is *also* writing back to the graph. Maria's person-note got richer because the onboarding skill asked her about her last project and wrote what she said. The next person who joins gets a better route because Maria's node is thicker. That's the compounding I kept gesturing at without naming.

Same code. Different lens. The router is also a capture tool.

[@contextconor][conor] called the failure mode of agents-with-access-to-everything "fragments confidently presented as the whole truth." I quoted him in the [last post][router] and didn't have a great answer. The answer is on the capture side. The graph stays current because the things that read it also feed it. You don't escape Conor's bind by building a smarter retrieval. You escape it by tightening the loop between reasoning and capture until they're the same agent.

[conor]: https://x.com/contextconor/status/2045957951278739520
[router]: /enterprise-brain-router

---

The model layer is commoditizing in a very specific way: the models you call out to are interchangeable. Every six months you swap a string in a config and the eval barely moves. [@garrytan][garry] calls the durable part *thin harness, fat skills* — I'd push the unit one more level down. The skill has shape. The graph the skill writes to has more shape, and it accumulates.

[garry]: https://x.com/garrytan/status/2042925773300908103

Three layers, stacked:

- **models** — fungible, replaced every six months
- **skills** — your code, slower-moving, somewhat portable
- **ontology** — the typed graph of how your business actually works, almost entirely yours

Familiar shape if you've worked with data warehouses. Query engines come and go — Snowflake, DuckDB, whatever's next. The views and transformations on top are your code. The schema underneath is the only thing that's actually yours. Models are query engines. Skills are views. The ontology is the schema. Nobody migrates schemas for fun.

The ontology gets thicker every time a contractor onboards, every time a meeting gets captured, every time an interview sharpens a relationship. Each of those is a write into a typed schema that didn't exist before — a new node, a new edge, a tighter type.

What gets me about this is the loop. The agents that read the graph are the ones writing back to it — there's no separate ETL phase. The graph thickens while you use it.

The compounding is in the graph, not the models.

When people say "vertical AI" and mean it, that's what they mean: the graph isn't the use case, the graph *is* the company. We're forward-deployed with our operations company — a solar installer. Every project, every contractor habit, every weird edge case in interconnection paperwork lands in the ontology. The next one we onboard inherits a thicker version of that graph than the one before.

A horizontal model can read our graph. It can't build it.

---

One thing I'm still chewing on: capture has a tacit-knowledge ceiling. The triage move an ops lead makes in a hallway, the read on whether a furious customer wants apology or action — the question itself isn't formed yet, and I'm not sure agent-style interviewing reaches it. The honest answer is "I haven't seen it work."

Another: at our size, capture is the harder problem than reasoning, and I think it stays harder forever. Reasoning is bounded by the graph. Capture is bounded by everything that *could* be in the graph and isn't.

---

I keep coming back to the same question for any AI-leveraged business in the next five years.

Not which model do you use. Not which framework. Not which agent harness.

*What are you capturing that no one else can?*

If the answer is "nothing — we read public data with a private model," you don't have a moat. You have a *keyhole*. Roll-ups have this answer baked in if they take it seriously: every operating company is a capture surface, and the ontology is what compounds across them. Most don't take it seriously. They run the operating companies and hope the AI gets cleverer on its own.

It won't. The model is going to get cheaper. The graph is the only thing that gets *yours*.

Six weeks until the Fellowship wraps. By then I'll have actual numbers — writes-per-day into the graph, sources, fan-out into the apps that read it — and I'll know whether the rebuild paid off or whether the loop never really closed. Build log post either way. If it worked, I'll show the graph. If it didn't, I'll show what I got wrong.

Now I'm going to close some loops. If Carl hasn't already.

