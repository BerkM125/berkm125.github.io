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
        <span class="social"><strong>LinkedIn:</strong>
          <a href="${LINKEDIN}" target="_blank" rel="noopener">linkedin.com/in/berkan-m</a></span>
        <span class="social"><strong>GitHub:</strong>
          <a href="${GITHUB}" target="_blank" rel="noopener">github.com/berkm125</a></span>
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
            <p class="xp-desc">Building enterprise-grade agents and codebase intelligence systems to
            automate agile workflows (DevOps) for ultrasound machine software engineers.</p>
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
