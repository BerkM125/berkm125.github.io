# Photos

LinkedIn requires a login to serve post media, so the images from your two posts
could not be downloaded automatically. Save them from the posts and drop them
here with these exact filenames — the pages pick them up on refresh, no code
changes needed.

| Filename         | Page                             | Expected photo                                   |
| ---------------- | -------------------------------- | ------------------------------------------------ |
| `headshot1.png`  | About                            | Your photo — already in place (square crop looks best) |
| `nazar-1.jpg`    | Projects → Nazar                 | The team at the Dell × NVIDIA AI Hackathon       |
| `nazar-2.jpg`    | Projects → Nazar                 | Nazar workstation build                          |
| `research-1.jpg` | Selected Research → ML for Phenotyping | Presenting at the UW Undergraduate Research Symposium |
| `research-2.jpg` | Selected Research → ML for Phenotyping | Research poster                                  |

## Logos (`logos/`)

Already downloaded and wired into the About page: Siemens Healthineers, University
of Washington, Landlab, UWCA, and Google. Edit the `LOGOS` array in
`src/content.ts` to add or remove marks.

Until a file exists, its slot renders as a dashed "Photo pending" placeholder.
To change captions, add more photos, or rename these, edit `src/content.ts`.
