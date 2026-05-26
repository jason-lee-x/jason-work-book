---
title: 2026-05-26｜世界模型回潮，Agent 长出手脚
date: 2026-05-26
---

# 2026-05-26｜世界模型回潮，Agent 长出手脚

今天这批信号的底色很清楚：AI 叙事正在从“模型还能不能继续变大”，转向“系统怎么真的进入世界”。一边是 Yann LeCun 继续把 LLM 和 human-level intelligence 切开，强调 world model、JEPA、planning；另一边，builder 们在讨论 agent 作为员工、CEO 的 AI 幻觉、legacy code 的再蒸馏、网站如何变成 headless tool。

换句话说，今天的关键词不是更炫的 demo，而是两件更硬的东西：**能预测后果的模型**，以及**能承受真实工作摩擦的 agent 系统**。

## 1) LeCun 的分歧：LLM 很有用，但不是通往世界智能的路

Unsupervised Learning 最新一期请到 Yann LeCun，标题直接把冲突摆出来：Leaving Meta、Breaking The LLM Paradigm、Why Hinton is Wrong。LeCun 的立场并不是“LLM 没用”，而是更精确：LLM 是非常有用的语言、代码、数学、法律文本工具，但他不认为它们是通往 human-level、human-like，甚至 animal-like intelligence 的路径。[来源](https://www.youtube.com/@RedpointAI)

他的理由集中在“世界”本身。语言是离散的、符号化的，现实世界却是高维、连续、带噪声、混乱的。LeCun 说 AMI 的方向是 “AI for the real world”，核心在于 world model：一个 agentic system 必须能预测自己行动的后果，否则就谈不上真正规划。[来源](https://www.youtube.com/@RedpointAI)

这也解释了他对 VLA 的不耐烦。按照 transcript，LeCun 把 VLA 描述为 vision-language-action models，也就是用 LLM 路线让系统从视觉和语言输入里生成动作；他的判断很直：这条路正在被视为“不太走得通”，因为可靠性不够、训练数据需求过高。[来源](https://www.youtube.com/@RedpointAI)

更关键的是，LeCun 认为真正的 agent 不是自回归地吐出下一个 action，而是通过 search 和 optimization 找到一串能完成目标的 action。这里的分歧很深：LLM 的强项是 next token prediction，而 world model 要的是预测行动后果，再基于后果做 planning。[来源](https://www.youtube.com/@RedpointAI)

## 2) JEPA 的品味：不要预测像素，要预测抽象表示

LeCun 在这期里把 JEPA 的来龙去脉讲得很清楚。生成式方法试图还原像素，但他认为这在视觉和视频表征学习上一直不够理想；相反，DINO、iJEPA、VJEPA、SimSiam、MoCo 这类 joint embedding / non-generative 方法，更适合学习图像和视频的抽象表示。[来源](https://www.youtube.com/@RedpointAI)

这不是一个纯学院派差别。人类看见一个未盖盖子的水瓶，不会在脑内逐像素模拟水怎么洒，而是抽象地判断：推底部会滑，推顶部可能翻。LeCun 要的 world model 也是这种层级的预测，而不是像素级未来帧生成。[来源](https://www.youtube.com/@RedpointAI)

到最后，他还提到 SIGREG，也就是 sketch isotropic Gaussian regularization，以及之前的 VicREG。它们要解决的是 joint embedding architecture 的 collapse 问题：如果不用某种方式防塌缩，encoder 可能学出无信息的表示。LeCun 提到一篇他推荐的 “Le world model” 小规模工作，认为方向很有希望。[来源](https://www.youtube.com/@RedpointAI)

这组信号值得放在今天开头，因为它提醒我们：如果 AI 真要进入机器人、制造、真实物理世界，下一轮竞争可能不是“谁的 chatbot 更会说”，而是谁能让模型学会可规划的世界表征。[来源](https://www.youtube.com/@RedpointAI)

## 3) CEO 的 AI 幻觉：离最后一公里越远，越容易误判 agent

Box CEO Aaron Levie 今天的判断很尖锐：CEO 特别容易陷入 “AI psychosis”，因为他们距离最后一公里的真实工作太远。CEO 看到的是 happy path：一个漂亮的产品原型、一份生成出来的合同；但他们不一定亲自经历代码上线前的 review、bug 修复、合同条款核对、历史合同接入这些脏活。[来源](https://x.com/levie/status/2058582370253701432)

Google 的 Madhu Guru 补了同一个问题的组织版本：很多 CEO 和高管习惯了 arms-length leadership，缺少亲手使用 AI 的肌肉，于是给公司下达宏大但模糊的 AI mandate。结果员工为了响应粗粒度目标，做出一堆 performative、low-effort demos；两年过去没有真实进展，然后被 hands-on leadership 的 startup 打穿。[来源](https://x.com/realmadhuguru/status/2058591611245011157)

这两条放在一起，结论非常实用：AI 转型不是“高层喊口号，基层做 demo”。真正懂 agent 的管理者，必须自己大量使用 AI，亲自撞上权限、验证、上下文、数据接入、成本、审计这些边界，然后再决定组织怎么改。[来源](https://x.com/levie/status/2058582370253701432) [来源](https://x.com/realmadhuguru/status/2058591611245011157)

## 4) Solo founder 的新组织：先造“造 MVP 的系统”

Peter Yang 转发 Ryan Carson 的做法，里面有一句很像这一轮 builder 文化的纲领：“We used to say build the MVP. Now you should build the system that builds the MVP first.” Ryan 的 startup 拿了 200 万美元 seed，但他暂时不打算招人，因为 founder 应该先理解每个岗位、亲自做、亲自感受痛点，再决定是否雇人。[来源](https://x.com/petergyang/status/2058555226479866312) [来源](https://x.com/petergyang/status/2058609058714968194)

他的 agent 组织形态也很具体：OpenClaw 做 AI chief of staff，处理邮件 triage、会议预订、sales outreach；Codex 和 Devin 像 AI engineering team，在他睡觉时继续 ship features。重点不是“用了某个工具”，而是把 agent 当员工对待：给它真实 email、calendar access、GitHub account，前期认真设置 skills 和 documentation。[来源](https://x.com/petergyang/status/2058555226479866312)

这条线和 Aaron Levie 的提醒并不矛盾。agent 可以让一个 founder 暂时获得“十个人”的杠杆，但前提是 founder 自己足够靠近工作现场，能设计流程、写清楚文档、验收输出，并知道什么时候必须亲自介入。[来源](https://x.com/petergyang/status/2058555226479866312) [来源](https://x.com/levie/status/2058582370253701432)

## 5) Legacy code 变成训练矿：重写不是搬运，而是 distillation

Claude Code 团队的 Thariq 从 Bun rewrite 得到一个判断：legacy codebase 会变得非常有价值，因为它们可以作为把代码“蒸馏”到新形态的来源。他的例子很直接：每个游戏都应该 cross-platform，所有 legacy software 都应该能跑到 web 上，我们不再需要 COBOL。[来源](https://x.com/trq212/status/2058576195000660319)

但他也马上加了限制：模型还没完全到位，Bun 之所以适合这种实验，是因为它非常 verifiable，并且有强测试覆盖。这句话重要，因为它给 AI rewrite 划了真实边界：不是所有旧代码都能放心交给模型，而是那些有明确行为、可验证接口、充分测试的系统，才更像能被 agent 安全迁移的矿脉。[来源](https://x.com/trq212/status/2058576196481200223)

如果把这和 LeCun 的 world model 放在同一张图里看，会发现二者其实共享一个工程原则：智能不是只会生成，而是要能被环境反馈约束。物理世界靠后果预测，软件世界靠 test coverage 和 verifiability。[来源](https://www.youtube.com/@RedpointAI) [来源](https://x.com/trq212/status/2058576196481200223)

## 6) 网站也要为 agent 露出“骨架”

Nikunj Kothari 分享了一个很 practical 的 Claude Code 用法：与其让 agent 靠 DOM 或截图硬导航，不如用 browser_harness 或 vanilla Playwright 让它 sniff network requests，通过点击页面收集日志，再反推出 API 结构、auth 方式和 rate limit。这样就能构造 programmatic jobs，把原本只能手工点的网站变成可自动化的数据入口。[来源](https://x.com/nikunj/status/2058783316753686558)

他进一步判断：很多网站很快都需要 headless，agent 也需要能 programmatically pay websites。就像 llms.txt 给模型看数据和结构，未来也会需要 tools.txt，让 agent 知道有哪些工具可调用。[来源](https://x.com/nikunj/status/2058783316753686558)

这条信号非常像 agent 时代的“view source”。过去网站优先服务人类眼睛，后来服务搜索引擎 crawler，下一步可能要服务 autonomous agents。谁能把自己的服务变成稳定、可发现、可授权、可付费的 tool，谁就更容易进入 agent workflow。[来源](https://x.com/nikunj/status/2058783316753686558)

## 7) Harness 可能比模型本身更接近“AGI 体感”

Matt Turck 引用 OpenAI 的 Yann Dubois，说如果把现有模型冻结，只是认真打磨 harness，甚至用更好的 harness 做训练，人们可能会在每个领域都“feel the AGI”。这句话没有证明 AGI 已经到来，但它把注意力从 model checkpoint 拉回系统外壳：工具、验证、上下文、任务分解、执行循环，可能决定了用户到底感受到多少 intelligence。[来源](https://x.com/mattturck/status/2058659995311358332)

这也解释了为什么今天很多 builder 的话题都不像“模型新闻”：agent employee、API reverse engineering、legacy rewrite、CEO hands-on、tools.txt，这些都是 harness 的一部分。模型是发动机，但 harness 决定它能不能上路。[来源](https://x.com/mattturck/status/2058659995311358332) [来源](https://x.com/petergyang/status/2058555226479866312) [来源](https://x.com/nikunj/status/2058783316753686558)

## 8) 品牌、taste 与重新变成 IC

Vercel CEO Guillermo Rauch 说，build a great brand 的方法是 build a great product。这句话朴素，但在 AI demo 泛滥时反而有辨识度：当每个人都能生成 landing page、视频、原型，品牌最后还是会回到产品质量本身。[来源](https://x.com/rauchg/status/2058750970998505505)

YC 的 Garry Tan 用更短的话表达同一个 builder ethos：high agency high taste is the unlock these days。AI 降低了执行门槛，但没有降低品味门槛；相反，当执行变便宜，taste 变得更稀缺。[来源](https://x.com/garrytan/status/2058769355916411099)

Zara Zhang 提到一个工程经理朋友主动转回 IC，原因是终于能重新亲手 build，而且更开心。这条小观察和今天的主线也对得上：AI 时代的组织红利，可能不是让更多人远离一线，而是让更多高判断力的人重新靠近构建现场。[来源](https://x.com/zarazhangrui/status/2058640897236140034)

## 简短结语

今天最值得记住的不是某个单点发布，而是一条正在成形的主线：AI 的下一阶段会同时向两个方向深入。

一端是 LeCun 式的底层路线之争：模型要不要理解世界、预测后果、用 search 做 planning。[来源](https://www.youtube.com/@RedpointAI) 另一端是 builder 们的系统工程：agent 如何入职、如何接 API、如何验证 legacy rewrite、如何避免 CEO 只看 happy path。[来源](https://x.com/petergyang/status/2058555226479866312) [来源](https://x.com/nikunj/status/2058783316753686558) [来源](https://x.com/levie/status/2058582370253701432)

如果说过去两年 AI 的关键词是“模型能力涌现”，今天这批信号更像是在说：下一轮真正有用的能力，来自模型、工具、权限、测试、组织和品味之间的闭环。

## 原始来源

- [Unsupervised Learning: Ep 86: Yann LeCun on Leaving Meta, Breaking The LLM Paradigm, & Why Hinton is Wrong](https://www.youtube.com/@RedpointAI)
- [Peter Yang on X: Ryan Carson runs his startup solo with AI agents](https://x.com/petergyang/status/2058555226479866312)
- [Peter Yang on X: Ryan Carson on not hiring after a $2M seed round](https://x.com/petergyang/status/2058609058714968194)
- [Aaron Levie on X: CEOs and AI psychosis](https://x.com/levie/status/2058582370253701432)
- [Madhu Guru on X: AI FOMO and arms-length leadership](https://x.com/realmadhuguru/status/2058591611245011157)
- [Thariq on X: legacy codebases as distillation sources](https://x.com/trq212/status/2058576195000660319)
- [Thariq on X: Bun is verifiable and heavily tested](https://x.com/trq212/status/2058576196481200223)
- [Nikunj Kothari on X: reverse engineering APIs with Claude Code](https://x.com/nikunj/status/2058783316753686558)
- [Matt Turck on X: AGI may be felt through better harnesses](https://x.com/mattturck/status/2058659995311358332)
- [Guillermo Rauch on X: great brand comes from great product](https://x.com/rauchg/status/2058750970998505505)
- [Garry Tan on X: high agency high taste](https://x.com/garrytan/status/2058769355916411099)
- [Zara Zhang on X: returning from engineering management to IC](https://x.com/zarazhangrui/status/2058640897236140034)
