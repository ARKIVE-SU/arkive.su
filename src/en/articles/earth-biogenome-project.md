---
title: "Earth BioGenome Project: Sequencing Life for the Future of Life"
date: 2026-03-12
excerpt: "Why the complete genomic library of Earth must be preserved in the Knowledge Ark. An ambitious initiative to decode all eukaryotic life on the planet."
image: "/assets/images/earth-biogenome.jpg"
tags: ["article"]
seoTitle: "Earth BioGenome Project: Complete Genomic Library on Knowledge Ark"
seoDesc: "In-depth scientific overview of the Earth BioGenome Project (EBP). Sequencing technologies, participants, databases, and significance for humanity's future."
---

# Earth BioGenome Project: Sequencing Life for the Future of Life

**Why the complete genomic library of Earth must be preserved in the Knowledge Ark**

*Prepared for the Knowledge Ark Initiative (arkive.su). March 2026.*

## Introduction: Why Sequence All Life on Earth?

In 2018, the international scientific community launched one of the most ambitious projects in the history of biology: the **Earth BioGenome Project (EBP)** — an initiative to sequence, catalog, and characterize the genomes of all described eukaryotic species on the planet. This includes approximately 1.67 million species — from microscopic algae to blue whales, from soil fungi to thousand-year-old sequoias.

If the *Human Genome Project*, completed in 2003, decoded the genetic code of a single species and cost $6 billion, the EBP sets the task of doing so for all eukaryotic life. Estimated cost is $3.9 billion, which is less than initial projections thanks to the rapidly decreasing cost of sequencing technologies.

EBP is not a single laboratory, but a "network of networks": over 2,200 scientists in 88 countries, united through more than 61 affiliated projects. Coordination is managed from Arizona State University (secretariat) with the participation of the world's largest sequencing centers.

For the **Knowledge Ark Initiative**, EBP data represents exceptional value: it is a complete molecular blueprint of Earth's biosphere — a catalog of organizational solutions developed by evolution over 4 billion years. The loss of this data would be an irreparable loss for any future civilization trying to understand life, bioengineering, or restore lost ecosystems.

## Scale and Current Progress

The project is organized into three phases:
1.  **Pilot Phase (2018–2020)** established standards, ethical frameworks, and methodologies.
2.  **Phase I (since 2021)** aims to obtain a reference genome for each of the approximately 10,000 taxonomic families of eukaryotes.
3.  **Phase II (by 2030)** involves collecting samples from 300,000 species and sequencing 150,000 of them, requiring the production of 3,000 reference genomes per month — a ten-fold acceleration compared to current rates.

As of early 2025, EBP affiliated projects have released more than 3,300 high-quality genomic assemblies, covering over 500 eukaryotic families. Over 3,400 genomes meeting EBP's minimum standards (contig N50 >1 Mb, scaffold N50 >10 Mb, over 95% of the genome in chromosomal superscaffolds) are available in **INSDC** (International Nucleotide Sequence Database Collaboration) databases. Of these, 48% are produced directly by EBP affiliated projects — meaning the project is already generating nearly half of all high-quality eukaryotic genomes in the world.

## Key Participants and Affiliated Projects

