/**
 * Note contents, keyed by page id. Pages with no entry render as an empty note.
 * Photos referenced here live in /public/images â€” see public/images/README.md.
 */

export interface Shot {
  src: string;
  caption: string;
}

export interface NoteContent {
  text: string;
  images?: Shot[];
  /** Raw markup for the left column, when a plain photo gallery isn't enough. */
  aside?: string;
  /** Markup appended beneath the photo column. */
  mediaFooter?: string;
}

/** Orgs shown in the About page logo square. */
const LOGOS: { src: string; name: string; cell: string }[] = [
  { src: "/images/logos/siemens.svg", name: "Siemens Healthineers", cell: "a" },
  { src: "/images/logos/nape.png", name: "UW NAPE Center", cell: "n" },
  { src: "/images/logos/uw.svg", name: "University of Washington", cell: "b" },
  { src: "/images/logos/landlab.png", name: "Landlab", cell: "c" },
  // a spans row 1, n spans row 2, and b/c share row 3
];

function logoCells(): string {
  return LOGOS.map(
    (l) => `<div class="logo-cell cell-${l.cell}" data-name="${l.name}" title="${l.name}">
      <img src="${l.src}" alt="${l.name}" loading="lazy" />
    </div>`
  ).join("");
}

const LINKEDIN = "https://www.linkedin.com/in/berkan-m/";
const GITHUB = "https://github.com/berkm125";

/** Official LinkedIn "in" mark (brand blue) and GitHub Octicons mark. */
const LINKEDIN_MARK = `<svg class="social-mark" viewBox="0 0 72 72" aria-label="LinkedIn" role="img">
  <path fill="#007EBB" d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,0 64,0 L8,0 C3.581722,0 0,3.581722 0,8 L0,64 C0,68.418278 3.581722,72 8,72 Z"/>
  <path fill="#FFF" d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"/>
</svg>`;

// currentColor so the mark stays legible in both light and dark themes
const GITHUB_MARK = `<svg class="social-mark" viewBox="0 0 16 16" aria-label="GitHub" role="img">
  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/>
</svg>`;

// Organizations linked from the About page
const UW = "https://www.washington.edu/";
const SIEMENS = "https://www.siemens-healthineers.com/";
const BRUCHAS = "http://www.bruchaslab.org/";
const NAPE = "https://depts.washington.edu/uwnape/";
const WDRG = "http://www.uwwatersheddynamics.com/";
const UWCA = "https://www.uwconsulting.org/";
const LANDLAB = "https://landlab.readthedocs.io/";
const PYSHRED = "https://github.com/pyshred-dev/pyshred";
const SHRED_LANDLAB = "https://github.com/gaia-hazlab/shred-landlab-prototypes";
const URS = "https://www.washington.edu/urs/";
const URS_ABSTRACT =
  "https://event.fourwaves.com/uw-2026urs/abstracts/76ebc3fb-ad5a-4ae0-a98f-6c818e83b518";
const RESEARCH_POST =
  "https://www.linkedin.com/feed/update/urn:li:activity:7462629916472147970/";
const LANDLAB_RADIATION =
  "https://landlab.readthedocs.io/en/latest/generated/api/landlab.components.radiation.radiation.html";
const LANDLAB_PET =
  "https://landlab.readthedocs.io/en/latest/generated/api/landlab.components.pet.potential_evapotranspiration_field.html";

const NAZAR_POST =
  "https://www.linkedin.com/feed/update/urn:li:activity:7487727792931893248/";

