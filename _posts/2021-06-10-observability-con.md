---
layout: post
title: How Tracing Uncovers Half-truths in Slack’s CI Infrastructure - conference talk @o11ycon
subtitle: 
permalink: tracing-uncovers-half-truths-o11ycon
image: /img-posts/
image-height: 192px
image-width: 192px

---

I gave a talk this past week at @o11ycon + hnycon with wonderful folk across the industry to understand how observability (e.g. Honeycomb) could accelerate enterprises' understanding of performance and resiliency challenges.

## How Tracing Uncovers Half-truths in Slack’s CI Infrastructure (🔗 [link](https://o11ycon-hnycon.io/agenda/how-tracing-uncovers-half-truths-in-slacks-ci-infrastructure/))
Traditional monitoring tools like logs and metrics were necessary but not sufficient to debug how and where systems failed in CI, which relies on multiple, interconnected critical systems (e.g. GHE, Checkpoint, Cypress).
In this talk, Frank Chen shares how traces gave us a critical and compounding capability to better understand where, when, how, and why faults occur for our customers in CI. We share how shared tooling for high-dimensionality event traces (using SlackTrace and SpanEvents) could significantly increase our velocity to diagnose code in flight and to debug complex system interactions. We go from stories with early incidents that motivated further investment throughout Slack’s internal tooling teams to stories about gains in performance and resiliency throughout our infrastructure.

### Bio
Frank is a maker. At Slack, he focuses on making engineers' lives simpler, more pleasant, and more productive, in the Developer Productivity group. Frank found Honeycomb to be a force multiplier for performance and resiliency projects, and helped internal teams adopt this culture + tooling. Frank helps people make better decisions by designing technologies that connect people to what they want to do. He informs software development with a background in behavior design, engineering leadership, site reliability engineering, and resiliency research. Frank recently moved back to the bay area and can frequently be found hiking, running, or woodworking.