### Largest Sequencing Centers
*   **Wellcome Sanger Institute** (Cambridge, UK) — the largest single producer of reference genomes. Through the **Darwin Tree of Life (DToL)** subproject, it systematically sequences British fauna and flora; the milestone of 2,000 genomes has been crossed. Tree of Life Program Director — Mark Blaxter. Resource: [darwintreeoflife.org](https://www.darwintreeoflife.org).
*   **BGI** (Shenzhen, China) — the second most powerful sequencing center with global reach.

### Regional and Taxonomic Consortia
*   **European Reference Genome Atlas (ERGA)** — EBP's pan-European partner, coordinating the production of reference genomes for European biodiversity. Umbrella BioProject: PRJEB43510. Resource: [erga-biodiversity.eu](https://www.erga-biodiversity.eu).
*   **Vertebrate Genomes Project (VGP)** — a project led by Erich Jarvis (Rockefeller University), aimed at reference genomes for all vertebrate species. Resource: [vertebrategenomesproject.org](https://vertebrategenomesproject.org).
*   **Africa BioGenome Project (AfricaBP)** — an initiative to sequence African biodiversity with a focus on developing expertise on the continent. By 2025, 45 workshops were held, 5,000 participants from 75 countries were involved, and 545 African researchers were trained.
*   **Catalan Initiative for the Earth BioGenome Project (CBP)** — a regional project to catalog genomes of Catalan biodiversity. BioProject: PRJEB49670.
*   **i5k Initiative** — sequencing genomes of 5,000 arthropod species.
*   **B10K** — a project to sequence genomes of all bird species on Earth.
*   **EBP-Nor** (Norway) — sequencing all eukaryotic species of Norwegian fauna, including arctic species. Resource: [ebpnor.org](https://ebpnor.org).

Full list of affiliated projects: [earthbiogenome.org/affiliated-project-networks](https://www.earthbiogenome.org/affiliated-project-networks).

### Project Leadership
**Harris Lewin** (Arizona State University) — one of the architects and founders of EBP, head of the secretariat. **Gene E. Robinson** (University of Illinois) and **W. John Kress** (Smithsonian Institution) — co-initiators of the project. **Beth Shapiro** (UC Santa Cruz) and **Federica DiPalma** (Genome British Columbia) — key members of the scientific leadership for Phase II.

## Technical Pipeline: From Field to Database

### Sample Collection
Reference sequencing requires fresh tissue with intact high-molecular-weight DNA. Standard procedure: a sample is frozen in liquid nitrogen (−196°C) in field conditions or as quickly as possible after collection and stored at −80°C. Each sample is assigned a **ToLID (Tree of Life Identifier)** — a unique identifier ensuring tracking from specimen to genomic assembly. A physical voucher specimen is deposited in a museum collection. Metadata includes: GPS coordinates, collection date, habitat, fixation method, collector's name.

### Sequencing
Current technologies (as of 2024–2025): long-read sequencing on **Pacific Biosciences** (CCS/HiFi, accuracy >99.9%, read length 10–20 kb) and **Oxford Nanopore Technologies** (moderate to high accuracy on R10.4 chemistry, length up to 1000 kb) platforms. For scaffolding (assembling reads into chromosomal structures), **Hi-C** is used — a chromatin fixation method that allows determining the relative position of genome fragments. The cost of a ~1 Gb reference genome is around $5,000 in direct costs; the target cost for Phases II–III is $800 per species.

### Assembly and Quality Control
EBP standards for reference assembly: contig N50 >1 Mb, scaffold N50 >10 Mb, >95% of the genome in chromosomal superscaffolds. Completeness is assessed using **BUSCO** (>90% single-copy orthologs), base-level accuracy — using **Merqury**. Assembly pipelines include *verkko* and *hifiasm* (for HiFi + Hi-C data).

### Annotation
Annotation is the process of assigning biological meaning to the genomic sequence: defining gene boundaries (exons and introns), regulatory elements, repeats, pseudogenes. Functional annotation involves determining the probable function of each gene through homology with known genes and assigning standardized terms (**Gene Ontology**). Central annotation services — **Ensembl** (EMBL-EBI) and **RefSeq** (NCBI). Annotations are provided in GFF3 format and must be completely open (CC0 / public domain). NCBI also released **EGAPx** — an open eukaryotic genome annotation pipeline available for independent use ([github.com/ncbi/egapx](https://github.com/ncbi/egapx)).

### Data Deposition
All EBP data must be deposited in **INSDC** — a trio of mirror databases: **GenBank** (NCBI, USA), **European Nucleotide Archive** (ENA, EMBL-EBI), **DNA Data Bank of Japan** (DDBJ). Raw reads — in the **Sequence Read Archive** (SRA). Assemblies — with a GCA accession assigned. BioProject hierarchy: umbrella EBP (PRJNA533106) → regional umbrellas (ERGA: PRJEB43510, DToL: PRJEB40665, etc.) → national/taxonomic projects → individual species. Coordination and progress tracking — through **Genomes on a Tree (GoaT)** ([goat.genomehubs.org](https://goat.genomehubs.org)), an Elasticsearch metadata system for 1.5 million eukaryotic species.

## Open Data: Principles and Significance

EBP is built on the principle of complete data openness. All affiliated projects are required to deposit genomic assemblies along with raw data in INSDC with an embargo of no more than one year. All annotation is CC0 or public domain, with no restrictions on further use. Data is replicated daily between three INSDC mirrors on three continents (North America, Europe, Japan).

**GenBank** — the largest public database of nucleotide sequences — contained 51.56 trillion base pairs in 6.12 billion records for 581,000 species by February 2026. INSDC has been functioning since 1982 on the principles of free and unrestricted access, and is one of the oldest examples of open scientific infrastructure in the world.

EBP also takes a principled stand on patenting: the project opposes patenting reference sequences, considering them public domain.

## Why EBP Data is Critically Important for Knowledge Ark

**Knowledge Ark Initiative** (arkive.su) — a project for long-term preservation of humanity's knowledge using ultra-durable data storage technologies (ceramic media, quartz crystals, etc.). EBP genomic data represents one of the most valuable classes of information for long-term archiving for several reasons.

### Irreplaceability of Information
Species are going extinct. According to WWF estimates, since 1970, monitoring wildlife populations have decreased by 73%. By 2050, 30–50% of all animal species may disappear. Every species lost before sequencing is an irrevocable loss of information developed over billions of years of evolution. Each genome contains unique solutions to adaptation tasks: enzymes, metabolic pathways, regulatory schemes that cannot be restored once lost.

### Compactness and Self-Sufficiency of Data
Genomic data is perfectly suited for long-term storage. A reference genome of a single species is a sequence of four letters (A, T, G, C) with a volume of several tens of megabytes (for small genomes) to several gigabytes (for large ones). In compressed form, the entire EBP catalog of 1.67 million species could fit into a few petabytes. The data format is simple and self-documented: **FASTA** for sequences, **GFF3** for annotations — these are text files that any future civilization with a basic understanding of computer science could read.

### Practical Value for Future Generations
A complete genomic library is:
*   a) the basis for synthetic biology and de-extinction (restoring lost species);
*   b) a catalog of protein solutions for biotechnology (enzymes, antibiotics, metabolites);
*   c) a training dataset for AI models in biology (protein language models, genomic foundation models);
*   d) a reference for disease diagnosis, breeding, environmental monitoring.

Even if specific applications cannot be predicted, the value of a complete catalog of biological information will only grow over time.

### Archiving Recommendations
For Knowledge Ark, preserving EBP genomic data is recommended at several levels: 1) full reference assemblies (FASTA, chromosomal level) — the primary layer; 2) annotations (GFF3) — map of genes and functions; 3) metadata (BioSample, BioProject) — linking to species, location, and time of collection; 4) key scientific publications describing the project's methodology and standards.

