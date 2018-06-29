exports.getDepartments = () => {
  return(
    [
      {
        friendlyName: "Architecture",
        slug: "architecture",
        subDepts: [],
      },
      {
        friendlyName: "Art & Design",
        slug: "artanddesign",
        subDepts: ['ceramics', 'sculpting', 'textiles', 'watercolor'],
      },
      {
        friendlyName: "Ceramics",
        slug: "ceramics",
        isSubDept: true,
      },
      {
        friendlyName: "Sculpting",
        slug: "sculpting",
        isSubDept: true,
      },
      {
        friendlyName: "Textiles",
        slug: "textiles",
        isSubDept: true,
      },
      {
        friendlyName: "Watercolor",
        slug: "watercolor",
        isSubDept: true,
      },
      {
        friendlyName: "Business",
        slug: "business",
        subDepts: [],
      },
      {
        friendlyName: "Dentistry",
        slug: "dentistry",
        subDepts: [],
      },
      {
        friendlyName: "Engineering",
        slug: "engineering",
        subDepts: ['aero-eng', 'biomed-eng', 'chemical-eng', 'civil-eng', 'enviro-eng', 'mech-eng'],
      },
      {
        friendlyName: "Aerospace Engineering",
        slug: "aero-eng",
        isSubDept: true,
      },
      {
        friendlyName: "Biomediacl Engineering",
        slug: "biomed-eng",
        isSubDept: true,
      },
      {
        friendlyName: "Chemical Engineering",
        slug: "chemical-eng",
        isSubDept: true,
      },
      {
        friendlyName: "Civil Engineering",
        slug: "civil-eng",
        isSubDept: true,
      },
      {
        friendlyName: "Environmental Engineering",
        slug: "enviro-eng",
        isSubDept: true,
      },
      {
        friendlyName: "Mechanical Engineering",
        slug: "mech-eng",
        isSubDept: true,
      },
      {
        friendlyName: "Environment",
        slug: "environment",
        subDepts: [],
      },
      {
        friendlyName: "Information",
        slug: "information",
        subDepts: [],
      },
      {
        friendlyName: "Kinesiology",
        slug: "kinesiology",
        subDepts: [],
      },
      {
        friendlyName: "Law",
        slug: "law",
        subDepts: [],
      },
      {
        friendlyName: "Medicine",
        slug: "medicine",
        subDepts: [],
      },
    ]
  );
}
