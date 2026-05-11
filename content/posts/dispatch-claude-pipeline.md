---
title: "Building Dispatch: an AI-powered news pipeline with Claude and an MCP server"
description: "How I architected a trust-scored AI news brief using Haiku 4.5, Sonnet 4.6, and the Model Context Protocol"
date: "2026-05-11"
tags: ["claude", "anthropic", "mcp", "ai-engineering", "pipelines"]
---

_How I architected a trust-scored AI news brief using Haiku 4.5, Sonnet 4.6, and the Model Context Protocol_

---

AI news has a noise problem. Every day, hundreds of articles hit the internet: press releases dressed as reporting, republished rumors with no primary source, breathless predictions with nothing to falsify. Most aggregators surface all of it. I wanted to build something that did not.

Dispatch is a daily AI news brief that only publishes stories that earn it. Every story is scored across four dimensions: primary sourcing, cross-referencing, falsifiability, and hype. Score below 50 out of 100 and it does not run. Since launching, 309 stories have been filtered out. That number is the product working correctly.

---

## The pipeline

The architecture is deliberately unglamorous: cron jobs pull from 226 sources, GitHub Actions orchestrate the processing steps, and the results land in a database that feeds the site.

I made an early decision to go batch over real-time. For a daily brief, latency is irrelevant. What matters is reliability, cost, and the ability to inspect and retry. Batch processing gives you all three. You can audit every step, replay a failed run, and keep compute costs predictable. Real-time pipelines are exciting until something breaks at 3am.

---

## Where Claude fits - and which model does what

This is where the architecture gets interesting.

Every story that enters the pipeline gets evaluated by **Claude Haiku 4.5**. At the volume Dispatch processes - hundreds of stories per run - you need a model that is fast, cheap, and consistent. Haiku handles the per-story trust scoring: extracting claims, identifying primary sources, checking for cross-referencing, flagging hype language. It runs on everything. Most stories get filtered here.

The stories that make it through go to **Claude Sonnet 4.6** for final synthesis. Sonnet writes the actual daily brief - one run per day, no volume pressure, full quality. It takes the filtered and scored stories and assembles the editorial voice that readers see.

This split was not arbitrary. Haiku 4.5 is remarkably capable for structured evaluation tasks where the schema is tight and the instructions are clear. Sonnet 4.6 is where you want to be when the output is what your users actually read. Matching model capability to task requirements is not just a cost optimisation. It is how you build something sustainable.

---

## The MCP server

Once Dispatch had a curated, trust-scored corpus, the natural question was: how do you make it useful beyond the website?

Dispatch exposes an MCP server at `deliver-ai.xyz/mcp`. It gives Claude Desktop, Claude.ai, or any MCP-compatible client read access to the corpus via three tools:

- **`search_stories`** - query by topic, keyword, date, or minimum trust score
- **`get_story`** - retrieve full article content, source citations, and trust breakdown
- **`get_stats`** - aggregate data on story counts, topic distribution, and average trust scores

Building on the Model Context Protocol meant Claude could answer questions about today's AI news grounded in Dispatch's curated data rather than its training cutoff. Ask Claude what happened in AI policy this week and it can pull from 172 issues of filtered, sourced reporting.

The implementation is straightforward: HTTP/Streamable-HTTP transport, no authentication required, 60 requests per minute per IP. The interesting part was not the protocol. It was realising that the corpus itself became more valuable once it was accessible as context rather than just a website.

---

## What I would do differently

The trust scoring prompt took several iterations to get right. The hype dimension in particular is subjective. "This model is 10x better than anything before it" is a different kind of claim than "this paper reports a 3% improvement on benchmark X." Getting Claude to make that distinction consistently required being more explicit about what falsifiability actually means in practice, with examples.

I would invest more time upfront defining the scoring rubric before writing any prompts. Concrete criteria beat abstract instructions every time.

---

## Closing

Dispatch is a small product solving a real problem I had. But building it clarified something about working with LLMs at a pipeline level: the architecture decisions matter as much as the prompts. Choosing the right model for each task, designing for batch reliability over real-time complexity, and thinking about how your data becomes useful as context - these are the decisions that compound.

The MCP server was the last piece. It turned a daily brief into a knowledge base that Claude can reason over. That felt like the right direction.

---

_Dispatch is live at [deliver-ai.xyz](https://deliver-ai.xyz). The MCP server is public at [deliver-ai.xyz/mcp-info](https://deliver-ai.xyz/mcp-info)._
