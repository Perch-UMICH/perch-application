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
          subFilts: [],
        },
      ]
    );
  }
  else if (type === 'researchAreas') {
    return(
      [
        {
          friendlyName: "Research Area 1",
          slug: "ra1",
          subFilts: [],
        },
        {
          friendlyName: "Research Area 2",
          slug: "ra2",
          subFilts: ['ra2s1', 'ra2s2', 'ra2s3', 'ra2s4'],
        },
        {
          friendlyName: "Research Area 2 Sub 1",
          slug: "ra2s1",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 2 Sub 2",
          slug: "ra2s2",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 2 Sub 3",
          slug: "ra2s3",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 2 Sub 4",
          slug: "ra2s4",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 3",
          slug: "ra3",
          subFilts: ['ra3s1', 'ra3s2', 'ra3s3', 'ra3s4'],
        },
        {
          friendlyName: "Research Area 3 Sub 1",
          slug: "ra3s1",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 3 Sub 2",
          slug: "ra3s2",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 3 Sub 3",
          slug: "ra3s3",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 3 Sub 4",
          slug: "ra3s4",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 4",
          slug: "ra4",
          subFilts: ['ra4s1', 'ra4s2', 'ra4s3', 'ra4s4'],
        },
        {
          friendlyName: "Research Area 4 Sub 1",
          slug: "ra4s1",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 4 Sub 2",
          slug: "ra4s2",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 4 Sub 3",
          slug: "ra4s3",
          isSubFilt: true,
        },
        {
          friendlyName: "Research Area 4 Sub 4",
          slug: "ra4s4",
          isSubFilt: true,
        },
      ]
    );
  }
  else if (type === 'minReqs') {
    return(
      [
        {
          friendlyName: "Year",
          slug: "year",
          subFilts: ['freshman', 'sophomore', 'junior', 'senior'],
        },
        {
          friendlyName: "Freshman",
          slug: "freshman",
          isSubFilt: true,
        },
        {
          friendlyName: "Sophomore",
          slug: "sophomore",
          isSubFilt: true,
        },
        {
          friendlyName: "Junior",
          slug: "junior",
          isSubFilt: true,
        },
        {
          friendlyName: "Senior",
          slug: "senior",
          isSubFilt: true,
        },
        {
          friendlyName: "Minimum GPA",
          slug: "min_gpa",
          subFilts: ['none', 'gpa2_0', 'gpa3_0', 'gpa3_5'],
        },
        {
          friendlyName: "None",
          slug: "none",
          isSubFilt: true,
        },
        {
          friendlyName: "2.0",
          slug: "gpa2_0",
          isSubFilt: true,
        },
        {
          friendlyName: "3.0",
          slug: "gpa3_0",
          isSubFilt: true,
        },
        {
          friendlyName: "3.5",
          slug: "gpa3_5",
          isSubFilt: true,
        },
        {
          friendlyName: "Ability to Balance Pencil on Head",
          slug: "pencil_balancing",
          subFilts: [],
        },
        {
          friendlyName: "For Credit",
          slug: "for_credit",
          subFilts: [],
        },
        {
          friendlyName: "Gourmet Chef Lunches",
          slug: "lunch_provided",
          subFilts: [],
        },
        {
          friendlyName: "Has at least one miniature pig calendar",
          slug: "mini_pig",
          subFilts: [],
        },
      ]
    );
  }
  else if (type === 'other') {
    return(
      [
        {
          friendlyName: "Will you feed my cat on vacation?",
          slug: "cat_vacay",
          subFilts: [],
        },
        {
          friendlyName: "Can you do a handstand?",
          slug: "handstand",
          subFilts: ['handstand_yes', 'handstand_hecksyes', 'handstand_now'],
        },
        {
          friendlyName: "yes",
          slug: "handstand_yes",
          isSubFilt: true,
        },
        {
          friendlyName: "HECKS TO THE YES",
          slug: "handstand_hecksyes",
          isSubFilt: true,
        },
        {
          friendlyName: "I\'m doing a handstand right now",
          slug: "handstand_now",
          isSubFilt: true,
        },
      ]
    );
  }
}
