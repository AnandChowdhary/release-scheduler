import { getInput, setFailed, debug } from "@actions/core";
import { getOctokit } from "@actions/github";

const token = getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || "").split("/");

  const releases = await octokit.repos.listReleases({ owner, repo, per_page: 1 });
  const lastRelease = releases.data[0];
  debug(`Last release was at ${lastRelease.created_at}`);
  if (!lastRelease) throw new Error("No releases found");

  const commits = await octokit.repos.listCommits({
    since: lastRelease.created_at,
    per_page: 100,
    owner,
    repo,
  });
  debug(`${commits.data.length} commits since last release`);
  const dependabotCommits = commits.data.filter((commit) =>
    commit.author.login.includes("dependabot")
  );
  debug(`${dependabotCommits.length} Dependabot commits since last release`);

  if (
    dependabotCommits.length >=
    (getInput("minimumCommits") ? parseInt(getInput("minimumCommits")) : 1)
  ) {
    debug("Triggering new release with commit");
    const contents = await octokit.repos.getContent({ owner, repo, path: "package.json" });
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: getInput("filePath") || "package.json",
      content: contents.data.content,
      sha: contents.data.sha,
      message: getInput("commitMessage") || ":rocket: Release dependency updates",
    });
  } else {
    debug("Skipping new release");
  }
  debug("All done!");
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
