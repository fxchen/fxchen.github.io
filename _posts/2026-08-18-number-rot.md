---
layout: post
title: "Steering Beats Scale"
subtitle: "When scale outruns the feedback loop, numbers rot."
permalink: number-rot
share-img: "https://frankc.net/img-posts/number-rot.jpg"
bigimg: /img-posts/number-rot-banner.webp
categories: ['selected']
---

> Slow is smooth, smooth is fast.

Everyone credits that to the Navy SEALs. Nobody can source it there. The earliest documented print appearance is Jack Coughlin's 2006 Marine sniper memoir *Shooter*; before that it circulated only as spoken range instruction. A fair warning for the numbers that follow.

![A typographic card reading "Slow is smooth, smooth is fast" above four labelled rows: attributed to the Navy SEALs, no primary source, a paper trail beginning in a 2006 memoir, and a highlighted row noting the line is about tight loops and lost its own provenance.](/img-posts/number-rot-epigraph.webp){: width="1200" height="630" loading="lazy" decoding="async"}

*A maxim about tight loops that cannot pass its own test.*

Every operating picture is a cached read. It is always some distance from source.

Mine was 38%.

For months, when someone asked how our AI-enabled marketing was doing, I answered from memory: roughly 38% opens, 4% action. The figures came from the first campaigns, read within a day or two of launch. Against an average campaign, which gets about 15% opens and 1.5% action, they sounded exceptional.

![Frank Chen at a lectern on the DevCon stage, the illuminated DevCon wordmark filling the wall behind him and his title slide lit to the right.](/img-posts/number-rot-stage.webp){: width="1800" height="900" loading="lazy" decoding="async"}

*Palantir DevCon, July 2026. The number I said here had already stopped being true. Photo: Charlie Neely*

In July I said them from a stage. [The recording is public.][talk] The talk was about capturing what people know so it does not walk out the door when they leave. I was quoting a number that had already walked out of mine.

That is the uncomfortable half of [running a company like a codebase][cac]. The system kept the history. My picture did not.

On August 28 I went back to source. Across all nine non-test campaigns built with AI enablement, opens averaged 76.2%, with a range of 63.2% to 100%. Action averaged 10.5%, with a range of 0% to 27.3%.[^campaign]

The number came back larger. But 38% described the first campaigns, while 76.2% covers every campaign since. Different populations, different windows — not a correction.

An audit can only subtract. Re-derivation can return a larger answer.

Boyd treated orientation as the running picture that makes useful action possible. That picture is assembled from prior observations, which means it necessarily lags the world it describes. A benchmark, an early read, and a later average collapse into one usable sentence. The caveats disappear first. Then you make crisp decisions about a world that no longer exists.

[talk]: https://www.youtube.com/watch?v=quawnFQ0V-o
[cac]: /company-as-codebase

## Distrust the flattering number first

The open rate is the number to disqualify, and mine is not exempt. Since 2021 major mail clients have pre-loaded images, so a message can register as opened by someone who never opened it. [Omeda compared][omeda] roughly 80,000 deployments and about two billion emails on either side of the change: total opens went from 22.6% to 40.5%, unique opens from 15.2% to 29.0%, and clicks from 2.3% to 2.4%. Nobody read more email. The meter changed.

Action survives better. Published rates run about 0.9% to 2.6% of everyone delivered to. Ours averaged 10.5% on that same denominator.

An aside from our own instrument: once email-security-scanner clicks are separated out, 80 raw clicks resolve to 58 confirmed plus 22 ambiguous. The same events read as 10.5% or 9.1% depending on what the tool counts, and published vendor benchmarks do not say which definition they use.

The industry is full of this ambiguity. Salesforce ships two click definitions inside one product and gets 11.1% and 10% from identical data. "Segmentation lifts revenue 760%" is even cleaner: [Campaign Monitor publishes it][cm] on three of its own pages with three different attributions, while the trade-association report it credits does not contain the number.

Call the whole program an n=1. One operating loop is not a universal causal claim; it is enough to identify the next measurement. I want to know whether the same few people act every time. Nobody has looked.

That is why the response is not the AI receipt. The work is.

![A woodcut composing stone: a tall stack of identical printed handbills, every one showing the same generic house, and beside it a single lifted sheet where one particular roofline has been traced in green.](/img-posts/number-rot-unit-of-work.webp){: width="1600" height="1066" loading="lazy" decoding="async"}

*A dozen of the same empty roof, and one made about this house.*

Eleven weeks bought the solar contractor one generic campaign: minimal customization, the same letter to everybody. Eight hours now buys a campaign customized house by house, down to an individual recommendation based on that home's behavior. The unit of work changed; this is not the same thing arriving faster. At eleven weeks per artifact, a campaign structurally cannot be about your roof.

I am not claiming AI caused the response. AI did not make the old campaign cheaper. It changed what a campaign could be about.

