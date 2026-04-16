# Emerge

**Emerge** (or **emerge-viz**) is an interactive code analysis tool to gather insights about source code structure, metrics, dependencies and complexity of software projects. You can scan the source code of a project, calculate metric results and statistics, generate an interactive web app with graph structures (e.g. a dependency graph or a filesystem graph) and export the results in some file formats. Emerge currently has parsing support for the following languages: `C`, `C++`, `Groovy`, `Java`, `JavaScript`, `TypeScript`, `Kotlin`, `ObjC`, `Ruby`, `Swift`, `Python`, `Go`. The structure, coloring and clustering is calculated and based on the idea of combining a [force-directed graph](https://github.com/d3/d3-force) simulation and [Louvain modularity](https://github.com/taynaud/python-louvain). emerge is mainly written in Python 3 and is tested on macOS, linux and modern web browsers (i.e. latest Safari, Chrome, Firefox, Edge).

![screenshot 3](https://raw.githubusercontent.com/glato/assets/emerge/emerge-1-3-0-screenshot-03.png)

## Goals of this project

*emerge* (/ɪˈməːdʒ/)

> - to appear by coming out of something or out from behind something
> - to become known, especially as a result of examining something or asking questions about it

&nbsp;

The main goal of this project is to create a free/ open source tool, that can easily be used by anyone with interest in software development, architecture, metrics and visualization to gather more insights about those topics. It should facilitate/ support getting a better understanding of a given software project by using an [exploratory approach](https://en.wikipedia.org/wiki/Exploratory_data_analysis).

&nbsp;

## The following features are currently supported by emerge

- File scan support for the following languages: `C`, `C++`, `Groovy`, `Java`, `JavaScript`, `TypeScript`, `Kotlin`, `ObjC`, `Ruby`, `Swift`, `Python`
- Basic entity scan/extraction (e.g. classes) for the following languages: `Groovy`, `Java`, `Kotlin`, `Swift`
- Implementation of the following software metrics: SLOC, Whitespace Complexity (impl. by A. Tornhill), Number of Methods, Fan-In/Fan-Out, Modularity (Louvain)
- Experimental implementation of additional `git-based` metrics (SLOC, Whitespace Complexity, Change Coupling)
- Infer meaning by feature/semantic keyword extraction based on [term frequency-inverse document frequency](https://en.wikipedia.org/wiki/Tf–idf)
- Logging support with configurable log levels
- Configuration support based on YAML syntax to configure multiple/specific analyses
- Create a language/project configuration directly from an included configuration template
- Export of scan results/ metrics/ statistics for the following formats/ outputs
  - File scan
    - Dependency graph
  - Entity scan
    - Dependency graph
    - Inheritance graph
    - Complete graph (composition of dependency and inheritance graph)
    - Includes the extraction of `SwiftUI` and `Composable` declarative UI entities
  - A Filesystem graph that shows the project filesystem hierarchy as a graph
  - [GraphML](http://graphml.graphdrawing.org)
  - JavaScript format suited for a [D3 force graph simulation](https://github.com/d3/d3-force)
  - Interactive HTML/ web application for interactive, exploratory analysis and data visualization of your project based on graph structures
    - HTML app is based on [Bootstrap](https://getbootstrap.com)
    - Force-directed graph simulation by [D3](https://d3js.org)
    - The node colors are based on [Louvain modularity](https://github.com/taynaud/python-louvain) with a bit of post-processing to make the graph coloring more deterministic and stable
    - Fast full-screen UI rendering on HTML canvas
    - Visualization of files, entities and given metrics
    - [Dark mode support](https://github.com/coliff/dark-mode-switch)
    - Visual live search (OR'ed with multiple search terms) of entities
    - The option to include a semantic search based on [term frequency-inverse document frequency](https://en.wikipedia.org/wiki/Tf–idf)
    - The option to include git-based metainformation e.g. contributor names
    - Selection and highlighting of individual nodes
    - [Concave hull](https://github.com/AndriiHeonia/hull) visualization of single clusters
    - [Heatmap](https://github.com/mourner/simpleheat) visualization support of potentially harmful nodes based on a SLOC/Fan-Out score
    - [Heatmap] visualization of of `git-based` metrics e.g. code churn
    - Display of cluster metrics to facilitate comparability
    - Interactivity given by translation, zooming, dragging and hovering over nodes
  - Tabular console output
  - Tabular file output
  - JSON file output

&nbsp;

## How to install and use emerge from source (e.g. for development)

You can clone this repository and install it by following this instruction:

### 1️⃣ ~ Clone this repository

```text
git clone https://github.com/glato/emerge.git
```

### 2️⃣.1️⃣ ~ (*macOS*) Install the `graphviz` package first

```text
brew install graphviz
```

If you encounter the following error on an Apple silicon Mac

```sh
pygraphviz/graphviz_wrap.c:2711:10: fatal error: 'graphviz/cgraph.h' file not found
      #include "graphviz/cgraph.h"
               ^~~~~~~~~~~~~~~~~~~
      1 error generated.
```

you need to run the following command once to update the pygraphviz include directories for the new homebrew environment

```sh
pip install --global-option=build_ext --global-option="-I$(brew --prefix graphviz)/include/" --global-option="-L$(brew --prefix graphviz)/lib/" pygraphviz
```

See the issue in context [here](https://github.com/pygraphviz/pygraphviz/issues/11).

### 2️⃣.2️⃣ ~ (*macOS*) Create a virtual environment

Check of you have the latest Python 3 installed on your macOS. I recommend installing/using Python 3 from [Homebrew](https://brew.sh). Create a Python 3 virtual environment (optionally within the project structure)

```text
cd emerge
pip3 install virtualenv
virtualenv -p python3 venv
```

### 2️⃣ ~ (*ubuntu*) Create a virtual environment

Install required packages and create a Python 3 virtual environment (optionally within the project structure)

```text
apt-get install python3-venv python3-dev graphviz graphviz-dev
cd emerge
python3 -m venv venv
```

### 3️⃣ ~ Before using/working with the tool, activate the virtual environment

```text
source venv/bin/activate
```

### 4️⃣ ~ (*macOS*) Install all dependencies

Install all required dependencies for the project with pip

```text
pip install -r requirements.txt
```

### 4️⃣ ~ (*ubuntu*) Install all dependencies

Install the wheel package, after that install all required dependencies for the project with pip

```text
pip install wheel
pip install -r requirements.txt
```

### 5️⃣ ~ Running unit tests from the command line

Execute the following from the cloned project root:

```text
python -m unittest discover -v -s ./emerge -p "test_*.py"
```

otherwise execute the script `run_tests.py`:

```text
python run_tests.py
```

If you got in any trouble executing the tests, check [this woraround](https://github.com/glato/emerge/issues/14).

### 6️⃣ ~ Running `emerge` as a standalone tool

```text
(emerge) user@host emerge % python emerge.py
usage: emerge.py [-h] [-c YAMLCONFIG] [-v] [-d] [-e] [-a LANGUAGE]

🔎 Welcome to emerge x.y.z (yyyy-mm-dd hh:mm:ss)

options:
  -h, --help            show this help message and exit
  -c YAMLCONFIG, --config YAMLCONFIG
                        set yaml config file
  -v, --verbose         set logging level to INFO
  -d, --debug           set logging level to DEBUG
  -e, --error           set logging level to ERROR
  -a LANGUAGE, --add-config LANGUAGE
                        add a new config from a template, where LANGUAGE is one of [JAVA, SWIFT, C, CPP, GROOVY, JAVASCRIPT,
                        TYPESCRIPT, KOTLIN, OBJC, RUBY, PY, GO]
```

...   analysis I ✅ total runtime of analysis: 00:00:00 + 786 ms
```

&nbsp;

## Further configuration (using emerge on other projects)

If you wand to use emerge on other projects, you can simple copy or customize one of the existing configuration templates from the `emerge/configs` directory.

### 9️⃣ ~ Scan a real project

For a quick run, it should be enough to adjust `source_directory`, `directory` in `export`.

```yaml
---
project_name: c-example-project
loglevel: info
analyses:
- analysis_name: check_c_files
  source_directory: /Users/user1/emerge/project/source/github/linux-5.8.5/crypto
  only_permit_languages:
  - c
  only_permit_file_extensions:
  - .c
  - .h
  ignore_dependencies_containing:
  - string.h
  ignore_dependencies_matching:
  - ^test_(.*)\.h$
  file_scan:
  - number_of_methods
  - source_lines_of_code
  - dependency_graph
  - louvain_modularity
  - fan_in_out
  - tfidf
  export:
  - directory: /Users/user1/emerge/project/export
  - graphml
  - json
  - tabular_file
  - tabular_console_overall
  - d3
```

### 1️⃣0️⃣ ~ Run emerge with a specific yaml configuration

After customizing a present config (e.g. `config/c-template.yaml`) or creating your own, just run emerge again with this new config

```text
python emerge.py -c configs/c-template.yaml
```

After the scan, your scan output (including your interactive web app) can be found at the directory that you created and set in the config parameter `export` -> `directory`, as seen in the logs above.

A full YAML configuration that contains both file and entity scan has the following format:

```yaml
---
project_name: java_project_example
loglevel: info
analyses:
- analysis_name: check_java_files_and_classes
  source_directory: /Users/user1/emerge/project/source
  only_permit_languages:
  - java
  only_permit_file_extensions:
  - .java
  ignore_dependencies_containing:
  - java.util
  file_scan:
  - number_of_methods
  - source_lines_of_code
  - dependency_graph
  - fan_in_out
  - louvain_modularity
  - tfidf
  entity_scan:
  - dependency_graph
  - source_lines_of_code
  - number_of_methods
  - fan_in_out
  - louvain_modularity
  - tfidf
  export:
  - directory: /Users/user1/emerge/project/export
  - graphml
  - json
  - tabular_file
  - tabular_console_overall
  - d3
```

Sometimes it can make sense to exclude platform-usual dependencies or dependencies which do not contribute much to the understanding of a project. A good starting point for e.g. an **Android project** could the following `ignore_dependencies_containing` section:

```yaml
ignore_dependencies_containing:
  - android
  - java
  - javax
```

or for an **iOS project** the following `ignore_entities_containing` section often makes sense e.g. to not consider SwiftUI previews for the graph output:

```yaml
ignore_entities_containing:
  - _Previews
```

The yaml configuration is basically defined at the following levels:

## project level

| key                | value/ description |
|--------------------|--------------------|
| `project_name`     | a project name for all analyses, scans and exports |
| `loglevel`         | set a loglevel: `error` (silent, only errors), `info` (includes `error`) gives you basic logs about control flow, `debug` (includes `info`) will produce a lot of debug logs |
| `analyses`         | an array of analyses that can be configured individually, thus a project can contain one to many analyses. |
|                    | |

## analysis level

| key                              | value/ description |
|----------------------------------|--------------------|
| `analysis_name`                  | a specific analysis name |
| `source_directory`               | the source directory where the recursive file scan should start |
| `git_directory`               | the git repo directory, if git metrics should be included |
| `git_commit_limit`               | how many commits from the last commit should be mined? default: `150` |
| `git_exclude_merge_commits`      | should merge commits be excluded from mining all metrics? default: `true` |
| `ignore_files_containing`        | exclude file names from the scan that contain the given substrings |
| `ignore_directories_containing`  | exclude directory names from the scan that contain the given substrings |
| `only_permit_languages`          | possible values include: java, kotlin, objc, swift, ruby, groovy, javascript, c - explicitly prevents any other language from scanning besides the one you set here |
| `only_permit_file_extensions`    | explicitly permit the following file extensions you set here, e.g. `.java` |
| `only_permit_files_matching_absolute_path`    | only the following list of absolute file paths is permitted for the file scan, e.g. `[/Users/user1/source/file1.java]`. The files should follow `source_directory`|
| `ignore_dependencies_containing` | ignore every dependency included in this list of substrings, e.g. `java.util` |
| `ignore_dependencies_matching` | ignore every dependency matching any of the regular expressions in this list of substrings, e.g. `^java\.util\.` |
| `ignore_entities_containing` | ignore every entity included in this list of substrings, e.g. `NotRelevantClass` |
| `ignore_entities_matching` | ignore every entity matching any of the regular expressions in this list of substrings, e.g. `^Test` |
| `import_aliases`  | define a list of import aliases, i.e. replace substrings within a full dependency path, e.g. `"@foo": src/foo` will replace any `@foo` alias by `src/foo` |
| `override_resolve_dependencies` | if supported by the language parser, force every dependency in this list to be resolved |
| `override_do_not_resolve_dependencies` | if supported by the language parser, force every dependency in this list NOT to be resolved (i.e. treated as a global dependency) |
| `file_scan`                      | perform a file scan, contains the metrics that should be applied on every source file |
| `entity_scan`                    | perform an entity scan, contains the metrics that should be applied on every entity (e.g. on every class) |
| `export`                         | contains any export formats that should be created as output |
| `appconfig`                      | contains any configurable app config parameters|
|                                  | |

## file_scan metrics

| key                    | value/ description |
|------------------------|--------------------|
| `dependency_graph`     | create a dependency graph structure based on source files, additional metrics will be added to the graph nodes |
| `source_lines_of_code` | apply a source lines of code metric to every file, create an overall metric |
| `number_of_methods`    | apply a number of methods metric to every file, create an overall metric |
| `fan_in_out`           | apply a fan in/ fan out graph metric to every file, create an overall metric |
| `louvain_modularity`   | apply a louvain modularity metric to every file, create an overall metric |
| `tfidf`                | apply a tfidf metric to every file and extract relevant semantic keywords|
| `ws_complexity`        | apply a whitespace complexity metric to every file |
| `git_metrics`          | include some git-based metrics and try to apply them to every file |
|                        | |

## entity_scan metrics

| key                    | value/ description |
|------------------------|--------------------|
| `dependency_graph`     | create a dependency graph structure based on extracted entities from files, additional metrics will be added to the graph nodes |
| `inheritance_graph`    | create an inheritance graph structure based on extracted entities from files, additional metrics will be added to the graph nodes |
| `complete_graph`       | create a complete graph structure (union of dependency/ inheritance graph) based on extracted entities from files, additional metrics will be added to the graph nodes |
| `source_lines_of_code` | apply a source lines of code metric to every entity, create an overall metric |
| `number_of_methods`    | apply a number of methods metric to every entity, create an overall metric |
| `fan_in_out`           | apply a fan in/ fan out graph metric to every entity, create an overall metric |
| `louvain_modularity`   | apply a louvain modularity metric to every entity, create an overall metric |
| `tfidf`                | apply a tfidf metric to every entity and extract relevant semantic keywords|
|                        | |

## export configuration

| key                       | value/ description |
|---------------------------|--------------------|
| `directory`               | the output directory for all specified export formats |
| `graphml`                 | create a graphML file that contains the graph structure and metric results mapped to the nodes of the graph |
| `tabular_file`            | create a tabular formatted text file that contains every metric and statistic result |
| `tabular_console`         | print a tabular formatted output to console that contains every metric and statistic result |
| `tabular_console_overall` | print a tabular formatted output to console that contains only overall metric and statistic results |
| `json`                    | create a JSON file that contains every metric and statistic result |
| `d3`                      | create a Bootstrap/D3 web application in the subfolder `force-graph-html` for further visual and interactive/ exploratory analysis |
|                           | |

## appconfig

| key                         | value/ description |
|-----------------------------|--------------------|
| `radius_fan_out`            | node radius multiplication factor for the fan-out metric, default: `0.1`  |
| `radius_fan_in`             | node radius multiplication factor for the fan-in metric, default: `0.1`   |
| `radius_louvain`            | node radius multiplication factor for the louvain metric, default: `0.02` |
| `radius_sloc`               | node radius multiplication factor for the sloc metric, default: `0.005` |
| `radius_number_of_methods`  | node radius multiplication factor for the number of methods metric, default: `0.05` |
| `heatmap_sloc_active`       | should the sloc metric be included in the heatmap score calculation? default: `true` |
| `heatmap_fan_out_active`    | should the fan-out metric be included in the heatmap score calculation? default: `true` |
| `heatmap_sloc_weight`       | weight factor of the sloc metric within the heatmap score calculation, default: `1.5` |
| `heatmap_fan_out_weight`    | weight factor of the fan-out metric within the heatmap score calculation, default: `1.7` |
| `heatmap_score_base`        | min score threshold for the heatmap color mapping, default: `10` |
| `heatmap_score_limit`       | max score threshold for the heatmap color mapping, default: `300` |
|                             | |

## Supported scan types and file extensions

Emerge supports the following file extensions and scan types per language, whereas a `file_scan` simply calculates metrics and maps nodes within graph structures to scanned files and an `entity_scan` tries to extract more fine-grained entities from files e.g. classes or structs.

| File extension            | Language parser | Files | Entities
|---------------------------|-----------------|-------|---------
| `.java`                   | Java            | ✅ | ✅
| `.swift`                  | Swift           | ✅ | ✅
| `.c` / `.h` / `.hpp`      | C               | ✅ | ❌
| `.cpp` / `.h` / `.hpp`    | C++             | ✅ | ❌
| `.groovy`                 | Groovy          | ✅ | ✅
| `.js` / `.jsx`            | JavaScript      | ✅ | ❌
| `.ts` / `.tsx`            | TypeScript      | ✅ | ❌
| `.k`                      | Kotlin          | ✅ | ✅
| `.m` / `.h`               | Objective-C     | ✅ | ❌
| `.rb`                     | Ruby            | ✅ | ❌
| `.py`                     | Python          | ✅ | ❌
| `.go`                     | Go              | ✅ | ❌

## Interpretation of graphs

The interpretation of such graphs can often be very subjective and project dependent. The following examples should help to recognize certain patterns through indicators and hints.

### ⭐️ Modularity

The magic of uncovering modularity lies in applying a community detection algorithm e.g. Louvain optimization to a force-directed graph, so that both distances and coloring influence the result. The following example includes several indicators for a modular codebase.

1. In the first example on the left you can spot multiple coherent colored clusters which show a low coupling by a certain distance (= generated by the force-directed graph).

2. In the second example on the right the same graph is rendered with activated cluster hulls. On this example the hulls show minimal to no overlapping. Such hints can be indicators for a good software architecture e.g. in terms of *modularity*, *abstraction* and well defined *interfaces*.

<p align="center">
<img src="https://raw.githubusercontent.com/glato/assets/emerge/modular_codebase_01.png" width="40%"/> &ensp; <img src="https://raw.githubusercontent.com/glato/assets/emerge/modular_codebase_02.png" width="40%"/>
</p>

### ⭐️ Codebases with different characteristics

1. In the following example on the left you can see structures with increased modularity e.g. cluster 1 and 2.
2. At the same time you can see another cluster 3 that shows increased overlappings with other clusters. In addition to that an active SLOC metric even shows some huge entities (e.g. classes) which could indicate code smells like *god classes*. Such code smells like increased coupling and god classes may indicate increased maintenace efforts and error-proneness.

<p align="center">
<img src="https://raw.githubusercontent.com/glato/assets/emerge/large_codebase_01.png" width="40%"/> &ensp; <img src="https://raw.githubusercontent.com/glato/assets/emerge/large_codebase_02.png" width="40%"/>
</p>

### ⭐️ Big Ball of Mud

"A BIG BALL OF MUD is haphazardly structured, sprawling, sloppy, duct-tape and bailing wire, spaghetti code jungle" (B. Foote, J. Yoder, 1997). This kind of graph often represents a less optimal architecture. To verify this kind of *spaghetti code jungle*, one can simply enable hull rendering for all clusters to finally determine: there is only one big cluster after all.

<p align="center">
<img src="https://raw.githubusercontent.com/glato/assets/emerge/ball_of_mud_01.png" width="40%"/> &ensp; <img src="https://raw.githubusercontent.com/glato/assets/emerge/ball_of_mud_02.png" width="40%"/>
</p>

### ⭐️ Abstract irrelevant dependencies

Sometimes it can help to better understand the complexity of a software architecture if irrelevant dependencies are ignored.

1. Besides being shocked to see the Big Ball of Mud with irrelevant dependencies like java.lang, java.util or any third party dependencies that does not directly belong to a project ...
2. ... you can remove irrelevant dependencies configuratively with the key `ignore_dependencies_containing` (or `ignore_dependencies_matching` if you prefer regular expressions). With a comparatively activated fan-out metric, one recognizes more scattering, some distant hub nodes and clearer clusters. All of these are possible clues to the real (= often more understandable) architecture underneath.

<p align="center">
<img src="https://raw.githubusercontent.com/glato/assets/emerge/ball_of_mud_all_dependencies.png" width="43%"/> &ensp; <img src="https://raw.githubusercontent.com/glato/assets/emerge/cleaner_graph_hub_nodes.png" width="36%"/>
</p>

