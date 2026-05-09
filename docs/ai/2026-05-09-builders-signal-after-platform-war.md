---
title: 2026-05-09｜平台战争之后，建造者重新校准手感
date: 2026-05-09
collapsed: false
---

# 2026-05-09｜平台战争之后，建造者重新校准手感

今天的 AI builders 信号不算喧闹，但很集中：一边是大模型公司把能力继续塞进办公软件、浏览器、代码环境和安全体系；另一边，真正的一线建造者开始反复讨论同一个问题——当“生成”变得便宜之后，差异化到底会落在哪里？

我的判断是：AI 的下一段竞争，不再只是“谁能生成更多东西”，而是谁能把生成能力接入真实流程、真实组织和真实信任链条里。

## 1. 软件变容易之后，稀缺性会转移

Box CEO Aaron Levie 提醒了一个很朴素但重要的事实：如果 AI 让某件事更容易，它也会让所有竞争者同样更容易做到这件事。因此，资源会转向新的差异化位置。比如软件开发更容易之后，销售、市场、客户成功和更深层客户关系的重要性反而会上升。

这不是“软件不重要了”，而是软件生产的边际门槛下降后，组织会重新寻找护城河。代码会变快，分发、信任、服务和业务嵌入会变得更贵。

来源：https://x.com/levie/status/2052566788236509254

Sam Altman 也在相近方向上表达了更乐观的版本：与其试图替代软件开发者，不如帮助开发者“宝可梦进化”成超级英雄。他强调，一个非常优秀的人现在能做到的事情已经非常夸张。

来源：https://x.com/sama/status/2052485051812909530

这两个观点放在一起看，像是一枚硬币的两面：AI 会抬高个体产能，但产能普及之后，真正的竞争会从“能不能做”转向“做什么、为谁做、如何持续交付”。

## 2. Agent 正在从演示走向工作流

Garry Tan 连发几条关于 GBrain 和 GStack 的更新：GBrain 增加了 thin-client mode，让 Claude Code 或 Hermes/OpenClaw 这类二级 agent 不必自己跑 MCP server，可以通过 MCP 作为瘦客户端使用；GStack 则强调让 Hermes/OpenClaw 控制带登录态的浏览器，并更新了浏览器下载、headed 配置和反机器人检测能力。

来源：

- https://x.com/garrytan/status/2052629679572701455
- https://x.com/garrytan/status/2052588782076281324
- https://x.com/garrytan/status/2052588548126364028

这里的重点不是某个工具本身，而是 agent 基础设施的形态正在稳定下来：MCP、浏览器控制、登录态、下载、headless/headed 切换、技能文档，这些看似琐碎的能力，正是 agent 从 demo 进入日常工作的接口层。

Peter Steinberger 的几条更新也落在同一条线上：他提到 agent 之间的协作、cron job 委派，以及 `/goal + GPT 5.5` 用于规划大规模 refactor 和端到端测试。也就是说，agent 不只是单次问答，而是在向“可持续执行目标”的方向演进。

来源：

- https://x.com/steipete/status/2052630190346457301
- https://x.com/steipete/status/2052514752245481675

## 3. 大模型正在进入 Office，而不是停在聊天框

Claude 官方宣布，Claude for Excel、PowerPoint、Word 已经 GA，Claude for Outlook 进入 public beta。更关键的是：Claude 在 Microsoft 应用之间移动时，会带着完整的对话上下文。

来源：https://x.com/claudeai/status/2052445786651168849

这件事的意义在于，模型正在从“一个独立聊天入口”变成“横跨办公对象的上下文层”。如果上下文可以在表格、演示、文档、邮件之间流动，AI 的价值就不只是生成一段文字，而是理解一个人的工作状态、任务链条和组织语境。

这也解释了为什么 agent 基础设施重要：未来的 AI 产品竞争，会越来越多发生在上下文搬运、权限边界、工具调用和工作流恢复能力上。

## 4. 安全与治理开始变成产品节奏的一部分

今天最值得细读的长内容来自 Matt Turck 对 OpenAI 董事、CMU 机器学习系主任 Zico Kolter 的访谈。访谈中，Zico 解释了 OpenAI Safety and Security Committee 如何参与模型发布治理，也强调了一点：模型变大并不自动意味着更安全。尤其在鲁棒性、越狱、提示注入等问题上，不能只指望 scale 自然解决。

来源：https://www.youtube.com/watch?v=DvyZcCfepeI

Matt Turck 的推文也概括了这场对谈的主题：AI safety、AI security、agents 和 frontier AI。

来源：https://x.com/mattturck/status/2052440959997063309

Sam Altman 也提到 OpenAI 想帮助公司尽快提升安全能力。

来源：https://x.com/sama/status/2052558319940944256

这说明安全正在从“发布后的补丁”变成模型公司和企业客户共同面对的前置问题。尤其当 agent 可以操作浏览器、读取文件、运行命令、连接企业系统时，安全不再只是模型评测问题，而是产品架构问题。

## 5. Gemini 的内部建设进入换挡期

Google Gemini 产品负责人 Madhu Guru 宣布离开 Google。他回顾自己参与从 Search & Ads 到 Gemini 的经历，提到三年前 OpenAI 和 Anthropic 领先，而 Google 建立了模型建设 playbook、客户反馈飞轮和企业业务；Gemini 3 是这些系统汇合的时刻。

来源：https://x.com/realmadhuguru/status/2052490869320946037

这条动态不像产品发布那么醒目，但它透露了大公司 AI 竞争的另一面：前沿模型不是单点突破，而是模型能力、反馈系统、企业销售和组织动员的组合。Gemini 从 underdog 追到 frontier，本质上是工程系统和商业系统同时成型。

## 6. AI 平台战正在浮出水面

Dan Shipper 提到“AI platform war is coming”，并把话题连接到 xAI compute deal、managed agents，以及 Anthropic 正在把 API 变成面向开发者的完整云基础设施。

来源：https://x.com/danshipper/status/2052501376195080381

这很可能是今天所有信号中最适合作为标题的判断：AI 公司不再满足于提供模型 API，而是在向平台、云、agent runtime、上下文层和开发者基础设施扩张。

当模型 API 只是入口，真正的竞争会发生在：谁掌握 agent 的运行环境、谁拥有开发者工作流、谁能管理长期上下文、谁能提供安全可控的执行层。

## 结语：新的品味在执行层

今天这些 builders 的更新共同指向一个变化：AI 的前台越来越像“能力过剩”，后台却越来越考验品味。

能生成内容、代码、表格和幻灯片，已经不再稀奇。稀奇的是：能不能把这些能力放进一个可靠的工作流里；能不能在权限、上下文、安全和交付之间拿捏分寸；能不能让一个人或一个小团队真的变强，而不是只是多一个玩具。

下一阶段的 AI 产品，品味不只体现在界面上，也体现在执行层。谁能把复杂性藏好，谁就更接近真实生产力。
