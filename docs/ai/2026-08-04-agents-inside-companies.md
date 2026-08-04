---
title: 2026-08-04｜公司里的智能体，与模型之外的路
date: 2026-08-04
---

今天的信号很集中：AI 讨论正在从“模型还能不能继续变大”分叉成两条更硬的线。一条向内，agent 进入公司、工作流、记忆和权限系统，开始像组织基础设施一样存在；另一条向下，研究者重新质疑 transformer、chain-of-thought 和 test-time learning 的底层形态。表面看是产品新闻和 builder 随笔，底层其实是同一个问题：智能不再只是回答问题，而是要长期运行、持续学习、被验证、被组织吸收。

## 1. Frontier lab 的下一堵墙，可能不是 RL，而是架构

Training Data 这期和 Core Automation 两位创始人 Jerry Tworek、Rohan Anil 的长谈，是今天最值得放在最前面的材料。Jerry 的判断很直接：过去几年行业已经掌握了两件事，大规模 pre-training 和大规模 reinforcement learning；但“更聪明的系统”的瓶颈正在变成 architecture itself。他不是在轻率唱衰 transformer，而是说，只有真正理解 transformer 把我们带到了哪里，才知道它没有解决什么。来源：[Training Data｜Building the Automated AGI Lab: Core Automation's Jerry Tworek and Rohan Anil](https://www.youtube.com/watch?v=2RJiaf0SY8s)

Jerry 对 RL 的反思尤其有分量。他说自己曾是 reinforcement learning maximalist，也曾相信一旦把 RL scale 起来，AGI 会很快到来；但模型分数继续上涨，并没有自动解决真实世界任务。原因在于训练和 eval 很多时候是同一枚硬币的两面，而真实世界分布更脏、更乱、更不完整。因此他的结论是：模型需要在 test time 学习，跟用户的数据、任务和真实分布一起学习。来源：[Training Data｜Building the Automated AGI Lab: Core Automation's Jerry Tworek and Rohan Anil](https://www.youtube.com/watch?v=2RJiaf0SY8s)

这个判断也解释了为什么单纯扩大 context 不够。Jerry 提到，in-context learning 数据效率不错，也没有 catastrophic forgetting，但容量和机制都有限；他自己使用 Codex 大约 20 分钟后就需要 compact，再往前移动上下文。continuous fine-tuning 又会碰到低数据效率和 catastrophic forgetting。真正缺的，可能是能在架构层表达“如何学习”的 meta-learned algorithm，并且能跨更长时间尺度工作。来源：[Training Data｜Building the Automated AGI Lab: Core Automation's Jerry Tworek and Rohan Anil](https://www.youtube.com/watch?v=2RJiaf0SY8s)

Rohan 则把问题落在 inference compute 的花法上：当前很多额外智能是通过 chain-of-thought 一 token 一 token 往外吐得到的，从 inference 角度看很低效；speculative decoding 更像是给 autoregressive decoding 的补丁。若 transformer 的 computational depth 不够，问题就会变成如何增加计算深度，而这会打开一批新的架构方向。来源：[Training Data｜Building the Automated AGI Lab: Core Automation's Jerry Tworek and Rohan Anil](https://www.youtube.com/watch?v=2RJiaf0SY8s)

## 2. Agent 开始进入公司，但组织需要一个“总入口”

Vercel CEO Guillermo Rauch 今天给出了一个很清晰的企业 agent 形态：Vercel 内部有一个叫 v 的 agent，日常工作已经会涉及它；它懂 finance、comms、docs、marketing、engineering、business analytics，也有 per-user memory、personalized workflows 和 schedules。更关键的是，Guillermo 强调这不是随便接一个“大厂 Slack integration”，因为如果 agent 会成为现代公司的基础，source、runtime、data、token 的控制权就很重要。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2084042561690456157)

他随后补了一层架构判断：Vercel 其实已经有很多 agents，甚至太多了。每个团队、每个人都在建和部署 agent，如果类比 web，就像每个 agent 都有自己的 domain name，用户体验很差。所以 v 既是 agent，也是 router；它有 sub-agents、skills，知道如何委派工作，也保留必要时 proxy 到网络上另一个 agent 的 escape hatch。这很像 agent 时代的 monolith / monorepo：入口集中，但内部可分发。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2084060157085143512)

Peter Yang 采访 NousResearch co-founder Karan Malhotra 时抓住了另一个问题：agent 会自己积累 skills 和 memory，怎么避免 slop？Karan 的回答是 Hermes Curator 作为后台任务会定期清理 skills 和 memory，追问“哪里是 slop，哪里能更高效”，并且因为开源，用户可以给它自己的 slop 定义，让 agent 重写自己的 cleanup loop。这个细节很小，但指向一个大问题：长期 agent 不只需要记忆，还需要反熵机制。来源：[Peter Yang on X](https://x.com/petergyang/status/2083968605432267139)

Swyx 的 computer use 观察则更像是组织边缘的现实版本：他准备记录 Codex CUA 的 “wow moments”，其中一个例子是 bot 代他处理 support chat、推动升级以获得更快解决；对方甚至不知道在跟 bot 对话，且当 support 试图推责时，bot 用完整 receipts 回击。这里的信号不是炫技，而是 computer use agent 已经开始进入那些原本由人类耐心、上下文和证据链维持的微型流程。来源：[Swyx on X](https://x.com/swyx/status/2084156733027701164)

## 3. 自动化会先吃掉“可验证的困难工作”

Box CEO Aaron Levie 给了今天最好的应用层框架：一些世界上最难的工作，反而会因为可验证性而更早被自动化。Math、cyber、code 很难、价值高，但结果能被客观测试；这同时给模型训练提供更清晰的 reward signal，也让运行时可以规模化验证结果是否正确。来源：[Aaron Levie on X](https://x.com/levie/status/2083965372747882741)

反过来，legal clauses、marketing campaign、sales message、financial targets 等工作没有单一正确答案，还受内部外部因素、操作者风险偏好、上下文输入质量和滞后反馈影响。Levie 的结论是，即使模型能力继续上升，applied AI layer 仍然会有很多工作要做，流程本身也需要重构；我们甚至可能需要为知识工作发明新的“长期测试”能力，就像软件有 tests 一样。来源：[Aaron Levie on X](https://x.com/levie/status/2083965372747882741)

Claude Code 的 Thariq 把同一件事放到了数学上：他认为 Jevons paradox 已经在数学里出现，AI 让更多事发生、让理解更容易，也让数学家能在更高抽象层次上讨论；因此对“懂数学、会思考的人”的需求会上升。他还补了一句，里面有很多和 chess 发生过的事相似。来源：[Thariq on X](https://x.com/trq212/status/2083977795290734975)、[Thariq on X](https://x.com/trq212/status/2083978109376987365)

Replit CEO Amjad Masad 的 LLM chess engine 则是一个小型但直观的验证场：它已经在 LiChess 上自主和真人、bot 下棋，并且达到 1253 Elo；他还提到可以在网站上看 live games，甚至同时下 3 盘。棋类游戏的价值不在“LLM 会下棋”这个噱头，而在于它是可交互、可评分、可失败、可改进的环境，很适合看 agent 如何从玩具能力走向稳定行为。来源：[Amjad Masad on X](https://x.com/amasad/status/2083926395403821427)、[Amjad Masad on X](https://x.com/amasad/status/2083936067355635948)

## 4. 人的 agency 会先断裂，再重建

Dan Shipper 今天写的 “agency rupture” 很适合描述 AI 使用者的心理曲线。当你第一次看到 language model 做掉一个原本需要你每一步参与的任务，会感到一种主体性断裂：你只看到 AI，看不到前后由人搭建的 scaffolding。随着经验增加，人开始看到模型边界、上下文、提示、监督和质量控制这些脚手架；再往后，使用 AI 会像使用任何工具一样隐形，你不再说“AI 做了这个”，而是说“我做了这个”。来源：[Dan Shipper on X](https://x.com/danshipper/status/2084038453831020916)

这个框架和 Guillermo 的另一条短帖正好互补：AI alone 很酷，但 mastery + creativity + AI 是另一个层级，不要因为 AI 而放弃 excellence 和 craft。换句话说，agent 越强，人的工作越不是按旧任务清单守阵地，而是把脚手架、审美、验证、抽象层次和问题选择变成新的核心能力。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2083969120270450911)

Ryo Lu 从设计角度问了同一个问题：Rdio、Mailbox、Apple 这类 app 曾经教会他软件如何变得简单、直觉、可触摸；当我们离开 app 世界，软件还有哪些部分会保持可见，它会是什么触感？这不是怀旧，而是 agent UI 的真正难题：如果 agent 接管越来越多动作，界面不应该只剩一个聊天框，仍然需要让用户摸到控制感、状态和意图。来源：[Ryo Lu on X](https://x.com/ryolu_/status/2083939454017053179)

Andrej Karpathy 提到 Simon Willison 的 pelican-on-a-bicycle test，并把 source 上传成可在浏览器里玩、可 fork 的版本，还开玩笑说 GTA Hobbiton 会比 GTA VI 先来。这类小实验看似轻松，其实展示了 AI 时代软件创作的另一个方向：更多人会把一次性想法做成可运行的小世界，然后让别人 fork、改、玩。来源：[Andrej Karpathy on X](https://x.com/karpathy/status/2083948654377996480)

## 5. 资本市场也在按 AI 的节奏变得更快、更“vibes”

FPV Ventures partner Nikunj Kothari 从投资侧看到的景象很刺眼：VC 已经几乎完全变成 vibes capital，early-mid stage 市场和 fundamentals 脱节；有些轮次什么都没有也能非常疯狂，有些看起来稳的公司反而融资困难。他认为这种状态至少还会持续 12 到 18 个月，原因包括 dry powder 和 AI tailwind。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2083873335998333227)

他的第二个观察是 public markets 也在同步加速：过去 meme stock 才会有的 5% 以上日内波动，如今 trillion-dollar stocks 也可能因为 vibes 和 model releases 出现大幅摆动。长期看，fundamentals、盈利能力、干净 cap table 仍会重要；短期看，资本已经变成竞争武器，创始人在下场前必须知道自己玩的是什么游戏。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2083873335998333227)

YC CEO Garry Tan 则给了更乐观的一面：AI 会创造难以想象的经济增长；同时他也提醒，很多人把 map 误认为 territory，而 markets 里的 territory 是结果，即你是否做出了人们想要的东西。把这两条和 Nikunj 的 “vibes capital” 放在一起看，今天的创业环境很矛盾：叙事加速，但真正的地面仍然是产品是否被需要。来源：[Garry Tan on X](https://x.com/garrytan/status/2083957110711386439)、[Garry Tan on X](https://x.com/garrytan/status/2083920039208693996)

## 结语

今天最值得记住的不是某个单点发布，而是一组方向感：frontier research 在寻找 transformer 之后的 test-time learning；公司开始需要 agent router、memory curator 和反熵机制；自动化优先进入可验证的困难领域；人的 agency 会围绕 AI 重新组织；资本市场则用更快的节奏惩罚和奖励叙事。AI 继续变强，但真正的建设工作越来越不像“调用模型”，而像设计一个能学习、能验证、能被组织长期承受的系统。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X、podcast、blog 内容整理；没有使用额外抓取来源。无明确 URL 或与 AI 建造者信号弱相关的内容未纳入正文。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
