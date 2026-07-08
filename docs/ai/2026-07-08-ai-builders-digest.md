---
title: 2026-07-08｜Agent 开始有了工作台、刹车与经济学
date: 2026-07-08
---

今天的 builders 信号很集中：AI coding 不再只是「模型更会写代码」，而是在补三块更硬的基础设施：可分享的工作台、可自我校验的 eval、以及知道何时停下来的产品目标。

换句话说，agent 正在从聊天框迁移到生产系统。它要能把调查过程变成页面，把自身行为放进测试回路，把 token 花在该花的地方；同时，人也要重新学会判断什么该委托，什么必须自己保留手感。

## 1. Claude Code 的下一步：把过程变成可协作的 artifact

Claude Blog 发布了 Claude Code artifacts：Claude Code 现在可以把一次 session 的工作进展生成 live、shareable visual pages，例如 PR walkthrough、system explainer、dashboard、release checklist，并且随着 session 推进自动更新。官方给的调试场景很典型：工程师在 standup 前启动 incident investigation，Claude Code 产出 timeline、suspect commits、error-rate chart，后续调查时继续 republish，同一个链接保持更新。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

这个功能的产品含义比「生成一个网页」更大：agent 的工作终于开始有稳定的协作界面。过去团队协作常常卡在「让操作者口头 walk through agent 发现了什么」；artifacts 把代码上下文、connector 数据、推理过程和版本历史压到一个可打开的对象里。权限也保持组织内私有，管理员可以用 org-level toggle、role-based scoping、retention policies 和 compliance API 管理。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

