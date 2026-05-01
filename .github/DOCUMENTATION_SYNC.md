# Documentation sync: PR checklist, labels, drift CI

Public docs here track Convoy server behavior for **`convoy.json`**, env, CLI, and metrics. Use this when reviewing or writing PRs.

## PR template checklist

The [pull request template](pull_request_template.md) asks authors to update the relevant **config / env / CLI / metrics / Grafana** pages or mark the line **N/A** with a short reason (e.g. copy-only change, dashboard screenshot swap, internal nav). N/A is allowed so trivial PRs are not blocked; anything config-adjacent still needs an explicit call.

Suggested entry points:

- **Config & env:** `docs/deployment/configuration.mdx` (and deployment pages that repeat env names).
- **CLI:** `docs/cli-file/convoy.mdx` (and CLI-adjacent guides).
- **Metrics / Grafana:** `docs/product-manual/metrics.mdx`, `docs/resources/telemetry.mdx` where scrape paths and env overlap.

## Labels

Labels are not defined in-repo; they live in org or repo settings on GitHub. For docs-sync work:

- **`documentation`:** docs-only or mostly docs.
- **`config`**, **`metrics`**, **`cli`**, etc.: optional; helps when many PRs land at once.

Authors and reviewers set labels manually.

## Automation modes

Three independent ways docs can stay aligned with the server. Use one or more.

### Mode A: Docs PR drift checks

**What it does:** On PRs that change docs or drift tooling, CI runs static checks in this repo only. It does not clone the Convoy server or regenerate JSON.

**Implemented here:** Yes. [docs-drift.yml](workflows/docs-drift.yml) runs when the diff touches `docs/**`, `.github/workflows/docs-drift.yml`, `.github/scripts/docs-drift-check.sh`, `.github/docs-drift/**`, `.github/pull_request_template.md`, or `.github/DOCUMENTATION_SYNC.md`. It fails if:

- Any **forbidden substring** from [`.github/docs-drift/forbidden-patterns.txt`](docs-drift/forbidden-patterns.txt) appears under `docs/` (wrong config filenames, deprecated env naming, etc.).
- **Consistency checks** fail (e.g. `configuration.mdx` must still link to `config/config.go`, state CLI > env > `convoy.json` precedence exactly once, and key metrics env names must appear in both the configuration reference and `metrics.mdx`).

Prose under `docs/` stays human-authored.

### Mode B: Generated reference sync (receive)

**What it does:** A workflow checks out the Convoy repo, runs `make docs-generated`, copies `docs/generated/*` into **`docs/generated/convoy/`**, then opens or updates one long-lived PR limited to those paths. Maintainers merge it like any other PR.

**Implemented here:** Yes. [convoy-docs-sync-receive.yml](workflows/convoy-docs-sync-receive.yml):

- **Triggers:** `repository_dispatch` with type **`convoy_docs_sync`**; **`workflow_dispatch`** with optional input `convoy_ref` (default `main`).
- **PR branch:** `chore/sync-convoy-generated-docs` (reused; not deleted after merge).
- **PR title:** `chore(docs): sync Convoy generated reference artifacts`
- **Committed paths:** `docs/generated/**` only (see workflow `add-paths`).

**Secrets (convoy-website)**

| Secret | Required? | Purpose |
|--------|-----------|---------|
| `CONVOY_CHECKOUT_TOKEN` | **Optional** | If set, used as `token` for the second `actions/checkout` of `{owner}/convoy`. If unset, the job uses `GITHUB_TOKEN`, which is enough when Convoy is **public** (or readable by that token). Use a PAT when Convoy is **private** or the default token cannot read it. |

No secret is required on convoy-website **to receive** a dispatch; GitHub authenticates the incoming event.

**Secrets / token (Convoy repo, caller)**

To call **`POST /repos/{owner}/{repo}/dispatches`** on **this** repo from Convoy CI or a script, use a PAT or GitHub App token allowed for that endpoint. Typical setup:

- Fine-grained or classic PAT with access to **convoy-website** (at minimum **Contents** / repository dispatch on that repo; classic `repo` on the website repo also works).
- Store it on the **Convoy** repo, e.g. **`CONVOY_WEBSITE_DISPATCH_TOKEN`**.
- Dispatch from Convoy:

```bash
curl -sS -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${CONVOY_WEBSITE_DISPATCH_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/frain-dev/convoy-website/dispatches" \
  -d '{"event_type":"convoy_docs_sync","client_payload":{"convoy_ref":"main"}}'
```

The URL assumes **frain-dev** as owner; change the path for a fork. Optional `client_payload.convoy_ref` overrides the ref (same as the workflow `workflow_dispatch` input).

**Not in this repo:** A Convoy-side job that runs the `curl` (or `peter-evans/repository-dispatch`) after `main` updates. Add that in **convoy** to auto-trigger sync from server merges.

### Mode C: Hands-off pipeline (caller + optional auto-merge)

**Operationally:** (1) Convoy CI (or another process) dispatches on every relevant server change so Mode B runs without **Run workflow**. (2) Optionally, generated-docs PRs auto-merge when checks pass.

**Implemented here:** **Partially.** Only the receive side (Mode B) lives here. Auto-dispatch after server merges belongs in **convoy**. **Auto-merge** for the generated PR is not implemented here unless added on purpose.

Extending drift checks to assert on `docs/generated/convoy/` is optional follow-up.

When you rename or remove an env var or config file on the server, update docs **and** add the old string to `forbidden-patterns.txt` so CI catches regressions.

## Related files

| Item | Path |
|------|------|
| PR template | [`.github/pull_request_template.md`](pull_request_template.md) |
| Mode A workflow | `.github/workflows/docs-drift.yml` |
| Mode B workflow | `.github/workflows/convoy-docs-sync-receive.yml` |
| Mirrored generated artifacts | `docs/generated/convoy/` (see `docs/generated/README.md`) |
| Check script | `.github/scripts/docs-drift-check.sh` |
| Forbidden literals | `.github/docs-drift/forbidden-patterns.txt` |
