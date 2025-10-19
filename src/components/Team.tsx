import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { use3DTilt } from "@/hooks/use3DTilt";

const Team = () => {
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation(0.2);
  const tilt1 = use3DTilt();
  const tilt2 = use3DTilt();
  const tilt3 = use3DTilt();
  const team = [
    { name: "Chidi Eze", role: "Senior Partner, Corporate Law", image: teamMember1 },
    { name: "Samira Hadid", role: "Civil Litigation Expert", image: teamMember2 },
    { name: "Francois Mercer", role: "Family Law Specialist", image: teamMember3 },
  ];

  return (
    <section className="py-20 bg-darker-bg">
      <div className="container mx-auto px-6">
        <h2 className="font-playfair text-5xl font-bold text-accent mb-12">Our Team</h2>
        
        <div 
          ref={teamRef}
          className="grid grid-cols-3 gap-8"
        >
          {team.map((member, index) => {
            const tiltProps = index === 0 ? tilt1 : index === 1 ? tilt2 : tilt3;
            return (
              <div 
                key={index} 
                className={`space-y-4 transition-all duration-700 ${
                  teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div 
                  {...tiltProps}
                  className="rounded-2xl overflow-hidden border-2 border-accent cursor-pointer hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-shadow duration-300"
                  style={{ transition: 'transform 0.1s ease-out, box-shadow 0.3s' }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-foreground text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-accent text-sm">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
