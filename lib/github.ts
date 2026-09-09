const repo = "a3bcruz-jpg/A3-Creativz";
const api = "https://api.github.com";

async function github<T>(path: string): Promise<T> {
  const response = await fetch(`${api}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json() as Promise<T>;
}

type Issue = { state: string };
type Run = { conclusion: string | null };

export async function getGitHubMetrics() {
  const [repository, commits, prs, issues, runs] = await Promise.all([
    github<{ stargazers_count: number; forks_count: number; open_issues_count: number; pushed_at: string }>(`/repos/${repo}`),
    github<unknown[]>(`/repos/${repo}/commits?per_page=100`),
    github<unknown[]>(`/repos/${repo}/pulls?state=all&per_page=100`),
    github<Issue[]>(`/repos/${repo}/issues?state=all&per_page=100`),
    github<Run[]>(`/repos/${repo}/actions/runs?per_page=100`),
  ]);

  const actualIssues = issues.filter((issue) => "state" in issue);
  const successfulRuns = runs.filter((run) => run.conclusion === "success").length;

  return {
    repository: repo,
    commits: commits.length,
    pullRequests: prs.length,
    openIssues: actualIssues.filter((issue) => issue.state === "open").length,
    closedIssues: actualIssues.filter((issue) => issue.state === "closed").length,
    workflowRuns: runs.length,
    successfulRuns,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    lastPush: repository.pushed_at,
  };
}
