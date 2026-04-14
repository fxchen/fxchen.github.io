---
layout: post
title: Our AI Onboards New Hires Better Than We Do
subtitle: "How we use Claude Code to personalize onboarding from a living knowledge base"
permalink: ai-onboarding
---

Last week I wrote about keeping our company's brain in a
git repo. A couple founder friends DM'd me after: "this
sounds great, how do I get this started for my team?"

Honestly that's the harder question. Here's where I landed.

---

Onboarding is a lossy compression problem.

Company has N years of accumulated context. New hire has
zero. Every onboarding system ever built is an attempt to
compress that gap into something a person can absorb in a
week.

The standard approach: write a guide. The guide is accurate
for about 3 weeks, then reality drifts. Six months later a
new hire reads "we use Tool X for Y" and Tool X got
deprecated in February. Nobody maintains the wiki because
the maintenance burden grows faster than the value.

Documents are static snapshots of a moving target. That's
the core problem. Not "we need better docs." The medium
itself is wrong.

And it only flows one direction. Company → new hire. The
new hire consumes the docs but never enriches them. The
knowledge base doesn't get smarter because someone new
joined.

```
traditional:   Company ──────► New hire
               (one way, decays)

this:          Company ◄─────► New hire
               (live graph, compounds)
```

---

The fix is dynamic compression. An AI agent reading from a
live knowledge base, not a frozen onboarding guide.

If someone wrote a decision doc yesterday about switching
from approach A to approach B, the agent already knows.
New hire gets the current state of the company's thinking.
Not an artifact from Q1.

```
╔══════════════════════════════════════════╗
║  Onboarding guide:     Knowledge base:   ║
║                                          ║
║  Written once          Updated daily     ║
║  Stale in weeks        Always current    ║
║  Same for everyone     Adapts to you     ║
║  Read it and forget    Reads you back    ║
╚══════════════════════════════════════════╝
```

Garry Tan [wrote about this recently][garry-fat-skills].
He calls the pattern "thin harness, fat skills." The model
isn't the differentiator. The skill file is. A skill is a
reusable markdown document that teaches the model how to do
something. Not what to do. The user supplies that. The
skill supplies the process.

[garry-fat-skills]: https://x.com/garrytan/status/2042925773300908103

Our onboarding is exactly this. A markdown file with four
phases: detect the person, interview them, create their
context file, guided tour. Same skill, different people,
different experience. The skill never forgets a step, never
gives outdated instructions. When the next model drops, it
gets better automatically.

---

Here's what it looks like in practice.

Last month Maria joined our operations team. She cloned
the repo, typed `claude` in the terminal, and got this:

```
┌──────────────────────────────────────────────┐
│  $ claude                                    │
│                                              │
│  > Hey, you're Maria, right?                 │
│  > Welcome to Balto.                         │
│  >                                           │
│  > I see you're joining on the operations    │
│  > side. Let me walk you through how we      │
│  > work and get your workspace set up.       │
│  >                                           │
│  > First question: have you set up           │
│  > 1Password yet?                            │
└──────────────────────────────────────────────┘
```

Nobody told the AI her name or her role. It pulled her git
config, found her person-note in the knowledge base, and
just... started talking to her.

After the interview, the AI updates her person-note with
what it learned. Her expertise, her focus areas, her
working style. The company graph now has a richer node for
Maria. The next person who needs to understand who does
what at the company gets better context because she joined.

The system has two layers. Layer 1 is human: a checklist.
1Password, Slack, Gmail, Gusto, GitHub, Ramp, Claude,
Linear, Salesforce. 9 apps, in order, who to ask. Nothing
clever.

Layer 2 is the AI. It detects you're new, reads your
profile, and adapts. Operations gets project docs and
meeting notes. Engineering gets the architecture and dev
setup. Same repo, different starting points.

---

`./dev.sh` handles environment setup. Installs Obsidian,
git-lfs, docling, pre-commit hook. If something fails
(wrong permissions, missing dependency, Homebrew out of
date) the agent troubleshoots in real time. No Slack DM to
someone who set up their laptop six months ago and forgot
the steps.

I experienced this pattern before we built it for the
company. When Claude Code shipped, I pointed it at a
mac-setup repo I'd maintained for years. Homebrew formulas,
permissions, file-type bindings, shell config. It one-shot
bootstrapped my entire developer environment on a new
MacBook Air. Years of accumulated setup knowledge in a
repo, executed by an agent that could handle the edge
cases.

---

The ramp-up follows OODA, same loop we use for all
knowledge work. Compressed into a single day.

```
morning          midday           afternoon        end of day
──────────────   ──────────────   ──────────────   ──────────────
setup script     knowledge graph  vault health     ship first
core files       person-notes     pick a gap       contribution
CULTURE.md       wikilinks in
README           Obsidian
```

The AI walks you through what matters for your role.
Midday you're just... looking around the graph. Afternoon
the health checker surfaces broken links, sparse notes,
orphan pages. Pick one. Fix it.

For engineers that's a PR. For Maria it was a doc mapping
project gaps nobody had flagged. We made the barrier
intentionally low.

---

Two things surprised us.

First, the context file. After onboarding, everyone has a
`.context/me.md`. Personal, gitignored. Tracks preferences,
progress, working notes. The AI reads it every session.
Tell it on Tuesday you're focused on financial modeling, it
remembers on Thursday. Switch workspaces and the AI pulls
your context from memory. No re-interview.

Then it does something I didn't expect. It takes what it
learned from the interview and synthesizes it into a
portable identity block: your name, role, expertise,
working style. Asks if you want it added to your global
Claude config. Say yes and every project you touch gets
the context. The compression from onboarding propagates
beyond this repo.

Second, Slack. We built `/post-slack` into the agent. It
reads your git branch name, matches keywords to one of 13
channels, drafts a structured message with your Linear
ticket and PR number, and posts it as you. Not as a bot.
Your name, your update. The AI just handled the routing
and formatting.

That's the habit we're building from day 1. Found something
interesting? Share it. Built a vault workflow? Share it.
The agent handles the routing.

---

It's not all working yet. The agent sometimes pulls in
irrelevant context. It can't tell the difference between
"interested in finance" and "needs to approve invoices
today." The knowledge base has to actually be maintained
for any of this to do anything useful.

But the architecture is right: dynamic compression of
company context, personalized by role, reading from a live
knowledge base instead of static docs. Engineers shipped
PRs day 1. Maria mapped gaps in project docs. Different
roles, different entry points. The system adapts.

The graph gets smarter every time someone new joins. Their
person-note enriches the knowledge base. Their first
contribution fills a gap. The next onboarding is better
because this one happened. Traditional onboarding is a
cost. This compounds.

Still iterating with every person who touches the vault.
