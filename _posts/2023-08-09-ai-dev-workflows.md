---
layout: post
title: AI Powered Developer Workflows
subtitle: Sharing initial experiments with generative models and their challenges in developer workflows
permalink: ai-dev
---

This article accompanies the talk at the Developer Experience Summit (August 2023).

**🤖 Github Action Code Review**: [**Install link**](https://github.com/marketplace/actions/code-review-github-action). Currently supports models from OpenAI, Anthropic, plug-and-play with your own LLM!

**💬 Example Code Review**: [![Example review][kaldb-review]](/img-posts/ai-code-review-kaldb-review.png)

**🎞️ Slides** (soon)

[kaldb-review]: /img-posts/ai-code-review-kaldb-review.png
[kent-beck]: /img-posts/ai-code-review-kent-beck.png
[review-oracle]: /img-posts/ai-code-review-oracle.png
[oracle-yet]: /img-posts/ai-code-review-oracle-yet.png

**💡 Abstract**

In this talk, I will delve into the next frontier of software development: the integration of generative artificial intelligence (AI) models into the developer workflow. We'll explore initial experiments with AI powered code review in open source repositories at Slack.

I will provide a detailed examination of these experiments—discussing the benefits, challenges, and future opportunities of strategic bets in this space. This includes an exploration of how these technologies can be tailored to various developer workflows, ranging from automated testing to code comprehension, all while maintaining the human-in-the-loop principle.

My motivation for this talk is rooted in my commitment to advancing technologies that empower developers to make better decisions. I believe AI powered developer tools present tremendous leverage for engineers across a variety of developer workflows.

[![Tweet: Kent Beck][kent-beck]](/img-posts/ai-code-review-kent-beck.png)

**🔗 References**

Here is a list of links mentioned in the document with their corresponding titles and short summaries:

- [https://github.com/fxchen/code-review/](https://github.com/fxchen/code-review/) - This github action improves your pull requests and code base by performing AI-assisted code reviews. It can analyze your pull requests and provide intelligent and insightful comments to help you maintain high code quality. Example: [https://github.com/slackhq/kaldb/pull/646](https://github.com/slackhq/kaldb/pull/646)
- [https://arxiv.org/abs/2306.08302](https://arxiv.org/abs/2306.08302) - This study presents a roadmap for unifying Large Language Models (LLMs) and Knowledge Graphs (KGs), emphasizing the complementary nature of LLMs' generalizability and KGs' structured factual knowledge. The proposed unification consists of three frameworks: KG-enhanced LLMs for improved understanding and inference, LLM-augmented KGs for diverse tasks like construction and question answering, and Synergized LLMs + KGs that combine both in a mutually beneficial way to enhance bidirectional reasoning.
- [https://arxiv.org/abs/2305.12050](https://arxiv.org/abs/2305.12050) - CodeCompose. The paper introduces CodeCompose, an AI-assisted code authoring tool developed and deployed at Meta, based on the InCoder LLM, which has been scaled to serve tens of thousands of developers across multiple languages. It outlines the unique challenges of large-scale industrial deployment, design decisions, and metrics from its use, highlighting a 22% acceptance rate for suggestions and 91.5% positive reception, along with additional positive side effects like encouraging more in-code documentation and API discovery.
- [https://tidyfirst.substack.com/p/90-of-my-skills-are-now-worth-0](https://tidyfirst.substack.com/p/90-of-my-skills-are-now-worth-0) Article by Kent Beck further describing his tweet "I’ve been reluctant to try ChatGPT. Today I got over that reluctance. Now I understand why I was reluctant. The value of 90% of my skills just dropped to $0. The leverage for the remaining 10% went up 1000x. I need to recalibrate."
- [https://historyofinformation.com/detail.php?entryid=4724](https://historyofinformation.com/detail.php?entryid=4724) - A brief history of advanced chess tournaments that centered on human-computer teams playing chess against each other.
- [https://en.chessbase.com/post/dark-horse-zacks-wins-freestyle-che-tournament](https://en.chessbase.com/post/dark-horse-zacks-wins-freestyle-che-tournament) - A Chessbase article about an example of amateur chess players with lower-end chess software beating grand masters with high-end chess software in a freestyle chess tournament.
- [https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/](https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/) - The article by Matt Bornstein and Rajko Radovanovic presents a detailed exploration of the emerging architectures for Large Language Model (LLM) applications, outlining a reference architecture, discussing common systems, tools, and design patterns, explaining the in-context learning pattern and workflow for utilizing LLMs, and looking ahead at both the potential and challenges of integrating AI models into software, while also acknowledging the early stage of these architectures and the unmet potential of AI agent frameworks.
- [https://eugeneyan.com/writing/llm-patterns/](https://eugeneyan.com/writing/llm-patterns/) - I liked this article's description of evaluation. "This write-up is about practical patterns for integrating large language models (LLMs) into systems & products. We’ll build on academic research, industry resources, and practitioner know-how, and distill them into key ideas and practices."
- [https://lilianweng.github.io/posts/2023-06-23-agent/](https://lilianweng.github.io/posts/2023-06-23-agent/) - I particularly like this walk through of planning and memory "Building agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as AutoGPT, GPT-Engineer and BabyAGI, serve as inspiring examples"


**🔗 Appendix References (also see - [building bots](https://frankc.net/ai-entered-chat))**

- [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629) - "ReAct: Reasoning and Acting with Language Models" is a paper about a new method that uses large language models to generate reasoning traces and task-specific actions in an interleaved manner, demonstrating improved performance on a diverse set of tasks.
- [https://arxiv.org/abs/2205.00445](https://arxiv.org/abs/2205.00445) - "Modular Reasoning, Knowledge, and Language" is a paper about a new architecture for artificial intelligence that uses modular components to enable agents to reason and interact in complex environments.
- [https://medium.com/syncedreview/stanford-u-googles-generative-agents-produce-believable-proxies-of-human-behaviours-406d34b595c3](https://medium.com/syncedreview/stanford-u-googles-generative-agents-produce-believable-proxies-of-human-behaviours-406d34b595c3) - A Medium article about a study where a team from Stanford University and Google Research created agents that use generative models to simulate humanlike behaviors and demonstrated believable proxies of humanlike behaviors in remembering, planning, reacting, and reflecting.
- [https://arxiv.org/abs/2304.03442](https://arxiv.org/abs/2304.03442) - An arXiv paper about generative agents that draw on generative models to simulate both individual and emergent group behaviors that are humanlike and based on their identities, changing experiences, and environments.
- [https://reverie.herokuapp.com/arXiv_Demo/#](https://reverie.herokuapp.com/arXiv_Demo/#) - A demo of Reverie, a platform that enables real-time interaction with research papers through a chat interface.
- [https://github.com/hwchase17/langchain](https://github.com/hwchase17/langchain) - Github repository for Langchain, a framework for building multi-agent systems that use language models to communicate and reason.
- [https://simonwillison.net/2023/Apr/25/dual-llm-pattern/](https://simonwillison.net/2023/Apr/25/dual-llm-pattern/) - A blog post by Simon Willison about dual LLM patterns, an approach that involves training two language models to work together to resist prompt attacks.
- [https://simonwillison.net/2023/Apr/14/worst-that-can-happen/](https://simonwillison.net/2023/Apr/14/worst-that-can-happen/) - A blog post by Simon Willison about the worst that can happen with large language models and how to mitigate those risks.
- [https://twitter.com/karpathy/status/1655994367033884672?s=12](https://twitter.com/karpathy/status/1655994367033884672?s=12) - A tweet by Andrej Karpathy about fine-tuning language models and how it can be analogous to expertise in people, with examples of describing tasks in words, giving examples of solving tasks, and allowing people to practice tasks.
- [https://github.com/mayooear/gpt4-pdf-chatbot-langchain](https://github.com/mayooear/gpt4-pdf-chatbot-langchain) - A Github repository for a GPT-4 PDF chatbot built on Langchain.
- [https://twitter.com/ttunguz/status/1658519374632714268?s=12](https://twitter.com/ttunguz/status/1658519374632714268?s=12) - A tweet by Tomasz Tunguz about when to choose a large model versus a small model for machine learning, with considerations such as time to ship, the need for intellectual property around machine learning, and the use of proprietary or sensitive data.
- [https://github.com/brexhq/prompt-engineering](https://github.com/brexhq/prompt-engineering) - A Github repository for a Python library that provides a set of tools for fine-tuning large language models.
- [https://twitter.com/ricburton/status/1657425842304057345?s=12](https://twitter.com/ricburton/status/1657425842304057345?s=12) - A tweet by Richard Burton about models leaking data and the potential risks of fine-tuning.

[![Would you like code][review-oracle]](/img-posts/ai-entered-chat-intro.png)

[![It doesn't work yet!][oracle-yet]](/img-posts/ai-code-review-oracle-yet.png)