## Physical Storage of Biomaterials: Global Cryobanks

Beyond digital data, the preservation of physical biomaterials — living cells, tissues, gametes, seeds — plays a critical role. This is an additional level of insurance: information we don't yet know how to read can be extracted from living cells, or a living organism can be restored with future technologies.

*   **Frozen Zoo®** (San Diego Zoo Wildlife Alliance, USA) — the world's largest cryobank of wild animal living cells: over 11,000 viable cell lines from more than 2,200 individuals. Founded in 1972. In 2020, a Przewalski's horse foal, Kurt, was cloned from cells frozen in 1980 — confirming cell viability after 40 years of storage.
*   **Nature’s SAFE** (Chester Zoo, UK) — one of Europe's largest living biobanks, a partnership with accredited zoos.
*   **Millennium Seed Bank** (Kew Gardens, UK) — the world's largest wild plant seed bank, storage at −20°C.
*   **Svalbard Global Seed Vault** (Spitsbergen, Norway) — a backup vault in permafrost, primarily for agricultural crops.

Cryopreservation cost for a single sample ranges from $42 to $1,500 (one-time), and $1–2 per year for maintenance. Critical vulnerability — dependence on power supply and liquid nitrogen supplies. This makes the task of digital data preservation on ultra-durable media (ceramic, quartz) strategically important.

## Genomics and Artificial Intelligence: Synergetic Potential

The complete EBP genomic library creates an unprecedented training dataset for AI models in biology. **AlphaFold** (DeepMind, Nobel Prize in Chemistry 2024) demonstrated that protein structure prediction is possible from sequences alone — but was trained on a limited set of species. When data for 1.5+ million species instead of a few thousand goes into such models — it will be a qualitative leap comparable to the transition from GPT-2 to GPT-4 in language models.

Practical consequences: systematic search for new enzymes, antibiotics, and therapeutic targets; function prediction for tens of percent of "unknown" genes; designing proteins with given properties (David Baker, Nobel Prize 2024).

## Key Scientific Publications

*   **Lewin H. A. et al. (2018).** «Earth BioGenome Project: Sequencing life for the future of life.» PNAS, 115(17), 4325–4333. DOI: 10.1073/pnas.1720115115.
*   **Lewin H. A. et al. (2022).** «The Earth BioGenome Project 2020: Starting the clock.» PNAS, 119(4), e2115635118. DOI: 10.1073/pnas.2115635118.
*   **Blaxter M., Lewin H. A., DiPalma F. et al. (2025).** «The Earth BioGenome Project Phase II: illuminating the eukaryotic tree of life.» Frontiers in Science, 3:1514835. DOI: 10.3389/fsci.2025.1514835.

## Key Resources and Databases

*   [earthbiogenome.org](https://www.earthbiogenome.org)
*   [goat.genomehubs.org](https://goat.genomehubs.org)
*   [insdc.org](https://www.insdc.org)
*   [ncbi.nlm.nih.gov/genbank](https://www.ncbi.nlm.nih.gov/genbank)

## Conclusion

The Earth BioGenome Project is an attempt to create a complete digital library of eukaryotic life on Earth before a significant part of this life is lost. For **Knowledge Ark**, EBP data represents one of the highest archiving priorities.

As said on the **Frozen Zoo®** exhibit in San Diego: “You must collect things for reasons you don’t yet understand.” We collect because understanding comes later. But what is lost is lost forever.

---
*Prepared as part of the Knowledge Ark Initiative (arkive.su). March 2026.*
