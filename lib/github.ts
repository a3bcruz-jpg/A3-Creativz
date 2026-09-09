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

type Issue = { state: string; title: string; number: number };
type Run = { conclusion: string | null };

const workflowStages = [
  ["planning", "Planning"], ["design", "UI/UX Design"], ["development", "Development"],
  ["testing", "Testing"], ["bug-fixing", "Bug Fixing"], ["optimization", "Optimization"],
  ["deployment", "Deployment"], ["completed", "Completed"],
] as const;

export async function getGitHubMetrics() {
  const [repository, commits, prs, issues, runs] = await Promise.all([
    github<{ stargazers_count: number; forks_count: number; pushed_at: string }>(`/repos/${repo}`),
    github<unknown[]>(`/repos/${repo}/commits?per_page=100`),
    github<unknown[]>(`/repos/${repo}/pulls?state=all&per_page=100`),
    github<Issue[]>(`/repos/${repo}/issues?state=all&per_page=100`),
    github<Run[]>(`/repos/${repo}/actions/runs?per_page=100`),
  ]);

  const stageIssues = workflowStages.map(([id, label]) => {
    const issue = issues.find((item) => item.title.startsWith(`[${label}]`));
    return { id, label, state: issue?.state ?? "missing", issueNumber: issue?.number ?? null };
  });
  const tracked = stageIssues.filter((stage) => stage.state !== "missing");
  const completedStages = tracked.filter((stage) => stage.state === "closed").length;
  const progress = tracked.length ? Math.round((completedStages / tracked.length) * 100) : 0;
  const current = stageIssues.find((stage) => stage.state === "open") ?? stageIssues.find((stage) => stage.state === "missing");
  const successfulRuns = runs.filter((run) => run.conclusion === "success").length;

  return {
    repository: repo,
    commits: commits.length,
    pullRequests: prs.length,
    openIssues: issues.filter((issue) => issue.state === "open").length,
    closedIssues: issues.filter((issue) => issue.state === "closed").length,
    workflowRuns: runs.length,
    successfulRuns,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    lastPush: repository.pushed_at,
    progress,
    currentStage: current?.label ?? "Planning",
    stages: stageIssues,
  };
}
