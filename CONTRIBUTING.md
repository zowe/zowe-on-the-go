# Contribution Guidelines

This document is a living summary of conventions and best practices for development within Zowe API Mediation Layer.

  - [Contact Us](#contact-us)
  - [Understanding Project Structure](#understanding-project-structure)
  - [Pull Requests](#pull-requests)
  - [General Guidelines](#general-guidelines)
  - [Code Guidelines](#code-guidelines)
  - [File Naming Guidelines](#file-naming-guidelines)
  - [Branch Naming Guidelines](#branch-naming-guidelines)
  - [Commit Message Structure Guideline](#commit-message-structure-guideline)
  - [Testing Guidelines](#testing-guidelines)
  - [Build Process Guidelines](#build-process-guidelines)
  - [Documentation Guidelines](#documentation-guidelines)

## Contact Us

Get in touch using [Zowe Communication Channels](https://github.com/zowe/community/blob/master/README.md#communication-channels). You can find us in the `#zowe-mobile` channel on Slack.

## Understanding Project Structure

| Folder | Purpose |
|-|-|
| [.github](file:/.github/) | Automation workflows |

## General Guidelines

The following list describes general conventions for contributing to api-layer:

- Communicate frequently (before pull request) with team member representatives for new design features.
- Before implementing new functionality, reach out to squad members and discuss architecture and design.
- Get in contact using Slack’s `#zowe-api` channel, attend squad meetings or create an `Enhancement` issue on GitHub.
- Reuse logging and error handling patterns already in place.
- Document your code with appropriate Javadoc and inline comments. In JavaScript parts of the code please use JSDoc style comments.
- Create end-user documentation on [docs-site](https://github.com/zowe/docs-site) if needed.
- Provide adequate logging to diagnose problems that happen at external customer sites.
- Use sensible class, method, and variable names.
- Keep core services independent without cross dependencies.
- Keep classes small, maintain Single Responsibility Principle.
- Pull requests should include tests.
- Code coverage for new code should be at least 80%.
- Code coverage should not be lower than on master.
- SonarCloud quality gate should be passed and no code smells, security hotspots and bugs should be added in pull requests.
- If the pull request adds or changes functionality that requires an update of packaging or configuration, it needs to be tested on a test system installed from the Zowe PAX file.
- Keep pull requests as small as possible. If functionality can be split into multiple pull requests which will not break the master after being merged separately, this will speed up the review process and give a better level of safety rather than merging a single pull request containing many lines of code.

## Branch Naming Guidelines

There are two ways to name new branches to simplify orientation. One is used for work on Github issues and one is used for small contributions that don't deserve an issue.

GitHub Issues: `<team-tag>/<work-tag>/<name-tag>` an example would be: `rip/GH752/per_service_timeout_options`

Small personal contributions: `private/<person-tag>/<name-tag>` an example would be: `private/jb892003/temporarily_disable_e2e_tests`

- team-tag

The team contributing on the Broadcom side for example is names Rest In aPi and so the `rip` is used. If there isn't a team involved, use your personal Github handle e.g. `balhar-jakub` or `jandadav`

- work-tag

Represents a codified and searchable reference to problem that the branch solves. For Github issues, you would use `GH` prefix and `Github issue number`.

- person-tag

Represents a unique identifier for specific person. The good candidate is the Github handle such as `balhar-jakub` or `jandadav`.

- name-tag

Please keep the name short and relevant.

## File Naming Guidelines

The following list describes the conventions for naming the source files:

- Follow Java file, class and package naming conventions.
- Master package should be `org.zowe.apiml`.
- Subpackage names are single lowercase words, named by feature. For example `security`,`message`,`config`.
- Keep the hierarchy shallow.

## Code Guidelines

Indent code with 4 spaces. This is also documented via `.editorconfig`, which can be used to automatically format the code if you use an [EditorConfig](https://editorconfig.org/) extension for your editor of choice.

Lint rules are enforced through our [build process](#build-process-guidelines).

## Testing Guidelines

- Core team uses TDD practices.
- All code in PRs should be covered with unit tests.
- Add integration tests where needed. The integration tests are executed with [Github Actions](https://github.com/zowe/api-layer/actions) using the workflows defined in [.github/workflows](.github/workflows). Contact the API Layer squad if you need triage. The Mock zOSMF service is used for verifying integration with zOSMF.
- Add UI end to end tests where needed. The end to end tests are executed with [Github Actions](https://github.com/zowe/api-layer/actions) using the workflows defined in [.github/workflows](.github/workflows). Contact API Layer squad if you need triage.
- Use meaningful test method names. We use the `given_when_then` pattern.
- Leverage `@Nested` annotation for test method grouping where possible. It makes the tests more organized and readable. The test method names are generally shorter.
- When adding tests to method not following `given_when_then` or not leveraging the `@Nested` annotation refactor the class before adding further tests.
- Example of well written test: [CachingControllerTest.java](https://github.com/zowe/api-layer/blob/master/caching-service/src/test/java/org/zowe/apiml/caching/api/CachingControllerTest.java). It uses `@Nested` annotation to separate the test scenarios into groups, which are individually setup. The tests are short and clear and the method names clearly convey what is tested.
- Some of our java unit tests are still written in JUnit4, since we didn’t fully migrate them to JUnit5 and we have a backward compatibility package. However, use JUnit5 for new tests.

## Build Process Guidelines

We use `gradle build` task to build a solution. The build executes the following:
- Checkstyle lint
- License check
- Unit tests

You can run [Integration Tests](integration-tests/README.md) locally before creating a pull request.

## Commit Message Structure Guideline

Commits going to a master branch should stick to the Conventional Commits specification. This is a lightweight convention on the top of the commit messages.
Template:
```
<type>[optional scope]: <description>

[optional body]

[footer(s)]
```
Basic example:
```
feat(authentication): Introducing x509 as a form of authentication

This is a body, which is purely optional. One can use this section if description is not enough to provide insight.
Can also contains notes and hints. Should not be too long.

Signed-off-by: John Doe <john.doe@zowe.org>
```

### Type
 - fix: patches a bug in your codebase (this correlates with PATCH in semantic versioning)
 - feat: introduces a new feature to the codebase (this correlates with MINOR in semantic versioning)
 - docs: affecting the documentation
 - refactor: refactoring the code
 - chore: cleaning in general, update dependencies

Type or scope appended with `!` has the same meaning as BREAKING CHANGE(explained in footer section). It introduces a breaking API change (correlating with MAJOR in semantic versioning). MUST be used with caution!

### Scope
Optional part of the message. Identifies a part of the codebase altered byt this commit. Examples could be: authentication, Discovery service, ...

### Description
A description MUST immediately follow the colon and space after the type/scope prefix. The description is a short summary of the code changes, e.g., `fix: array parsing issue when multiple spaces were contained in string`.

### Body
A commit body is free-form and MAY consist of any number of newline separated paragraphs.

### Footer
 - Signed-off-by: every commit needs to be signed by at least one author
 - Reviewed-by: (OPTIONAL) is a plus, but not necessary
 - Co-authored-by: (OPTIONAL) in case of more contributors engaged
 - BREAKING CHANGE: (OPTIONAL) introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type. MUST be used with caution!

## Pull Requests

Consider the following when you create or respond to pull requests:

- Every pull request must have associated issue in [api-layer repository](https://github.com/zowe/api-layer/issues/) and link to it
- Pull request reviewers should be assigned to a squad team member.
- Use a draft pull request for work in progress that you want to build on the CICD pipeline.
- Anyone can comment on a pull request to request a delay on merging or to get questions answered.
- If you split functionality into several pull requests, consider using a common naming prefix for logical grouping (Github issue number for example).
- Review guidelines for [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
  and [good commits](https://chris.beams.io/posts/git-commit/).

## Security fixes

To provide long-term support(LTS) for versions in maintenance mode, any security fix must be merged to the master branch as a separate commit. The reasoning behind these requirements is, that security fixes will be cherry-picked to the maintenance versions of API Mediation layer.

## Documentation Guidelines

Open a pull request in the [docs-site repository](https://github.com/zowe/docs-site) to create documentation for your contribution.

- Create end-user documentation for how to use your feature, functionality. This end-user documentation can be drafted collaboratively with a tech writer.
- Open an issue in [docs-site repository](https://github.com/zowe/docs-site) if you need assistance.
- End-user documentation requires review and approval by a tech writer. Address all comments raised by the tech writer during review.
- Include a readme.md file within the repository that contains information for developers that, at a minimum, includes an overview, how to build, and how to run tests, if applicable. For example, see [the passticket test programs](https://github.com/zowe/api-layer/blob/master/passticket/test-programs/README.md).

In addition to external documentation, please thoroughly comment your code for future developers who want to understand, use, and enhance your feature.

 ### Javadoc

Methods and classes should have concise javadoc describing usage and purpose.

## Planning guidelines

The new issues raised in the GitHub are triaged and sized weekly in the Wednesday Squad meetings. There is an [Open Mainframe Project
Zowe calendar](https://lists.openmainframeproject.org/calendar) with the squad meetings.

In order to get a better understanding for the complexity of different issues and to improve the quality and reliability of
our planning we size issues that the squad takes responsibility for. The sizing is relative considering the complexity of a particular issue compared to the others.

For sizing we use the Fibonacci sequence: 1,2,3,5,8,13 The higher the number the more complex the work involved or more uncertainty
around how to implement the solution.

### Examples of given size

-   0.5 The smallest meaningful issue that delivers value on its own. An example: [Explore CodeQL for for Github Actions](https://github.com/zowe/api-layer/issues/1263)
-   1 Usually no collaboration within the squad is necessary and the fix can be delivered mainly by one team member. An example: [Streamline Single Sign On Documentation](https://github.com/zowe/api-layer/issues/677)
-   2 Ideal size of a story. It allows meaningful collaboration (i.e. to split the issue into separate tasks among multiple members). The issue is delivered within a Sprint. An example: [Add logout functionality to the ZAAS client](https://github.com/zowe/api-layer/issues/808)
-   3 Good size of a story. It is possible to collaborate among multiple members. The fix to the issue is usually delivered within a Sprint. An example: [Alpha of client certificate using SAF API](https://github.com/zowe/api-layer/issues/758)
-   5 Problems start at this size. If possible split the issue into multiple smaller ones and focus namely on the value delivered (i.e. do the smaller issues still bring value if delivered separately?). Unless it is possible to collaborate on the issue among more members of the squad, it is possible that the issue won't fit into one sprint. An example: [Support the x509 client certificate authentication via x509](https://github.com/zowe/api-layer/issues/827)
-   8 Large issue. Unless there is a good way to split the issue or collaborate, the risk of not being able to deliver the issue within a sprint is quite large. Split to smaller issues if possible. An example: [Implement Caching Service](https://github.com/zowe/api-layer/issues/863)
-   13 WARNING: Here be lions! We haven't used this size so far. If it occurs split the issue into smaller issues.


