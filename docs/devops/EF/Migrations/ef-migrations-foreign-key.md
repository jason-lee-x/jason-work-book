---
title: 禁用 EF Core Migrations 生成外键关联
collapsed: false
---

# 禁用 EF Core Migrations 生成外键关联

在 Entity Framework Core (EF Core) 的 Code First 模式中，EF Core Migrations 是一个强大的数据库迁移管理工具。但有时，出于公司规范、性能考量或其他特定原因，我们可能需要禁止在数据库中创建外键关联。本文将介绍如何通过自定义 EF Core Migrations 的行为来实现这一点。

## 背景

默认情况下，EF Core 会根据模型中的导航属性自动生成外键约束。这在大多数情况下是符合预期的，但有时会与既有数据库规范冲突，或者引入不必要的性能开销。

## 解决方案

为了阻止 EF Core Migrations 生成外键，我们需要自定义 SQL 生成器和模型差异比较器，使其忽略外键相关的操作。

### 1. 自定义 SQL 生成器

创建一个继承自 `SqlServerMigrationsSqlGenerator` 的自定义 SQL 生成器，并重写 `Generate` 方法，忽略 `AddForeignKeyOperation` 和 `DropForeignKeyOperation` 操作。

```csharp
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.EntityFrameworkCore.SqlServer.Update.Internal;

namespace YourProject.Data.Extensions
{
    public class DisableForeignKeyMigrationsSqlGenerator : SqlServerMigrationsSqlGenerator
    {
        public DisableForeignKeyMigrationsSqlGenerator(MigrationsSqlGeneratorDependencies dependencies, SqlServerCommandBatchPreparer commandBatchPreparer) : base(dependencies, commandBatchPreparer)
        {
        }

        protected override void Generate(AddForeignKeyOperation operation, IModel model, MigrationCommandListBuilder builder, bool terminate = true)
        {
            // 不生成 AddForeignKey 操作
        }

        protected override void Generate(DropForeignKeyOperation operation, IModel model, MigrationCommandListBuilder builder, bool terminate = true)
        {
            // 不生成 DropForeignKey 操作
        }
    }
}
```

### 2. 自定义模型差异比较器

创建一个继承自 `MigrationsModelDiffer` 的自定义模型差异比较器，并重写 `GetDifferences` 方法，过滤掉外键相关的操作。

```csharp
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.SqlServer.Migrations.Internal;
using Microsoft.EntityFrameworkCore.Storage;

namespace YourProject.Data.Extensions
{
    public class DisableForeignKeyMigrationsModelDiffer : SqlServerMigrationsModelDiffer
    {
         public DisableForeignKeyMigrationsModelDiffer(IRelationalTypeMappingSource typeMappingSource, IMigrationsAnnotationProvider migrationsAnnotationProvider, IMigrationsModelDiffer migrationsModelDiffer) : base(typeMappingSource, migrationsAnnotationProvider, migrationsModelDiffer)
        {

        }


        public override IReadOnlyList<MigrationOperation> GetDifferences(IModel source, IModel target)
        {
            var operations = base.GetDifferences(source, target)
                .Where(op => !(op is AddForeignKeyOperation || op is DropForeignKeyOperation))
                .ToList();

            //  移除 CreateTableOperation 中的外键
            foreach (var operation in operations.OfType<CreateTableOperation>())
            {
                operation.ForeignKeys?.Clear();
            }

            return operations;
        }
    }
}
```

### 3. 配置 DbContext

在 `DbContext` 的 `OnConfiguring` 方法中，替换默认的 SQL 生成器和模型差异比较器。

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer(connectionString, x =>
    {
        // ... 其他配置 ...
    })
    .ReplaceService<IMigrationsSqlGenerator, DisableForeignKeyMigrationsSqlGenerator>()
    .ReplaceService<IMigrationsModelDiffer, DisableForeignKeyMigrationsModelDiffer>();
}
```

## 总结

通过以上步骤，我们可以在 EF Core Migrations 中禁用外键的生成和删除。此方法适用于 SQL Server，并可通过类似的方式适配其他数据库提供商。

## 补充说明

- **生产环境的考虑**: 禁用外键可能会影响数据完整性，请在生产环境中谨慎使用，并确保有其他机制保证数据一致性。
- **其他数据库**: 对于其他数据库，需要继承相应的 `MigrationsSqlGenerator` 和 `MigrationsModelDiffer` 类，并进行类似的修改。
- **版本兼容性**: 确保使用的 EF Core 版本与代码兼容。

通过这种方式，我们可以在特定场景下灵活控制 EF Core Migrations 的行为，更好地适应项目需求。
