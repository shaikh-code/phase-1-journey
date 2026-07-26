




// COMPONENT 1: Header


function Header({ title, subtitle }) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}


// 
// COMPONENT 2: Profile


function Profile({ name, role, location, bio }) {
  return (
    <section>
      <h2>{name}</h2>

      <p>
        <strong>Role:</strong> {role}
      </p>

      <p>
        <strong>Location:</strong> {location}
      </p>

      <p>{bio}</p>
    </section>
  );
}



// COMPONENT 3: StatCard


function StatCard({ label, value }) {
  return (
    <div>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}



// COMPONENT 4: UserCard


function UserCard({
  name,
  role,
  experience,
  skills,
}) {
  return (
    <article>
      <h3>{name}</h3>

      <p>
        <strong>Role:</strong> {role}
      </p>

      <p>
        <strong>Experience:</strong> {experience}
      </p>

      <h4>Skills</h4>

      <ul>
        {skills.map((skill) => (
          <li key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}



// MAIN COMPONENT


function Practice() {


  // USER OBJECT


  const user = {
    name: "Abdul Moiz",
    role: "Aspiring AI & Full-Stack Developer",
    location: "Lahore, Pakistan",
    bio: "Currently learning React and building a strong foundation in modern web development.",
  };



  // STATS ARRAY


  const stats = [
    {
      id: 1,
      label: "Projects",
      value: 8,
    },
    {
      id: 2,
      label: "Skills",
      value: 12,
    },
    {
      id: 3,
      label: "Learning Hours",
      value: 120,
    },
  ];



  // DEVELOPERS ARRAY


  const developers = [
    {
      id: 1,
      name: "Abdul Moiz",
      role: "React Developer",
      experience: "Beginner",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
      ],
    },

    {
      id: 2,
      name: "Ali Khan",
      role: "Frontend Developer",
      experience: "Intermediate",
      skills: [
        "React",
        "Tailwind CSS",
        "JavaScript",
      ],
    },

    {
      id: 3,
      name: "Sara Ahmed",
      role: "UI/UX Designer",
      experience: "Intermediate",
      skills: [
        "Figma",
        "UI Design",
        "UX Research",
      ],
    },
  ];



  // JSX RETURN


  return (
    <main>

      {/* HEADER */}

      <Header
        title="Developer Community"
        subtitle="React Fundamentals Practice"
      />


      {/* PROFILE */}

      <Profile
        name={user.name}
        role={user.role}
        location={user.location}
        bio={user.bio}
      />


      {/* STATISTICS */}

      <section>
        <h2>My Learning Statistics</h2>

        <div>
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </section>


      {/* DEVELOPERS */}

      <section>
        <h2>Community Developers</h2>

        <div>
          {developers.map((developer) => (
            <UserCard
              key={developer.id}
              name={developer.name}
              role={developer.role}
              experience={developer.experience}
              skills={developer.skills}
            />
          ))}
        </div>
      </section>

    </main>
  );
}



// EXPORT


export default Practice;