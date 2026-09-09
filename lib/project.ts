export const stages = [
  { id: "planning", label: "Planning", weight: 10 },
  { id: "design", label: "UI/UX Design", weight: 10 },
  { id: "development", label: "Development", weight: 30 },
  { id: "testing", label: "Testing", weight: 10 },
  { id: "bug-fixing", label: "Bug Fixing", weight: 10 },
  { id: "optimization", label: "Optimization", weight: 10 },
  { id: "deployment", label: "Deployment", weight: 10 },
  { id: "completed", label: "Completed", weight: 10 },
] as const;

export type StageId = (typeof stages)[number]["id"];

export type ProjectMetrics = {
  commits: number;
  pullRequests: number;
  openIssues: number;
  closedIssues: number;
  workflowRuns: number;
  successfulRuns: number;
};

export function calculateProgress(metrics: ProjectMetrics, completedStages: StageId[] = []) {
  const stageScore = stages.reduce((sum, stage) => sum + (completedStages.includes(stage.id) ? stage.weight : 0), 0);
  const activityScore = Math.min(10, Math.floor(metrics.commits / 5));
  return Math.min(100, stageScore + activityScore);
}

export const defaultProject = {
  name: "A3 Creativz",
  repository: "a3bcruz-jpg/A3-Creativz",
  description: "AI-powered development and project progress dashboard for tracking software projects from planning to production.",
};
