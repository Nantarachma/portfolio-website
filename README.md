# Rachmananta Ibnu Fajar Portfolio

A Next.js technical portfolio for Rachmananta Ibnu Fajar, a final-year Informatics student focused on machine learning, computer vision, Android development, and software engineering.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS
- Framer Motion (used only for restrained interactive motion where needed)

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Content structure

Portfolio content lives in `src/data/` so project, experience, research, and certification details can be updated without rewriting route components. Project artwork is optional: the site uses conceptual technical panels until genuine project assets are supplied.

## Portfolio Content TODO

- Add NIDS experiment metrics.
- Add NIDS architecture or result visuals.
- Add a SANTIKA paper or presentation URL if available.
- Add JustiBot screenshots if company policy allows.
- Add JustiBot case-study evidence.
- Add SHARA screenshots.
- Add Corn Leaf evaluation results.
- Add Bone Fracture evaluation results.
- Verify the EF SET score and CEFR level before displaying it.
- Add a local resume PDF at `public/rachmananta-ibnu-fajar-resume.pdf` if a download link is desired.
- Optionally add genuine project covers under `public/projects/`:
  - `nids-cover.webp`
  - `justibot-cover.webp`
  - `shara-cover.webp`
  - `corn-leaf-cover.webp`
  - `bone-fracture-cover.webp`
