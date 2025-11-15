import teamBg from "@/assets/team-bg.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Mwangi",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "James Ochieng",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
    },
    {
      name: "Amina Hassan",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
  ];

  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: `url(${teamBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Passionate professionals dedicated to empowering creative talent
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="glass-card p-8 text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-primary/30"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
