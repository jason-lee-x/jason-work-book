---
title: "2026-08-27｜agentic web、共享记忆与 eval 的时间感"
date: 2026-08-27
---

今天的信号比昨天更像一张完整的工程地图：agent 不再只是“会调用工具的聊天框”，它开始逼迫搜索、记忆、企业软件、eval、权限连接和本地安全一起重做。

一个核心判断是：AI 产品正在从“模型能力叙事”转向“系统接口叙事”。谁能把信息取准、把记忆带对、把权限接稳、把 eval 跟上真实使用，谁才更接近可长期运行的 agent 产品。

## 1. agentic web 的第一性问题：搜索不是给人点的，是给 agent 用的

Training Data 的一集里，Parallel 的 Parag Agrawal 把他们的起点说得很清楚：Parallel 在做让 agents search and use the web 的技术，并且下注 agents 会比人类多用网页搜索“一千倍”。这不是简单把 Google 包一层 API，而是把 search 的客户从“懒得打完整关键词的人”换成“可以提出更长、更明确任务的 agent”。来源：[Training Data｜Parallel’s Parag Agrawal: Building a New Web for AI Agents](https://www.youtube.com/playlist?list=PLOhHNjZItNnMm5tdW61JpnyxeYH5NDDx8)

Parag 的一个尖锐说法是：“human click data is a bug”。如果 agent 是新的搜索用户，那么 ranking feedback 不应该继续围绕人类点击来优化，而应该围绕 agent 完成任务的反馈来优化。Parallel 的路径也很现实：先做 search agent，在 query 到来之后再 crawl，牺牲延迟换取早期覆盖，再逐步积累 index。来源：[Training Data｜Parallel’s Parag Agrawal: Building a New Web for AI Agents](https://www.youtube.com/playlist?list=PLOhHNjZItNnMm5tdW61JpnyxeYH5NDDx8)

这里最重要的不是“搜索引擎创业公司挑战巨头”这个表层故事，而是接口变化：agent 需要的是从权威页面抽取正确 excerpt，送进 context window，而不是让人点开 SEO 页面、加载 PDF、翻到第 73 页。Parag 还说，使用 Parallel search 往往能让 agent 用不到一半的 token，同时更准确、更快；这把 search 重新放进 quality、cost、latency 的优化三角里。来源：[Training Data｜Parallel’s Parag Agrawal: Building a New Web for AI Agents](https://www.youtube.com/playlist?list=PLOhHNjZItNnMm5tdW61JpnyxeYH5NDDx8)

## 2. 记忆开始跨表面流动，但边界也必须显式

Claude 官方宣布，Claude 现在在 chat 和 Claude Cowork 之间使用同一份 memory；用户可以决定记住什么，Cowork 接任务时能继承聊天里已经建立的项目、偏好或客户背景。Claude 还说明，memory 以 topics 列表保存在 Settings 里，可以查看、编辑或删除；用户也可以说 “remember this” 保存特定信息。来源：[Claude on X](https://x.com/claudeai/status/2092299704864284888)、[Claude on X](https://x.com/claudeai/status/2092299707653439497)

Anthropic 侧的 builder 也在呼应这个方向。Cat Wu 说，Chat 和 Cowork 的 memory 已经 unified，告诉 Claude 记一次，就能跨 surfaces 带上上下文；Boris Cherny 则把它称为一个“小改进”，但更简单、更强。来源：[Cat Wu on X](https://x.com/_catwu/status/2092337156455051345)、[Boris Cherny on X](https://x.com/bcherny/status/2092355642363453943)

但这不是无限记忆。Claude 官方同时强调，健康、宗教信仰等敏感主题默认不会进入 memory，除非用户在 Settings 里打开；Free、Pro、Max plans 默认开启 memory，并可在 Settings > Memory 查看。换句话说，AI memory 的产品化正在同时走两条线：跨工作表面迁移上下文，以及把敏感边界做成可见控制面。来源：[Claude on X](https://x.com/claudeai/status/2092299710002319742)

## 3. eval 不能停在第一周的用户行为里

Meta AI 的 Madhu Guru 继续写 eval 系列，这次的主题是 “The Eval Roadmap Problem”。他的判断很直接：很多 eval 失败，是因为团队把 eval 当静态 artifact，但用户预期和行为已经变了；eval 需要随产品和真实使用模式一起演化。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2092426017118028266)

他用 financial research agent 举例：早期用户可能只是总结 5 页 earnings report；三周后会要求比较最近 5 次 earnings reports；两个月后会给 15 份 filings、transcripts 和 research reports，让 agent 建 investment thesis；最后则希望它 monitor portfolio，并在 thesis 被实质改变时主动提醒。每一阶段都要求不同能力，也就要求不同 eval。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2092426017118028266)

这条对 AI builder 特别实用。Madhu 给出的演化维度包括：short-context 到 long-context、single-turn QA 到 multi-turn、passage citations 到 doc and line citations、simple QA 到 complex synthesis、reactive chat 到 proactive agent。真正的 eval roadmap，不是给当前 demo 找高分，而是提前给下一阶段 usage pattern 建 P0 eval。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2092426017118028266)、[Madhu Guru eval series list](https://x.com/realmadhuguru/status/2092461206783373758)

## 4. agent 的企业落点：连接、执行、权限和 outcome

Vercel CEO Guillermo Rauch 今天给了两条很实操的信号。第一是 Vercel Connect GA：他认为 building agents 最难的问题是 secure connectivity to services and data，并举例说可以创建 Notion 连接，然后得到一个 MCP client，用 authenticated user 的身份查询。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2092352411839193234)

第二是 Run SDK：面向 dynamic Code Mode execution 的 secure eval。当 agents 写代码时，不一定总需要完整 sandbox；可以在 lightweight QuickJS secure context 里运行，更快、更省成本。这个方向很有代表性：agent runtime 不会只有“完全信任”和“重型隔离”两档，中间会出现大量按风险和成本分层的 execution substrate。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2092382653161107534)

Box CEO Aaron Levie 则把话题拉到 applied AI strategy。他认为 models 与 enterprise workflows 之间还有巨大鸿沟，机会在 applied AI companies：理解业务 context、推动 change management、拥有能 route 到不同 models 的 harness、连接垂直领域的关键业务系统、解决用户在 workflow 中如何接触 agents 的 UX、并理解该领域的 evals。来源：[Aaron Levie on X](https://x.com/levie/status/2092466424694649066)

这三条合起来看，enterprise AI 的护城河不会只在“模型更聪明”。更可能在：谁有安全连接，谁能代表用户执行，谁能在垂直 workflow 里把 raw tokens 变成 resolved problems 和 outcomes。来源：[Aaron Levie on X](https://x.com/levie/status/2092466424694649066)、[Guillermo Rauch on X](https://x.com/rauchg/status/2092352411839193234)

## 5. AI 工具开始进入真实人生，但安全摩擦会立刻暴露

Peter Yang 开源了 `/fuck-cancer`，一个帮助 cancer patients 和 caregivers 面对诊断、治疗和自我 advocate 的 AI skill。它会从用户提供的 documents 和 context 创建或更新一份 practical brief，包括 care-team 信息、最多三个 next actions、confirmed facts 与 unclear items、医学术语解释、以及 care log；需要 research 时会使用 National Cancer Institute 和 ClinicalTrials gov API。来源：[Peter Yang on X](https://x.com/petergyang/status/2092249012913258946)

这个例子重要，因为它不是“帮你写邮件”的轻任务，而是在高压力、高信息密度、多人协作的真实场景里，把 AI 变成 shared source of truth。Peter 还展示了 brief 的例子，并说单一事实源对记录患者信息、下一步、已知内容、术语定义和 update log 很有用。来源：[Peter Yang on X](https://x.com/petergyang/status/2092311110871617915)

另一边，swyx 给了一个反向提醒：不要使用 Codex 的 “locked use” capabilities，因为它依赖不稳定的 macOS features，本周两次把他锁在 macOS keychain 之外；他还提到 cloud 做所有事当然好，但 cloud 还没到位。这个小故障很好地说明：当 agent 碰到 keychain、权限和本机状态，失败模式会从“回答错了”升级成“用户被锁在系统外”。来源：[swyx on X](https://x.com/swyx/status/2092492963435946494)

## 6. 协作式 vibe coding 与团队套餐：AI 开发正在多人化

Google Labs 发布 Play with Putty，称它是一个 collaborative vibe coding tool，可以实时一起 build tools and websites；目前 waitlist 面向美国 18 岁以上用户。来源：[Google Labs on X](https://x.com/GoogleLabs/status/2092293667688173593)

OpenAI 的 Thibault Sottiaux 则提到一项面向 teams 和 small companies、类似 Pro $100 plan 的方案：包含 ChatGPT、ChatGPT Work 和 Codex features，可连接 Google Workspace、Slack、GitHub、Microsoft 365 等，带 SAML、SSO、MFA、安全 workspace、centralized billing、administration、usage analytics、spend controls，并且 no 5h limits。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2092345330272780499)

这两条看似一个偏实验、一个偏商业套餐，其实方向一致：AI coding 正从个人 prompt 手感，走向多人协作、组织权限、统一账单和工具连接。个人 productivity demo 之后，下一层就是团队如何共享 context、控制 spend、连接 repo 和办公系统。来源：[Google Labs on X](https://x.com/GoogleLabs/status/2092293667688173593)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2092345330272780499)

## 结语

今天最值得留下的不是某个单点发布，而是一条主线：agent 正在把互联网、企业软件和个人电脑都改造成可执行接口。搜索要给 agent 返回干净 signal，memory 要跨 surfaces 但保留敏感边界，eval 要随用户行为演化，enterprise workflow 要解决 secure connectivity 和 outcome，个人 AI skill 则必须面对真实世界的高风险信息和本地权限。

这也是 AI builder 接下来最难的部分：不是再喊一次 autonomous，而是把 autonomous 放进不会误记、不会乱连、不会误跑、不会锁死用户机器的系统里。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 podcasts 与 X 内容整理；当日 JSON 未提供 blog 条目。未使用额外抓取来源，未纳入无明确 URL 的内容。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
