---
title: 2026-07-12｜Agent 开始花钱，经济栈开始长牙
date: 2026-07-12
---

今天的 builders 信号很单一，但并不弱：只有一条 podcast 进入 JSON，主题却足够硬。Stripe 的 Emily Sands 谈 agentic commerce，不是把 agent 想象成「帮你买鞋」的小助手，而是把它放进支付、目录、fraud、usage billing 和公司生成的完整经济系统里看。

更重要的判断是：agent 一旦开始代表人或公司花钱，它就不再只是 UI 或 productivity feature。它需要能被授权、能被计费、能被风控，也要能在买、卖、集成、消耗 token 的过程中留下可审计的经济轨迹。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

> 注：今日 JSON 只提供了 YouTube 频道页 URL，没有提供单集 watch URL；下文所有内容均只基于 JSON 中该节目的 transcript，不额外抓取或补链。

## 1. Agentic commerce 不是一个场景，而是一条自治光谱

Emily Sands 把 agentic commerce 拆成一条 spectrum：一端是人仍然做主要判断，只是在 AI surface 里发现商品并点击购买；另一端是 agent 自主发现服务、决定购买并完成交易，中间有多层不同程度的 delegation。她提到 Stripe 内部甚至有类似自动驾驶 L1 到 L5 的框架，目前 consumer 侧大多还在 Level 2 附近：用户会让 AI 帮忙选择或发现，但还没到「一句话订完整个暑假旅行」的阶段。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

这件事的产品含义很直接：AI commerce 不只是把 checkout button 放进 ChatGPT、Gemini 或 Copilot。商家需要把 catalog、inventory、price 暴露给 agent；消费者需要授权 agent 付款；agent 需要安全地执行交易。Emily 提到 Stripe 已与 Google 合作，让商家能在 AI Mode 和 Gemini app 里销售，也在与 Microsoft、OpenAI 做类似事情，并通过 Meta 在 ads 里支持 checkout。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

## 2. ACP 像 commerce 版 MCP：目录和支付 token 要标准化

Stripe 与 OpenAI 合作的 Agentic Commerce Protocol，核心不是炫技，而是减少重复集成。商家不应该为每个新 agent surface 单独注册 catalog、inventory 和价格；ACP 让商家暴露一次，再选择接入支持该 protocol 的 agents。Emily 还强调 shared payment token：agent 在交易时传递的是 tokenized credentials，而不是直接拿到用户信用卡。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

这也是为什么她把 ACP 描述成 platform agnostic、payment processor agnostic。它能与 OpenAI 工作，也能与其他 provider 工作；Stripe 可以处理支付，也可以把 shared payment token 传给其他 PSP。按 transcript，已有 Best Buy、Coach、URBN、Kate Spade、Quince、Fanatics、JD Sports 等品牌，以及 Wix、Shopify、BigCommerce、commercetools 等平台侧参与；agent 侧则包括 Google / Gemini、Microsoft、OpenAI 等。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

如果把 MCP 理解成「工具如何被模型调用」，ACP 关心的是「商品和支付如何被 agent 安全调用」。前者让 agent 能做事，后者让 agent 能进入经济活动。

## 3. 真正逆风的主题：token theft 可能比传统支付欺诈更重要

这场谈话里最值得警惕的部分不是购买，而是 abuse。Emily 开场就说，fraudsters 在 AI 里不一定要偷钱或凭证，只要偷 token；她看到的数据是，AI 公司超过六分之一的新注册可能属于这类 abuse。她称 token theft 是 AI 里最 under-discussed 的话题之一。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

token 被偷之后的用途也很具体：有人转售便宜账号或服务；有人批量生成音乐上传到 Spotify、Apple Music，再制造假播放拿 royalty；还有人 clone 一个 AI 公司外壳，后端实际调用被偷用的服务，再以更低价格卖出去。这个问题过去在 SaaS 里没那么致命，因为 marginal cost 接近零；但 AI 产品每次使用都可能烧真实 token 成本，first-party abuse 会直接变成毛利问题。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

Stripe 的应对方向也从 transaction fraud 扩展到 full customer lifecycle abuse：登录、free trial start、usage accumulation 都可以把 metadata 发给风控 API，返回风险分数，再决定 block、top-up 或 cut off。Emily 说 AI 公司已经非常在意这个问题，因为如果无法安全开放 self-serve 和 PLG，就会错过 agents 作为 buyers 带来的增长。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

## 4. MPP、Tempo、Metronome：agent 经济需要流式支付

在更机器化的一端，Emily 提到 Stripe 与 Tempo 做了 Machine Payments Protocol。它的工作方式很简单：agent 请求访问一个服务，服务返回 payment request，agent 支付；不需要 account creation、checkout UI 或 human in the loop。这是面向 agents-as-buyers 的机器可读支付层。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

更有意思的是 streaming payments。agent 可能非常快地消耗 token，如果 AI 公司只靠事后 invoice，就会在 abuse 或失控使用里承担风险。Emily 描述的组合是：Metronome 负责实时 tracking usage，Tempo 负责 fast、low-cost、high-volume micropayments，并用 stablecoins 即时结算。换句话说，AI 公司可以在 token 被消耗时同步收费，而不是在开放增长和防止坏账之间二选一。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

这条线索说明，agent economy 的 financial infrastructure 不会只是传统订阅制的延伸。seat-based pricing 会被 usage、token、micro-payment、real-time risk score 这些东西重新切开。

## 5. AI 正在改变公司的最小形态

Emily 还把 agentic commerce 放到 business formation 里看。她说美国 business formations 在疫情后先上升、平台化，最近几个季度又重新加速；增量主要来自 non-employer firms，也就是 solopreneurs。按她的说法，美国已有 500 万人靠 solo companies 谋生，数十万人年收入超过 100 万美元。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

她给出的机制并不玄：AI 帮人从 idea 到 product，domain-specific agents 帮人处理 accounting、customer support 等经营环节，经济基础设施则让小团队更早收费、更快全球化。她还提到高级经济体的新 business registrations 上升，例如 Netherlands 约 40%、Finland 约 70%、France 约 80%；Stripe Atlas 的 2026 cohort 早期收入轨迹约为上一年同期的 5 倍。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

这让 agent 的终局不只是「替人点击购买」。Emily 最后给了一个更锋利的画面：不是 Emily 授权一个 agent 代表她买东西，而是 Emily 有一个被分配去经营业务的 agent，它会买东西、卖东西、配置 infrastructure，并尝试赚利润。她称这接近「agent as a micro firm」的方向。来源：[The MAD Podcast with Matt Turck｜Stripe's AI Chief: How AI Agents Will Buy, Sell, and Pay](https://www.youtube.com/@DataDrivenNYC/videos)

## 简短结语

今天最值得带走的判断是：agent 一旦进入经济系统，难点会从「能不能理解意图」转向「能不能承担后果」。

能买东西，就要有授权和退款；能消耗 token，就要有实时计量和风控；能代表公司做采购，就要能暴露 catalog、验证 inventory、传递 payment token；能经营业务，就要面对税务、欺诈、账单、margin 和合规。AI builder 接下来要补的，不只是更聪明的 agent，而是一整套让 agent 可以安全花钱、收费、结算和被约束的经济栈。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
