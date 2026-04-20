---
layout: post
title: We Put Our Entire Company's Brain in a Git Repo
subtitle: "ARKS, AI agents, and what happens when your company's knowledge lives in plain markdown"
permalink: company-vault
---

```
+----------------------------------------------------------+
|  We put our entire company's brain in a git repo         |
|                                                          |
|  I'm not sure it's the right move but I think            |
|  something interesting is happening                      |
+----------------------------------------------------------+
```

OK so this is maybe a weird one but I've been thinking about
it a lot and wanted to share.

We're a small energy startup. And we have this
problem that I think every startup has but nobody talks about:

Where does institutional knowledge actually live?

Really—where does the *why* behind a decision go?
A Slack thread? A Google Doc that 2 people have open and
nobody else has permission to? Someone's head—until they
leave?

It just... evaporates.

```
┌──────────────────────────────────────────────┐
│  The half-life of institutional knowledge    │
│  in a startup:                               │
│                                              │
│  Slack message .......... ~3 days            │
│  Google Doc ............. ~3 weeks           │
│  Notion page ............ ~3 months          │
│  Someone's head ......... until they leave   │
│  Version-controlled md .. basically forever  │
└──────────────────────────────────────────────┘
```

(OK that last one is aspirational but you get the idea)

---

I should be honest about where this comes from. I've been
keeping my life in markdown + git for almost 20 years now.
So I'm biased. Deeply, irrecoverably biased toward plaintext.

---

So we tried something. We call it "the Vault." It's just...
a git repo full of markdown files. That's it. That's the
whole thing.

But the structure matters. We landed on something we call
ARKS—and honestly I'm still not 100% sure it's the right
abstraction, but it's been working surprisingly well:

```
┌─────────────────────────────────────────────┐
│  A  ─  Action     ── projects, areas, work  │
│  R  ─  Records    ── raw captures, notes    │
│  K  ─  Knowledge  ── synthesized thinking   │
│  S  ─  System     ── templates, maps, infra │
│                                             │
│  Data flows one way:                        │
│    Records ──> Knowledge ──> Action         │
│    (raw)       (understood)   (acted on)    │
└─────────────────────────────────────────────┘
```

The key insight—if it is one—is that raw material and
synthesized understanding are fundamentally different things
and should live in different places. A meeting transcript is
not knowledge. It's a *record*. Knowledge is what you extract
from it, cross-reference with other records, and distill into
something someone can act on.

```
Meeting transcript           A person-note that
from March 3rd       vs.     links context across
(2,847 words)                12 meetings + 3 decisions
                             (247 words)
```

The second one is 10x more useful and 10x shorter. Interesting
how that works.

---

But here's the thing that genuinely surprised me.

We set up an AI agent (Claude Code) that lives inside the
Vault. It can read everything. And we gave it a simple
instruction: when someone new opens this repo, detect that
they're new and help them get oriented.

```
┌──────────────────────────────────────────────┐
│  $ claude                                    │
│                                              │
│  > Hey, I noticed you're new here.           │
│  > You're Sarah, right? Welcome.             │
│  >                                           │
│  > I see from your person-note that you're   │
│  > focused on operations. Let me walk you    │
│  > through how we work and set up your       │
│  > workspace.                                │
│  >                                           │
│  > Have you read CULTURE.md yet? It's the    │
│  > best starting point—want me to            │
│  > summarize the key ideas?                  │
└──────────────────────────────────────────────┘
```

What's happening here:

```
1. Agent detects: no workspace config exists
2. Looks up identity from git config
3. Finds their person-note in Knowledge/
4. Greets them by name (!!)
5. Asks about current focus + interests
6. Creates a personalized workspace context
```

And this is the part I keep turning over in my head—the
agent isn't reading from a static onboarding checklist.
It's reading from the *actual knowledge base*. So if someone
wrote a great decision doc last week explaining why we chose
approach X, the onboarding agent already knows about it. The
new person gets the living, breathing version of the company's
thinking. Not a stale wiki page from 6 months ago.

