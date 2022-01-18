---
layout: mainpost
projectname: Renaissance Suite
title:  "Renaissance 0.14 Released"
author: Lubomír Bulej
---

We are pleased to announce a new release of the Renaissance benchmark suite.
This release contains a mix of benchmark dependency updates and some internal
changes. The most visible change is an update of Apache Spark to version 3.2.0,
which enabled migrating the `apache-spark` benchmarks from Scala 2.12 to Scala
2.13. In addition, Scala 2.13 benchmarks were updated to use Scala 2.13.8. The
internal changes make it easier to run individual benchmarks in what we call
_standalone mode_, which is desired in some use cases.

The source code of the benchmarks remains unchanged, but updates to some of
their dependencies may affect the code executed at runtime. Some of the
dependencies used by multiple benchmarks were updated and their versions
unified. This allows to only bundle a single version of certain components and
prevents component version clashes in standalone mode. For some dependencies,
such as the JNA framework, this also improves compatibility on less common
combinations of CPU architectures and JVM implementations.

See below for more details. 

We welcome any comments and contributions.

Happy benchmarking!


### Workload changes

Any workload changes are solely due to updates to benchmark runtime or primary
and secondary (transitive) dependencies. Details can be found in the respective
pull requests ([#342](https://github.com/renaissance-benchmarks/renaissance/pull/342)
and [#344](https://github.com/renaissance-benchmarks/renaissance/pull/344)), here
we only provide a brief summary:

- *`akka-uct`* benchmark
    - Updated `akka-actor` dependency (2.6.12 -> 2.6.18)
- *`apache-spark`* benchmarks
    - Updated Apache Spark components (3.1.2 -> 3.2.0)
    - Updated Netty components to common version (4.1.50.Final, 4.1.68.Final -> 4.1.72.Final)
    - Updated/commonized many secondary dependencies
    - Migrated to Scala 2.13
- *`db-shootout`* benchmark
    - Updated JNA framework to common version (4.2.1 -> 5.10.0)
    - Updated/commonized a few secondary dependencies
- *`dotty`* benchmark
    - Updated `scala3-compiler_3` dependency (3.0.0 -> 3.0.2)
    - Updated JNA framework to common version (5.3.1 -> 5.10.0)
- *`future-genetic`* benchmark
    - Updated `jenetics` dependency (4.4.0 -> 5.2.0)
- *`neo4j-analytics`* benchmark
    - Updated `neo4j` dependency (4.2.4 -> 4.4.2)
    - Updated JNA framework to common version (5.6.0 -> 5.10.0)
    - Updated Netty components to common version (4.1.55.Final -> 4.1.72.Final)
- *`rx-scrabble`* benchmark
    - Updated `rxjava` dependency (1.3.7 -> 1.3.8)
- *`twitter-finagle`* benchmarks
    - Updated Finagle components (21.10.0 -> 21.12.0)
    - Updated Netty components to common version (4.1.66.Final -> 4.1.72.Final)
    - Updated/commonized several secondary dependencies


### Standalone mode

Standalone mode means executing a benchmark without the help of the launcher
in the main Renaissance bundle. The benchmark harness is still used, but both
the harness and benchmark code are loaded using a single class loader. This
is useful in situations where using multiple class loaders makes the runtime
too convoluted, e.g., when benchmarking AOT-compiled code.

Because the launcher is not used, the bundle needs to be manually extracted. 
In addition to directories containing the benchmark and dependency jars, there
is also a directory called `single`, which contains metadata-only jars, one for
each benchmark. These jars can be used to execute the corresponding benchmark
in standalone mode simply by running `java -jar <jar-file-path>`. The correct
version of the Renaissance harness (matching the Scala version used by the
benchmark) will be used.
