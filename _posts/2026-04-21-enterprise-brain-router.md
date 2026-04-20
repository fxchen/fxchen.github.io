---
layout: post
title: The Enterprise Brain Is a Router Problem
subtitle: "Fat skills, one per work function."
permalink: enterprise-brain-router
---

Alex Lieberman thinks [someone is about to build a world-class
brain for enterprises and make a stupid amount of money][liebs].
He's right about the money. I think he's wrong about what
you're buying.

[liebs]: https://x.com/businessbarista/status/2044874360280723934

The argument goes: code is easy for AI because context lives
in the repo. Knowledge work is hard because context is
scattered. So whoever builds the git repo for enterprise
context wins.

The first half is right. But the second half buries the
actual moat.

---

We built the repo three months ago. It was the easy part.

Markdown files in git, a folder structure we call ARKS,
Claude Code running inside. Grep our entire decision history
in 0.3 seconds. Write a decision doc Tuesday, the agent knows
about it Wednesday. Full writeup [here][vault].

[vault]: https://frankc.net/company-vault

A repo full of context is just a library. It sits there
until something reads it with purpose.

---

A frame that keeps clicking for me.

**A company is already a network of routers. The humans are
the routers.**

Once you see it you can't unsee it.

Every time our ops lead pulls context from four Slack
threads, two Excel documents, a Google Doc, and a thing
someone said in a bathroom at offsite 2025. That's a route.
She's moving context from where it lives to where a decision
needs it. We pay her salary for that transcoding. Every
company pays someone to do it, whether they notice or not.

Companies don't fail because the knowledge is missing. They
fail because the routes are human. One bus, ten lanes, ten
thousand packets, every day, forever. Humans are weirdly
good at this. That's why companies function at all. Also why
they seize up when the router quits.

What enterprises are actually buying isn't the brain, it's
routing capacity. Think of it as inventory versus throughput.
A warehouse doesn't ship itself.

---

Garry Tan gave us part of the vocabulary: [thin harness, fat
skills][garry]. Model is commoditized. Skill is the moat. A
skill is a markdown file that teaches the model how to do one
specific thing. The process, not the answer.

[garry]: https://x.com/garrytan/status/2042925773300908103

What I didn't appreciate until we'd shipped a few: a fat
skill isn't a workflow, it's a router.

The skill is a small program that knows the shape of one work
function. It reads the right parts of the vault, pulls in the
right people, executes the predictable moves, asks a human
when the call needs judgment. Same substrate, different
routing table, different function out.

Our onboarding router reads your git config, finds your
person-note, picks the three meetings you should know about,
pulls the relevant decision docs, and runs an interview that
enriches your node in the graph. Every step is a routing
decision: this context → this person → this moment.

I've watched it happen a dozen times now and still get a
little flicker of "wait, this actually works." Nobody tells
the agent anything. It just reads the graph.

[@contextconor][conor] put this sharper than I had it:

> The failure mode is not that the agent can't find
> information. The failure mode is that it finds too much,
> can't tell what's current, can't resolve conflicts between
> sources, and confidently presents a fragment as the whole
> truth.

[conor]: https://x.com/contextconor/status/2045957951278739520

That's exactly the concern. His answer is that agents need
something closer to what a great chief of staff has. Context
accumulated over months. Knowing what's current, what's
real, what matters today versus last quarter.

Agents with access to everything don't have this.

My extension: you don't need chief-of-staff understanding of
the whole company. One work function at a time. A narrow
chief of staff.

Conor's bet is one big brain for the whole company. Mine is
many narrow ones, stacked. Same synthesis problem, different
architecture. The narrow version is what a fat skill can
actually pull off. Which makes it tractable.

---

Two weeks ago we shipped onboarding. Maria used it. One
engineer after her. Each new hire's person-note enriches the
graph, so the next one gets a richer route. Cheap compounding
flywheel.

This week we're building the second one: sales prep.

> **Context-in:** a company name, maybe a contact.
>
> **Context-out:** who on our side has talked to them, the
> last three times they surfaced in meetings, which decisions
> they've influenced, whether we've committed to anything.

This router is janky. Still hallucinates the occasional
contact we never actually met. We'll fix it.

Third on deck is exec briefing. Brian wants a Monday-morning
packet: what shipped, what stalled, what decisions are open,
who needs something from whom. Currently a 45-minute manual
process. If we hit five minutes and keep it truthful, that's
a week of CTO attention back every quarter.

| Work function | What the router does          |
| ------------- | ----------------------------- |
| onboarding    | routes context to a new hire  |
| sales prep    | routes context to a deal      |
| exec brief    | routes context to a decision  |
| hiring loop   | routes context to a candidate |
| support       | routes context to a ticket    |

Same vault. Same markdown files. Different routing tables.

Each skill is a few hundred lines of markdown. None of them
are impressive on their own. Together they're the actual
system. That's the part that gets me excited. Not any one
router. The stack.

---

So: the enterprise brain bet isn't "whoever owns the repo
wins." The repo is commodity. Markdown in git, we didn't
invent it, and Karpathy didn't either when he [described the
same pattern][karpathy]. You could start one today.

[karpathy]: https://x.com/karpathy/status/2039805659525644595

The moat is the router stack. Each one a narrow chief of
staff for one function.

Every fat skill routes context into work that used to require
a human. The vault is the substrate. The routers are the
company. Humans get freed up to do the thing they're actually
paid for, which is judgment calls that aren't in the graph
yet.

A year from now, nobody's asking whether you built an
enterprise brain. Everyone will have one. The real question
becomes how many work functions your router stack covers,
and how good they are. The interesting stuff starts after
that, not before.

---

Things I don't know.

Some work functions don't route cleanly. Creative work, hard
negotiations, anything where the routing itself requires
taste. Those might be routers-in-humans forever. And maybe
that's the right answer. The goal isn't to route everything,
just the parts that shouldn't have needed a human in the
first place.

The understanding gap Conor named is the thing we watch
for. Our routers pass it for onboarding because the function
is narrow and the signals are structured. They're going to
fail at anything more ambiguous. We don't know what to do
about that yet.

I don't know the right number of fat skills for a team our
size. More than three, less than fifty. We'll find out.

I don't know what this looks like at 1,000 people. Different
routing problems, different failure modes, different politics.
Different post.

But the frame holds at our size. The enterprise brain is a
stack, not a product.

---

Anyway. The first router took us a weekend. The second is
taking another. If that math holds, a full stack is months
of weekends, not years of building. That's the part I keep
turning over.
