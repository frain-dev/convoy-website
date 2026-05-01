# Generated reference artifacts (Convoy mirror)

**Mirrored outputs** from the Convoy server repo so the docs site and automation use the same JSON the server generates.

| Path | Meaning |
|------|---------|
| `convoy/` | Copy of the server’s `docs/generated/` after `make docs-generated` (e.g. `config-reference.json`, `cli-reference.json`, upstream README). |

## How it is updated

- **Mode B (implemented):** [.github/workflows/convoy-docs-sync-receive.yml](../../.github/workflows/convoy-docs-sync-receive.yml) runs on `repository_dispatch` **`convoy_docs_sync`** or manual **`workflow_dispatch`**. It checks out this repo on `main`, checks out `{owner}/convoy` (same GitHub `owner` as convoy-website) at `main` or the ref from the payload / workflow input, runs `make docs-generated`, copies into `docs/generated/convoy/`, then opens or updates PR branch **`chore/sync-convoy-generated-docs`** against **`main`**. Only `docs/generated/**` is committed.

- **Manual:** Run `make docs-generated` in a local Convoy clone, copy `convoy/docs/generated/*` into `docs/generated/convoy/`, open a PR.

**Related:** Mode A: [.github/workflows/docs-drift.yml](../../.github/workflows/docs-drift.yml) runs drift and forbidden-pattern checks on PRs touching `docs/**` (and related paths); it does not refresh this directory.

Triggers and secrets: **Automation modes** in [.github/DOCUMENTATION_SYNC.md](../../.github/DOCUMENTATION_SYNC.md).
