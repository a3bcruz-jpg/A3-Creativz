import { getGitHubMetrics } from "@/lib/github";
import { stages } from "@/lib/project";

export const dynamic = "force-dynamic";

export default async function Home() {
  const metrics = await getGitHubMetrics().catch(() => null);
  const activity = metrics ? Math.min(10, Math.floor(metrics.commits / 5)) : 0;
  const progress = activity;

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="logo"><span>A3</span><div><strong>Creativz</strong><small>Development Intelligence</small></div></div>
        <nav><a className="active" href="#overview">Overview</a><a href="#workflow">Workflow</a><a href="#features">Features</a><a href="#activity">GitHub Activity</a><a href="#deployment">Deployment</a></nav>
        <div className="sidebar-foot"><span className="pulse" /> Live repository sync<br /><small>a3bcruz-jpg/A3-Creativz</small></div>
      </aside>

      <section className="content" id="overview">
        <header className="topbar"><div><p className="kicker">PROJECT CONTROL CENTER</p><h1>A3 Creativz</h1><p className="muted">From idea to production, tracked by evidence.</p></div><a className="github-btn" href="https://github.com/a3bcruz-jpg/A3-Creativz" target="_blank" rel="noreferrer">View on GitHub ↗</a></header>

        <section className="hero card">
          <div><p className="eyebrow">Current status</p><h2>Foundation in progress</h2><p className="muted wide">The dashboard foundation, workflow model, and GitHub intelligence layer are being built first.</p></div>
          <div className="progress-wrap"><div className="progress-number">{progress}<span>%</span></div><div className="progress-track"><div className="progress-fill" style={{width: `${progress}%`}} /></div><small>Verified repository activity signal</small></div>
        </section>

        <section className="metrics" id="activity">
          <Metric label="Commits" value={metrics?.commits ?? "—"} />
          <Metric label="Pull requests" value={metrics?.pullRequests ?? "—"} />
          <Metric label="Open issues" value={metrics?.openIssues ?? "—"} />
          <Metric label="CI runs" value={metrics?.workflowRuns ?? "—"} />
        </section>

        <section className="section" id="workflow"><div className="section-head"><div><p className="kicker">DELIVERY LIFECYCLE</p><h2>Development workflow</h2></div><span className="live-badge">● LIVE</span></div><div className="workflow">{stages.map((stage, i) => <div className={`stage ${i === 0 ? "current" : ""}`} key={stage.id}><div className="stage-dot">{i + 1}</div><div><strong>{stage.label}</strong><small>{i === 0 ? "Active" : "Not started"}</small></div></div>)}</div></section>

        <section className="columns" id="features">
          <div className="card panel"><div className="section-head"><div><p className="kicker">SCOPE</p><h2>Product roadmap</h2></div></div><div className="roadmap"><Row title="Project foundation" status="In progress" /><Row title="Live GitHub metrics" status="In progress" /><Row title="Workflow & milestones" status="Next" /><Row title="Feature tracking" status="Next" /><Row title="Deployment intelligence" status="Planned" /></div></div>
          <div className="card panel" id="deployment"><p className="kicker">REPOSITORY HEALTH</p><h2>GitHub connection</h2><div className="health"><div><span className="health-dot" /> Connected</div><strong>{metrics ? "Operational" : "Unavailable"}</strong></div><div className="details"><span>Repository</span><b>A3-Creativz</b><span>Branch</span><b>main</b><span>Last push</span><b>{metrics?.lastPush ? new Date(metrics.lastPush).toLocaleString() : "—"}</b></div></div>
        </section>

        <footer> A3 Creativz · Development Intelligence · Evidence-driven progress tracking</footer>
      </section>
    </main>
  );
}

function Metric({label, value}: {label: string; value: number | string}) { return <div className="card metric"><span>{label}</span><strong>{value}</strong><small>from GitHub</small></div>; }
function Row({title, status}: {title: string; status: string}) { return <div className="roadmap-row"><span>{title}</span><b>{status}</b></div>; }