[omeda]: https://www.omeda.com/blog/the-impact-of-apples-mail-privacy-protection-6-months-later/
[cm]: https://www.campaignmonitor.com/resources/guides/guide-to-segmentation-for-the-evolving-marketer/

## Steering was sufficient

![The DevCon Builders Arena: rows of workstations, people mid-build, and a conversation in progress at the right of frame.](/img-posts/number-rot-builders-arena.webp){: width="1600" height="800" loading="lazy" decoding="async"}

*The Builders Arena. Most of what got written down that week was operating knowledge, not code. Photo: Charlie Neely*

Paying the April [promise to publish receipts from the company brain][cbr], git supplies the cleanest standalone fact. Through August 26: 708 commits since April 30, 367,642 inserted lines, twelve people, and 90.5% of the commits carrying an AI co-author trailer.[^trailer]

```console
$ git rev-list --count --since=2026-04-30 origin/main
708
```

Most of those lines are not code. They are operating knowledge written down: how a permit office behaves, which contradictions in a public record are real, what a usage pattern implies about equipment in a house. The committers have careers in clean energy, finance, and AI. More of them are operators than engineers.

This is a company-brain receipt, not a campaign staffing claim. It shows what was sufficient here. No software factory was required to turn operating knowledge into executable work. Operators close to the work recorded what they knew, agents worked inside those constraints, and the results fed the next decision. Steering and tight feedback loops were enough.

The 90.5% is a [work number, not an adoption number][work]. It says an agent was in the room for the recorded work. It does not say how many seats were activated, how much judgment the agent supplied, or whether the result was good.

![A woodcut engine deck: a long bank of identical idle pistons recedes into shadow on the left, while a small ship's helm stands lit and sharp on the right, a single green line running from its hub to the rudder.](/img-posts/number-rot-helm-not-engine.webp){: width="1600" height="1066" loading="lazy" decoding="async"}

*The engine is not the capability. The steering is.*

Jensen Huang has said he would be "deeply alarmed" if a $500,000 engineer failed to consume $250,000 worth of tokens. Grant that he may be right about the economics. Taken as a value metric, though, consumption makes an input budget do the work of an output standard. Steering asks whether a campaign could be about one house, then re-derives the answer.

[cbr]: /capture-before-reasoning
[work]: https://x.com/vasuman/status/2085806422072418632

## Re-derivation runs both ways

Re-derivation does not merely make claims smaller.

From that same public stage, I said we had "over fifteen production use cases that I know about." A cursory pass last week found more than twenty. That is not a correction. The system kept moving.

Use cases compound. For every production use case, we probably have three or four exploratory ones that an operator can create and run inside the same sovereign data boundary without a new permissioning process or a formal use-case definition. The production count tells you what crossed into production. It misses what people could already try.

CPUC's `installer_name` field answers what string was entered, not who did the work. It is free text with no entity resolution, so aliases, typos, DBAs, acquired brands, and current company names make one installer look like several. Correct attribution required us to build an integration layer that deduplicates those strings and maps installations to the right company. A related field stopped being populated in mid-2025 across every installer, with no announcement anyone could find.

The difficult part was not compute. It was a person knowing that four strings named one company.

Charity Majors writes that [every achievement has a denominator][denom]. The same result means one thing across ten people and another across ten thousand. In a postscript, she adds that she cannot credit whoever she first heard the line from.

The epigraph lost its provenance. So did the denominator rule. Useful ideas can survive that. Operating numbers should not have to.

![A typographic card reading "Anything short of that is lore" above five labelled rows: source, denominator, window, timestamp, and a highlighted re-run row.](/img-posts/number-rot-lore.webp){: width="1200" height="630" loading="lazy" decoding="async"}

*The five fields, or it is not something you can steer by.*

Any number we plan to steer by now carries a source, a denominator, a window, a timestamp, and a way to run it again. Anything short of that is lore. That is not measurement hygiene. It is a capability: the picture can get better, worse, or disappear, and the company can still make its next move from source.

The goal is not to know perfectly. It is to re-derive fast enough to steer.

[denom]: https://charity.wtf/p/every-achievement-has-a-denominator

[^campaign]: The nine non-test campaigns ran from June 10 through July 21: 929 sent and 919 delivered. All rates divide by delivered; 76.2% and 10.5% are simple averages per campaign. The one-to-two-day timing of the early read is from my memory. So is the 15% opens / 1.5% action comparison: it is the average-campaign pair I use, not any single publisher's headline. Both workflow spans are the contractor's own account of their prior process rather than a stopwatch: eleven weeks was what a generic campaign used to take them, and eight hours is their estimate of the new one. The claim resting on them is not a speed measurement, it is that the old process could not produce a per-house campaign at any duration.

[^trailer]: A co-author trailer means an agent wrote alongside a person, not instead of one. A human drove the session and owns the merge.