export const CONTENT: Record<string, NoteContent> = {
  about: {
    aside: `
      <div class="headshot" data-name="Headshot">
        <img src="/images/headshot1.png" alt="Berkan Mertan" loading="lazy" />
      </div>
      <div class="logo-box">
        ${logoCells()}
      </div>
    `,
    text: `
      <p>Hey, I'm <strong>Berkan</strong><span class="typed" data-text=", an undergrad studying CS @ UW."></span></p>

      <p>I'm currently a SWE intern at <a href="${SIEMENS}" target="_blank" rel="noopener"><strong>Siemens Healthineers</strong></a>
      building codebase intelligence systems and agents for DevOps workflows. I'm also an undergraduate
      researcher at the <a href="${BRUCHAS}" target="_blank" rel="noopener"><strong>Bruchas Lab</strong></a>
      in the UW NAPE Center, where I develop ML pipelines to study neural circuits and affective
      behavior.</p>

      <p>Previously, I was a software developer at the
      <a href="${WDRG}" target="_blank" rel="noopener"><strong>UW Watershed Dynamics Research Group</strong></a>,
      where I built <a href="${LANDLAB}" target="_blank" rel="noopener"><strong>Landlab</strong></a> library
      components to model <a href="${LANDLAB_RADIATION}" target="_blank" rel="noopener">solar radiation</a>
      and <a href="${LANDLAB_PET}" target="_blank" rel="noopener">evapotranspiration</a>. I've also worked
      on strategy for Google's AI-powered advertising products and YouTube Shorts
      as a student analyst at
      <a href="${UWCA}" target="_blank" rel="noopener"><strong>UWCA</strong></a>.</p>

      <p class="social-line">
        <span class="social">${LINKEDIN_MARK}
          <a href="${LINKEDIN}" target="_blank" rel="noopener">linkedin.com/in/berkan-m</a></span>
        <span class="social">${GITHUB_MARK}
          <a href="${GITHUB}" target="_blank" rel="noopener">github.com/berkm125</a></span>
        <span class="social"><strong>Reach Out:</strong>
          <a href="mailto:berkanm@uw.edu">berkanm@uw.edu</a></span>
      </p>
    `,
  },

  work: {
    text: `
      <ul class="xp-list">
        <li class="xp">
          <div class="xp-logo">
            <img src="/images/logos/siemens.svg" alt="Siemens Healthineers" loading="lazy" />
          </div>
          <div class="xp-body">
            <div class="xp-head">
              <span class="xp-org">Siemens Healthineers</span>
              <span class="xp-date">Jun 2025 &ndash; Present</span>
            </div>
            <div class="xp-role">Software Engineer Intern</div>
            <p class="xp-desc">Building enterprise-grade agents and codebase intelligence systems for
            ultrasound machine software engineers.</p>
          </div>
        </li>

        <li class="xp">
          <div class="xp-logo">
            <img src="/images/logos/bruchas.png" alt="Bruchas Lab" loading="lazy" />
          </div>
          <div class="xp-body">
            <div class="xp-head">
              <span class="xp-org">Bruchas Lab @ UW</span>
              <span class="xp-date">Oct 2025 &ndash; Present</span>
            </div>
            <div class="xp-role">Undergraduate Researcher</div>
            <p class="xp-desc">Developing machine learning pipelines for discovering and monitoring
            latent behaviors in CRISPR-edited mice. Applying statistical methods on pipeline results to
            determine the effect of individual neuropeptides on affective behavior.
            <a data-goto="ml-phenotyping">Abstract</a>.</p>
          </div>
        </li>

        <li class="xp">
          <div class="xp-logo">
            <img src="/images/logos/uw.svg" alt="University of Washington" loading="lazy" />
          </div>
          <div class="xp-body">
            <div class="xp-head">
              <span class="xp-org">Watershed Dynamics Research Group @ UW</span>
              <span class="xp-date">Feb 2023 &ndash; Aug 2025</span>
            </div>
            <div class="xp-role">Software Developer</div>
            <p class="xp-desc">Built <a href="${LANDLAB}" target="_blank" rel="noopener">Landlab</a>
            library components to model
            <a href="${LANDLAB_RADIATION}" target="_blank" rel="noopener">solar radiation</a> and
            <a href="${LANDLAB_PET}" target="_blank" rel="noopener">evapotranspiration</a>. Briefly
            developed landscape evolution
            <a href="${SHRED_LANDLAB}" target="_blank" rel="noopener">pipelines</a> using
            <a href="${PYSHRED}" target="_blank" rel="noopener">PySHRED</a> and Landlab in tandem.</p>
          </div>
        </li>
      </ul>
    `,
  },

  research: {
    text: `
      <p class="lede">Some of my research in the intersection of ML, behavioral science and
      neuroscience.</p>
      <ul class="link-list">
        <li><a data-goto="ml-phenotyping"><strong>Machine Learning for Phenotyping</strong></a>
        &mdash; Bruchas Lab @ UW, presented at UW's annual Undergraduate Research Symposium.</li>
      </ul>
    `,
  },

  "ml-phenotyping": {
    images: [
      {
        src: "/images/research-1.png",
        caption: "Presenting my project at Mary Gates Hall",
      },
      {
        src: "/images/research-2.png",
        caption: "Walking through future plans for further research",
      },
    ],
    mediaFooter: `
      <div class="media-links">
        <p><strong>Official Abstract:</strong>
          <a href="${URS_ABSTRACT}" target="_blank" rel="noopener">View on Fourwaves</a></p>
        <p><strong>LinkedIn Post:</strong>
          <a href="${RESEARCH_POST}" target="_blank" rel="noopener">View on LinkedIn</a></p>
      </div>
    `,
    text: `
      <p>Three quarters into working at the Bruchas Lab, I presented my research at the
      <a href="${URS}" target="_blank" rel="noopener"><strong>2026 UW Research Symposium</strong></a>.
      See my abstract below!</p>

      <p>Linking genetic modifications to behavioral phenotypes requires time-consuming labeling that can
      be biased by human identifiers. Moreover, targeting specific brain regions with a CRISPR knockout
      could produce subtle behavioral changes missed by human labelers. This project investigates: Can a
      machine learning approach distinguish mouse genotypes and treatments? We hypothesize that
      high-dimensional kinematic features could reveal phenotypic differences undetectable by standard
      observation.</p>

      <p>To test this, we developed a pipeline beginning with SLEAP-based pose estimation, extracting 48
      kinematic features per frame, including body-part heights, inter-joint distances, velocities, gait
      metrics, stride kinematics, and yaw calculations. We used CRISPR to disturb distinct neuromodulation
      signals in the anterior insular cortex (aIC), injecting SgVglut1 for glutamate, SgPdyn for
      dynorphin, and SgROSA as controls, then recorded mouse behaviors under varying stress and drug
      conditions. Using a Random Forest Classifier to segment behaviors such as walking, rearing, feeding,
      grooming, and nose-up, we applied comparative classification models to isolate genotype-specific
      motor patterns.</p>

      <p>I conducted principal component analysis and t-distributed stochastic neighbor embedding across
      25 features to identify kinematic subsets maximizing genotype separability. I implemented three
      classification approaches: PCA-based logistic regression with per-video majority voting, a deep
      neural network trained on aggregate kinematic data, and a weighted nearest-centroid classifier. I
      generated condition-by-condition PCA plots and per-feature distribution analyses, revealing features
      that most strongly differentiate genotypes and drug conditions.</p>

      <p>Preliminary findings demonstrate visible genotype clustering in reduced feature spaces,
      particularly during specific behaviors, validating that kinematic features contain sufficient
      information to predict the genetic and pharmacological state of underlying neural circuits.</p>
    `,
  },

  projects: {
    text: `
      <p class="lede">Things I've built. Full source for most of these lives on
      <a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a>.</p>
      <ul class="link-list">
        <li><a href="https://github.com/Dhruv-0-Arora/Nazar" target="_blank" rel="noopener"><strong>Nazar</strong></a>
        &mdash; local-first AI agent that diagnoses broken infrastructure with no cloud and no internet.
        <strong>2nd of 40 teams</strong>, BuilderBase Dell &times; NVIDIA AI Hackathon.
        <a href="https://www.youtube.com/watch?v=8GF8j_VnHpE" target="_blank" rel="noopener">Demo</a> &middot;
        <a href="${NAZAR_POST}" target="_blank" rel="noopener">LinkedIn write-up</a></li>

        <li><a href="${GITHUB}/Farmer-Insights" target="_blank" rel="noopener"><strong>Demeter</strong></a>
        &mdash; enterprise-grade agricultural insights for small farmers, pairing satellite crop health
        analysis with soil monitoring and live commodity pricing.
        <strong>Top 10 of 400 projects mention</strong>, CalHacks 12.0 Social Impact subtrack.
        <a href="https://devpost.com/software/demeter-so268i" target="_blank" rel="noopener">Devpost</a></li>

        <li><a href="https://github.com/refact0r/dubflow" target="_blank" rel="noopener"><strong>Dubflow</strong></a>
        &mdash; context-aware desktop focus companion that watches for drifting attention and pulls it
        back. DubHacks 2025.</li>

        <li><a href="${LANDLAB}" target="_blank" rel="noopener"><strong>Landlab</strong></a>
        &mdash; open-source Python framework for building numerical models of earth-surface processes.
        I contributed two components:
          <ul class="link-list sub">
            <li><a href="${LANDLAB_RADIATION}" target="_blank" rel="noopener">Radiation</a>
            &mdash; computes daily extraterrestrial, clear-sky, incident shortwave, net shortwave,
            longwave, and net radiation across a topographic grid.</li>
            <li><a href="${LANDLAB_PET}" target="_blank" rel="noopener">PotentialEvapotranspiration</a>
            &mdash; derives spatially distributed potential evapotranspiration from an incoming radiation
            field, via net-radiation, Penman-Monteith, or Priestley-Taylor methods.</li>
          </ul>
        </li>

        <li><a href="${GITHUB}/Orbit" target="_blank" rel="noopener"><strong>Orbit</strong></a>
        &mdash; AI-powered hyperlocal geo-network of professionals for smarter networking.
        Cascadia Hackathon 2025.</li>
      </ul>
    `,
  },
};