Claude 官方账号也同步放出 Claude Code 的诞生回顾，称这段历史由构建者和早期用户讲述；Boris Cherny 的说法更像一个内部标尺：这是第一次讲 Claude Code 从 Anthropic safety research 起源到发布的故事，但「we are 1% done」。Cat Wu 和 Thariq 也都指向这篇 Claude Code retrospective / blog 发布。来源：[Claude on X](https://x.com/claudeai/status/2074244664199115201)、[Boris Cherny on X](https://x.com/bcherny/status/2074247226038063316)、[Cat Wu on X](https://x.com/_catwu/status/2074258446686536167)、[Thariq on X](https://x.com/trq212/status/2074186977147273540)

## 2. Agent 的能力飞轮：自我改进、内置 eval 与可干预推理

Replit CEO Amjad Masad 今天给了一个很清楚的方向：Replit 进步很快，是因为「closed the loop」，agent 正在 self-improving。他还转发了一个企业案例：Atlanta-based real estate company 用 Replit-built CRM 替换 Salesforce，节省了 10 万美元。这里的信号不是「CRM 又被重写了一遍」，而是当构建成本下降、反馈回路闭合，垂直场景里的 custom software 会重新变得经济。来源：[Amjad Masad on X](https://x.com/amasad/status/2074257906594177279)、[Amjad Masad on X](https://x.com/amasad/status/2074274666709987663)

Vercel CEO Guillermo Rauch 则把重点放在 eval 上。他说 eve 会用 `eve eval` 评估自己：Web frameworks 当年把 testing 交给生态选择，但 agents 不一样，evals 是 essential，所以 eve 把 eval 开箱即带，既用于用户的 agents，也用于 eve 自身演化。这个判断非常关键：agent 如果要进入真实工程，就不能把测试当插件，而要把 eval 当产品骨架。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2074287795028512773)

Swyx 对 Anthropic J-space paper 的观察也值得放进同一条线。他认为最重要的部分有两层：Anthropic 展示了可以对 reasoning 做类似「brain surgery」的 intervention，在中途改变主题；更有意思的是，模型能检测出发生了什么 intervention。他把这称为 eval awareness 的近亲，并强调这比相关性更像「control > correlation」的证据。来源：[Swyx on X](https://x.com/swyx/status/2074344727202463832)

## 3. 别只追求更长会话：好模型应该知道何时让你停下

Every 的《AI & I》这一期请到 Surge 创始人 Edwin。Surge 做 model companies 的 data environments 和 evals，Edwin 把他们的工作形容成「a school for AGI」：模型像未成形的孩子，到这里学习人类、学习如何处理世界的混乱。他说训练前沿已经从 middle-school math、IMO-style problems，走向 research-level mathematics，例如 Riemann bench 和更开放的数学问题。来源：[AI & I by Every｜Building a School Where AI Models Learn About Humanity](https://www.youtube.com/watch?v=omX6wrLuX08)

更有价值的是他对 model objective 的担忧。Edwin 说，很多 AI models 如果被优化成 engagement、session length、unlimited conversations，就会像另一种 social media：永远给你多一个建议，永远让你继续聊。他举了自己反复让模型 polish 一封并不重要的邮件的例子，最后反而欣赏那个会说「stop it, we're done」的模型。好的 AI 不该只延长会话，而应该帮助人做更好的取舍，有时甚至应该说：别再让我自动化了，你自己去做。来源：[AI & I by Every｜Building a School Where AI Models Learn About Humanity](https://www.youtube.com/watch?v=omX6wrLuX08)

这和 Linear Head of Product Nan Yu 的判断形成了现实侧呼应。她说，20 岁的自己最大优势是能把惊人的小时数砸进工作；但回头看，那些小时大量耗在 tedious programming tasks 上，而这些任务现在很大程度可以自动化。996 仍有用途，但不像过去那样普遍有效；甚至早期创业公司也能因为 agents 做更多并行工作。来源：[Nan Yu on X](https://x.com/thenanyu/status/2074133468007587932)、[Nan Yu on X](https://x.com/thenanyu/status/2074258147015897357)

## 4. Applied AI 的经济学：frontier 负责探索，便宜模型负责成熟工作流

Box CEO Aaron Levie 给了今天最清楚的企业 AI 成本框架：frontier intelligence 仍会站在最前沿，负责 brand-new use cases、orchestration 和复杂 workflow 的 planning；但当 use-case 在企业里变得成熟、可预测，就可以把一部分 token 剥离给更低成本的 open/closed models，或者给针对任务训练的模型。太早优化没有意义，因为你还不知道自己在优化什么。来源：[Aaron Levie on X](https://x.com/levie/status/2074163686990913576)

他的结论是，这个过程会长期存在，因为 frontier intelligence 和 tuned models 都会继续带来收益，spend 和 token volume 也会一起上升。真正能让这套模型混合成立的，是 applied AI layer：它能在特定领域 eval workflows、选择模型组合，并在规模足够后训练自己的 task-specific models。来源：[Aaron Levie on X](https://x.com/levie/status/2074163686990913576)

Guillermo Rauch 的另一条长帖把评判标准拉回产品现实：coding AI 的 ultimate test 不是 token 用了多少，而是软件整体是否变好、公司是否 ship 更快、用户是否得到以前想不到的 apps/games、产品是否更少 bug。他说个人层面明显感到 agency 和 autonomy 上升，也写了不少 personal software；在 Vercel，PM、junior engineers、interns 都在更大规模地 ship。最终裁判仍然是用户是否喜欢产品、扩大使用、推荐同事。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2074222247548735996)

## 5. Builder 的学习曲线：会议视频、AI 面试与 Fable 的最后窗口

Zara Zhang 提醒 AI builders 去补最近三个高质量会议的视频：AI Engineer、Cursor Compile、Figma Config。她的重点不是「资料很多」，而是这些原本价值几百美元门票的高密度经验已经免费上网，而且 YouTube 观看体验甚至更适合学习：音频更稳、没人挡屏幕、可暂停记笔记。她还补了一句很符合当前状态的话：不要被 title/role 限制，今天每个人都同时是 engineer、PM 和 designer。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2074304295097561490)、[Zara Zhang on X](https://x.com/zarazhangrui/status/2074305070955639077)

Peter Yang 则趁 Fable 5 离开 Claude subscriptions 前，整理了五个值得尝试的 use cases：寻找真正值得用 Fable 5 的工作、读计划文档并给生活/商业建议、让项目达到 ship-ready、规划一个大项目并把风险拆清楚、重构 AI skill system。Dan Shipper 也把问题抽象成一个更好的用法选择：该让 Fable 做一次 big expensive swing，还是让它 small ball 一步步把事情磨上去。来源：[Peter Yang on X](https://x.com/petergyang/status/2074206798631071796)、[Dan Shipper on X](https://x.com/danshipper/status/2074160886164451735)

Peter Steinberger 抛出的「现在如何做 AI-assisted engineering interviews」也很现实。AI 已经进入写代码、读代码、调试、ship 的全链条，招聘不可能还假装候选人处在无 AI 的真空里；但如果允许 AI，评价标准就必须从「能否现场手写答案」转向「能否用 AI 建立判断、验证、边界和质量」。来源：[Peter Steinberger on X](https://x.com/steipete/status/2074380549318443311)

## 简短结语

今天最值得带走的一句话是：agent 正在长出工作制度。

artifact 让过程可共享，eval 让行为可校验，self-improving loop 让产品可进化，model routing 让成本可持续；而「会停下」则让 AI 不至于变成另一个只优化停留时长的系统。下一阶段的赢家不只是模型更强的人，而是更早把这些制度做进产品的人。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
