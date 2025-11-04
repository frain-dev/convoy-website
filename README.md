# convoy-website

# Changelog Content

This guide helps with adding changelog entries as markdown files. Each file represents one changelog entry.

## File Naming Convention

Files should be named: `YYYY-MM-DD-slug.md`

Example: `2025-08-22-message-broker-functions.md`

## Frontmatter Format

Each markdown file should include frontmatter with the following fields:

```yaml
---
date: YYYY-MM-DD
title: Your Entry Title
authors:
  - name: Author Name
    image: /path/to/image.jpg
  - name: Another Author
    image: /path/to/image.jpg
---
```

## Content

After the frontmatter, write your changelog content in markdown. You can use:

- **Paragraphs** - Regular text
- **Images** - `![Alt text](/path/to/image.png)`
- **Lists** - Bulleted or numbered
- **Bold/Italic** - Standard markdown formatting
- **Links** - `[Link text](https://example.com)`
- **Code** - Inline `code` or code blocks

## Example

```markdown
---
date: 2025-08-22
title: New Feature Launch
authors:
  - name: John Doe
    image: /employees/john.jpg
---

We're excited to announce our new feature! This update includes:

- Improved performance
- Better user experience
- New integrations

![Feature Screenshot](/docs-assets/feature.png)

Learn more in our [documentation](https://docs.example.com).
```

## Adding New Entries

1. Create a new `.md` file in this directory
2. Add the frontmatter with date, title, and authors
3. Write your content in markdown
4. The entry will automatically appear on the changelog page, grouped by month
