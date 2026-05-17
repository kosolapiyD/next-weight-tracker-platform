# Commit staged changes

Follow these steps exactly:

1. Run `git diff --staged` to see what is staged.
2. Run `git log --oneline -5` to read the last 5 commit messages and match the style of this repo.
3. Draft a commit message:
   - First line: imperative mood, max 72 chars, no period (e.g. "Add SCSS theme system with Bebas Neue fonts")
   - If needed, a blank line then a short body (what changed and why — not how)
4. The commit message should follow the Conventional Commits standard.
5. Show me the drafted message and ask for approval before committing.
6. Once approved, run the commit using a heredoc so formatting is preserved.

Do NOT commit if there is nothing staged. Do NOT add files — only commit what is already staged.