```
╔══════════════════════════════════════════════╗
║  Traditional          Vault                  ║
║  onboarding:          onboarding:            ║
║                                              ║
║  Here's 47 docs       Hey, what are you      ║
║  good luck            working on? Let me     ║
║       |               pull the relevant      ║
║       v               context for you.       ║
║  Day 5: still              |                 ║
║  confused                  v                 ║
║                       Day 1: contributing    ║
╚══════════════════════════════════════════════╝
```

I want to be careful not to oversell this. We're early. The
agent sometimes surfaces irrelevant context. The ARKS
structure might be wrong and we'll refactor it. The wikilink
graph has gaps.

But something feels qualitatively different about having your
company's knowledge in plain text files that both humans and
AI can read, search, cross-reference, and synthesize.

---

**Why markdown + git specifically?**

I keep coming back to this and honestly I think the answer is
boring and that's what makes it good:

```
┌──────────────┬─────────────────────────────────┐
│ Property     │ Why it matters                  │
├──────────────┼─────────────────────────────────┤
│ Versionable  │ git blame on a decision doc     │
│              │ is incredibly clarifying        │
│ Searchable   │ grep beats any folder UI        │
│ Portable     │ Markdown will outlive us all    │
│ Diffable     │ PRs for knowledge = code review │
│              │ rigor applied to thinking       │
│ AI-native    │ LLMs understand plaintext       │
│              │ better than anything else       │
└──────────────┴─────────────────────────────────┘
```

Full disclosure: I didn't jump straight from "markdown
journals" to "company knowledge base." I spent a year running
this exact system for my personal life first—same four-layer
structure, an AI agent called Frankly that connected Slack,
Linear, Obsidian, and the vault—reading my meeting notes,
contacts, journals, tracking work across tools. I gave it
hybrid search (BM25 + vector via qmd) so it could find things
the way I'd forgotten I'd filed them. When Frankly could trace
a thread across 18 months of my own thinking and surface
connections I'd missed, I knew the pattern would hold for a
team.

I keep seeing other people converge on this independently.
Karpathy's "LLM Wiki" describes a similar multi-layer
architecture: immutable raw sources, an LLM-maintained wiki
of interlinked markdown, and a schema that tells the agent
how to maintain it. His framing is sharper than mine:
"Humans abandon wikis because the maintenance burden grows
faster than the value. LLMs don't get bored, don't forget
to update a cross-reference, and can touch 15 files in one
pass." That's exactly it.

Jack Dorsey's "From Hierarchy to Intelligence" comes at it
from a completely different angle. His argument is that for
two thousand years, hierarchy existed because humans were the
only information-routing mechanism available. AI changes that.
Block is building what he calls a "company world model"—an
AI that maintains a continuously updated picture of what's
happening across the org, replacing what managers used to
carry in their heads. Our vault is a small-team version of
that same thesis.

Nobody coordinated this. We've all been intuiting our way
toward the same thing: persist context to create action.
Plaintext, version-controlled, AI-readable.

That last one is maybe the most interesting. We didn't plan
for it. But it turns out that if you structure your company's
knowledge as a graph of interlinked markdown files... you've
accidentally built exactly the kind of thing that language
models are really good at navigating.

The agent can follow wikilinks between notes. It can trace
how a concept evolved across meeting notes. It can find
contradictions between what we said in March and what we
decided in April. None of this was the original design goal—we
just wanted a better wiki—but it emerged naturally from
the format.

```
┌──────────────────────────────────────────────┐
│  What we built:                              │
│    a company wiki in git                     │
│                                              │
│  What we intentionally built:                │
│    a knowledge graph that AI agents          │
│    can reason over                           │
│                                              │
│  What it might become:                       │
│    honestly? I'm not sure yet.               │
│    and that's the exciting part.             │
└──────────────────────────────────────────────┘
```

---

If you're at a small startup and your knowledge lives in
Slack threads, scattered Google Docs, and the heads of people
who might leave—maybe try this? Plain markdown. Git repo.
Simple directory structure. Let an AI agent help connect the
dots.

I don't know if this scales to 100 people. I don't know if
ARKS is the right abstraction long-term. But at our size it
feels like a superpower and I wanted to share it while the
thinking is still fresh.

Curious if anyone else is experimenting with anything similar.
The intersection of version-controlled prose + AI agents +
company knowledge feels really underexplored to me.
