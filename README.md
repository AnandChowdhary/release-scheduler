# 🚂 Release Scheduler

This is a GitHub Action to schedule dependency update releases. You need to use Dependabot to update your dependencies and Semantic Release to create releases, this action only adds a new commit if there have been dependency updates.

[![Build CI](https://github.com/koj-co/release-scheduler/workflows/Build%20CI/badge.svg)](https://github.com/koj-co/release-scheduler/actions?query=workflow%3A%22Build+CI%22)
[![Release CI](https://github.com/koj-co/release-scheduler/workflows/Release%20CI/badge.svg)](https://github.com/koj-co/release-scheduler/actions?query=workflow%3A%22Release+CI%22)
[![Node CI](https://github.com/koj-co/release-scheduler/workflows/Node%20CI/badge.svg)](https://github.com/koj-co/release-scheduler/actions?query=workflow%3A%22Node+CI%22)

## ⭐ Usage

You can choose to release every week or every month using GitHub Actions' scheduler:

- `0 0 1 * *` - on the first of every month
- `0 0 * * 1` - on Monday every week

Then, add your workflow:

```yaml
name: Release Scheduler
on:
  schedule:
    - cron: "0 0 * * 1"
jobs:
  releaseScheduler:
    runs-on: ubuntu-latest
    steps:
      - name: Run release-scheduler
        uses: koj-co/release-scheduler@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📄 License

- Code: [MIT](./LICENSE) © [Koj](https://koj.co)
- "GitHub" is a trademark of GitHub, Inc.

<p align="center">
  <a href="https://koj.co">
    <img width="44" alt="Koj" src="https://kojcdn.com/v1598284251/website-v2/koj-github-footer_m089ze.svg">
  </a>
</p>
<p align="center">
  <sub>An open source project by <a href="https://koj.co">Koj</a>. <br> <a href="https://koj.co">Furnish your home in style, for as low as CHF175/month →</a></sub>
</p>
