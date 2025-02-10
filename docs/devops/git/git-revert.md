---
title: Git 误操作代码还原
collapsed: false
---

# Git 误操作代码还原

> 在开发过程中，可能会遇到误操作的情况，需要将工作区代码进行还原。本文将分析不同场景下的代码恢复方法，并提供相应的解决方案。

## 已提交但被删除的本地代码恢复

如果代码已通过 `commit` 命令提交，但随后被 `reset` 命令删除，可以使用以下步骤恢复：

```bash
# 查看本地的版本记录
git reflog

# 重置到指定的历史版本
git reset HASH_ID
```

## 未提交但被误删除的本地代码恢复

如果代码尚未提交，就已经被 `checkout` 或 `reset` 命令重置，则恢复难度较大。

### 通过 `git fsck --lost-found` 查找丢失对象

在多数情况下，可以使用 `git fsck --lost-found` 命令尝试找回丢失的代码对象。

```bash
git fsck --lost-found
```

此命令将扫描 `.git` 目录中的对象，并列出可能丢失的提交或文件。例如：

```bash
Checking object directories: 100% (256/256), done.
Checking objects: 100% (3/3), done.
dangling commit 33c85298d5ade3a27c5d617ca85442ec44ad3676
dangling blob 379eefa37c4ed05a6fba785d5871043dbefd5a2c
```

可使用 `git show` 命令查看特定对象的内容，例如：

```bash
git show 379eefa37c4ed05a6fba785d5871043dbefd5a2c
```

### 通过 `.git/objects` 目录恢复代码

由于 `git fsck --lost-found` 查找的对象不易直观理解，另一种方法是直接遍历 `.git/objects` 目录，并结合 `git cat-file -p` 命令读取对象内容。

以下 Bash 脚本可帮助查找指定时间范围内的 Git 对象，并将其内容导出到 `git_cat_output.txt` 文件。（可以在 git bash 中执行）

```bash
#!/bin/bash
# 用法示例:
# ./read_git_objects.sh "/e/Project/rms_server_git" "2025-02-10 11:15" "2025-02-10 12:00"
#
# 注意：请确保该脚本在支持 GNU touch 和 find 的环境下运行。

if [ "$#" -ne 3 ]; then
    echo "用法: $0 <仓库目录> <起始时间> <结束时间>"
    echo "例如: $0 \"/e/Project/rms_server_git\" \"2025-02-10 11:15\" \"2025-02-10 12:00\""
    exit 1
fi

REPO_DIR="$1"
START_TIME="$2"
END_TIME="$3"

# 指定 .git/objects 目录
GIT_OBJECTS_DIR="${REPO_DIR}/.git/objects"
# 输出文件名，可根据需要修改
OUTPUT_FILE="git_cat_output.txt"

# 为时间范围创建临时参考文件（需支持 GNU touch）
START_REF="/tmp/start_time_ref.$$"
END_REF="/tmp/end_time_ref.$$"
touch -d "$START_TIME" "$START_REF"
touch -d "$END_TIME" "$END_REF"

# 清空输出文件（如果存在）
> "$OUTPUT_FILE"

# 在 .git/objects 目录下查找修改时间在指定范围内的文件
find "$GIT_OBJECTS_DIR" -type f -newer "$START_REF" ! -newer "$END_REF" | while read file; do
    # file 的格式类似于：/.../.git/objects/7e/70d301e8d6b8d2931011434c05f5cf8e8119da
    # 提取目录名（例如 7e）和文件名（例如 70d301e8d6b8d2931011434c05f5cf8e8119da）
    dir_name=$(basename "$(dirname "$file")")
    file_name=$(basename "$file")
    hash="${dir_name}${file_name}"

    echo "处理对象: $hash" >> "$OUTPUT_FILE"
    # 使用 git cat-file -p 命令输出对象内容
    git -C "$REPO_DIR" cat-file -p "$hash" >> "$OUTPUT_FILE"
    echo -e "\n----------------------\n" >> "$OUTPUT_FILE"
done

# 删除临时参考文件
rm "$START_REF" "$END_REF"

echo "处理完成，结果保存在文件：$OUTPUT_FILE"

```

### 使用 AI 或文本工具辅助恢复

执行上述脚本后，可在 `git_cat_output.txt` 文件中搜索关键字或文件名，以便更快速地找回丢失的代码。

> **注意：** 该脚本未经严格测试，使用前请确保数据已备份，以防止意外覆盖或数据丢失。

## 经验和教训

这次代码丢失的体检浪费了我至少半个钟的时间恢复。

经过这次惨痛的教训，我得出经验：

1. 在本地代码还未提交前，不要相信任何 git 插件上的按钮，作者就是使用 git history 插件将所有本地改动丢弃了。

2. 可以尝试安装一些本地历史记录保存的插件，譬如：vscode 中的 Local History，他独立于 git 版本管理工具，可以在本地目录下创建一个.history 文件夹，存放文件的历史版本记录。
