exports.getFilters = (type) => {
  if (type === 'departments') {
    return(
      [
        {
          friendlyName: "Architecture",
          slug: "architecture",
          subFilts: [],
        },
        {
          friendlyName: "Art & Design",
          slug: "artanddesign",
          subFilts: ['ceramics', 'sculpting', 'textiles', 'watercolor'],
        },
        {
          friendlyName: "Ceramics",
          slug: "ceramics",
          isSubFilt: true,
        },
        {
          friendlyName: "Sculpting",
          slug: "sculpting",
          isSubFilt: true,
        },
        {
          friendlyName: "Textiles",
          slug: "textiles",
          isSubFilt: true,
        },
        {
          friendlyName: "Watercolor",
          slug: "watercolor",
          isSubFilt: true,
        },
        {
          friendlyName: "Business",
          slug: "business",
          subFilts: [],
        },
        {
          friendlyName: "Dentistry",
          slug: "dentistry",
          subFilts: [],
        },
        {
          friendlyName: "Engineering",
          slug: "engineering",
          subFilts: ['aero-eng', 'biomed-eng', 'chemical-eng', 'civil-eng', 'enviro-eng', 'mech-eng'],
        },
        {
          friendlyName: "Aerospace Engineering",
          slug: "aero-eng",
          isSubFilt: true,
        },
        {
          friendlyName: "Biomediacl Engineering",
          slug: "biomed-eng",
          isSubFilt: true,
        },
        {
          friendlyName: "Chemical Engineering",
          slug: "chemical-eng",
          isSubFilt: true,
        },
        {
          friendlyName: "Civil Engineering",
          slug: "civil-eng",
          isSubFilt: true,
        },
        {
          friendlyName: "Environmental Engineering",
          slug: "enviro-eng",
          isSubFilt: true,
        },
        {
          friendlyName: "Mechanical Engineering",
          slug: "mech-eng",
          isSubFilt: true,
        },
        {
          friendlyName: "Environment",
          slug: "environment",
          subFilts: [],
        },
        {
          friendlyName: "Information",
          slug: "information",
          subFilts: [],
        },
        {
          friendlyName: "Kinesiology",
          slug: "kinesiology",
          subFilts: [],
        },
        {
          friendlyName: "Law",
          slug: "law",
          subFilts: [],
        },
        {
          friendlyName: "Medicine",
          slug: "medicine",
          subFilts: ['dermatology', 'pediatrics', 'obstetrics', 'optometry', 'oncology', 'optometry', 'neurology'],
        },
        {
          friendlyName: "Dermatology",
          slug: "dermatology",
          isSubFilt: true,
        },
        {
          friendlyName: "Pediatrics",
          slug: "pediatrics",
          isSubFilt: true,
        },
        {
          friendlyName: "Obstetrics",
          slug: "obstetrics",
          isSubFilt: true,
        },
        {
          friendlyName: "Oncology",
          slug: "oncology",
          isSubFilt: true,
        },
        {
          friendlyName: "Optometry",
          slug: "optometry",
          isSubFilt: true,
        },
        {
          friendlyName: "Neurology",
          slug: "neurology",
          isSubFilt: true,
        },
      ]
    );
  }
  else if (type === 'researchAreas') {
    return(
      [
        {
          friendlyName: "Social Sciences",
          slug: "soc-sci",
          subFilts: [],
        },
        {
          friendlyName: "Health Sciences",
          slug: "health-sci",
          subFilts: [],
        },
        {
          friendlyName: "Engineering",
          slug: "engin-area",
          subFilts: [],
        },
        {
          friendlyName: "Arts & Humanities",
          slug: "art-human",
          subFilts: [],
        },
        {
          friendlyName: "Life Sciences",
          slug: "life-sci",
          subFilts: [],
        },
        {
          friendlyName: "Natural Sciences",
          slug: "natural-sci",
          subFilts: [],
        },
        {
          friendlyName: "Environmental Sciences",
          slug: "enviro-sci",
          subFilts: [],
        },
        {
          friendlyName: "Public Health",
          slug: "pub-health",
          subFilts: [],
        },
      ]
    );
  }
  else if (type === 'minReqs') {
    return(
      [
        {
          friendlyName: "Minimum Hours/Week",
          slug: "hours-per-week",
          subFilts: ['4-6', '6-8', '8-10', '10-12'],
        },
        {
          friendlyName: "4-6",
          slug: "4-6",
          isSubFilt: true,
        },
        {
          friendlyName: "6-8",
          slug: "6-8",
          isSubFilt: true,
        },
        {
          friendlyName: "8-10",
          slug: "8-10",
          isSubFilt: true,
        },
        {
          friendlyName: "10-12",
          slug: "10-12",
          isSubFilt: true,
        },
      ]
    );
  }
  else if (type === 'lab-skills') {
    return(
      [
        {
          friendlyName: "Animal Research",
          slug: "animal-research",
          subFilts: [],
        },
        {
          friendlyName: "Computer Programming",
          slug: "computer-programming",
          subFilts: [],
        },
        {
          friendlyName: "Data Collection & Analysis",
          slug: "data-collection",
          subFilts: [],
        },
        {
          friendlyName: "Clinical Research",
          slug: "clinical-research",
          subFilts: [],
        },
        {
          friendlyName: "Community Research",
          slug: "community-research",
          subFilts: [],
        },
        {
          friendlyName: "Library/Archival/Internet",
          slug: "library-archival-internet",
          subFilts: [],
        },
        {
          friendlyName: "Experimental Research",
          slug: "experimental-research",
          subFilts: [],
        },
      ]
    );
  }
}
