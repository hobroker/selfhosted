# selfhosted CLI

A terminal UI for managing self-hosted services deployed with [Helmfile](https://helmfile.readthedocs.io). Browse services, inspect their state, apply/diff/destroy releases, and tail logs — all without leaving the terminal.

Built with [Ink](https://github.com/vadimdemedes/ink) (React for CLIs).

## Requirements

- `helm`
- `helmfile`
- `kubectl`

## Usage

```sh
npm run cli
```

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `q` | Quit |
| `Esc Esc` | Quit (double-press within 1s) |
| `Tab` / `←` `→` | Switch focus between sidebar and details |
| `/` | Open search |
| `Esc` | Close search / close modal |
| `↑` `↓` | Navigate services (wraps around) |
| `A` | Apply (helmfile apply) |
| `D` | Diff (helmfile diff) |
| `H` | History |
| `R` | Refresh |
| `L` | Logs |
| `X` | Destroy |
| `?` | Help |

## Sidebar search

Press `/` to open the search box. Type to filter services by name using fuzzy matching (powered by [fzf](https://github.com/nicolo-ribaudo/fzf-js)). The cursor automatically jumps to the first match as you type. Press `Esc` to close search and return to the full list — the selected item stays where it was.

## Service states

| State | Meaning |
|-------|---------|
| `Installed` | Chart and app versions match local config |
| `Not Installed` | No helm release found in the cluster |
| `Update Available` | Installed chart or app version differs from local config |

Version comparison strips a leading `v` prefix, so `1.0.0` and `v1.0.0` are treated as equal.

## Testing

```sh
npm test
```
