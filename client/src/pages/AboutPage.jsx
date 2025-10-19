import { Award, Users, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  textReveal,
  imageReveal,
  cardHover,
  animateCounter,
  cleanupAnimations,
} from "../lib/gsapAnimations";

export function AboutPage() {
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      textReveal(headerRef.current.querySelectorAll("h1, p"));
    }

    // Stats section with counter animation
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll(".stat-card");
      const statNumbers = statsRef.current.querySelectorAll(".stat-number");
      fadeInUp(statCards, { stagger: 0.2 });
      animateCounter(statNumbers);
    }

    // Story section
    if (storyRef.current) {
      const storyText = storyRef.current.querySelector(".story-text");
      const storyImage = storyRef.current.querySelector(".story-image");
      fadeInLeft([storyText]);
      fadeInRight([storyImage]);
    }

    // Values section
    if (valuesRef.current) {
      const valueCards = valuesRef.current.querySelectorAll(".value-card");
      scaleIn(valueCards, { stagger: 0.15 });
      cardHover(valueCards);
    }

    // Team section
    if (teamRef.current) {
      const teamCards = teamRef.current.querySelectorAll(".team-card");
      fadeInUp(teamCards, { stagger: 0.2 });
      cardHover(teamCards);
    }

    // Cleanup on unmount
    return () => {
      cleanupAnimations();
    };
  }, []);

  const stats = [
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      value: "500+",
      label: "Projects Completed",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      value: "150+",
      label: "Expert Engineers",
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      value: "25+",
      label: "Cities Powered",
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      value: "15+",
      label: "Years Experience",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&auto=format",
      bio: "Leading GreenCo with 20+ years of experience in electrical infrastructure development.",
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
      bio: "Driving innovation in smart grid technology and renewable energy integration.",
    },
    {
      name: "Emily Rodriguez",
      position: "Head of Engineering",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
      bio: "Overseeing project delivery and ensuring the highest standards of engineering excellence.",
    },
    {
      name: "David Thompson",
      position: "Director of Operations",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format",
      bio: "Managing nationwide operations and maintaining our commitment to quality service.",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "Pioneering cutting-edge solutions that transform how cities consume and distribute energy.",
      icon: "⚡",
    },
    {
      title: "Sustainability",
      description:
        "Committed to building a greener future through renewable energy integration and efficient systems.",
      icon: "🌱",
    },
    {
      title: "Reliability",
      description:
        "Delivering dependable infrastructure that communities can count on for generations.",
      icon: "🔧",
    },
    {
      title: "Excellence",
      description:
        "Maintaining the highest standards in every project, from planning to implementation.",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              GreenCo
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            For over 15 years, GreenCo has been at the forefront of electrical
            infrastructure innovation, powering cities and empowering
            communities with sustainable energy solutions.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="stat-card bg-white/5 border-white/10 text-center"
            >
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="stat-number text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story Section */}
        <div
          ref={storyRef}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="story-text">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-white/70">
              <p>
                Founded in 2009, GreenCo emerged from a vision to revolutionize
                how cities approach electrical infrastructure. Our founders
                recognized the growing need for sustainable, intelligent power
                systems that could adapt to the demands of modern urban
                environments.
              </p>
              <p>
                Starting with a small team of passionate engineers, we've grown
                into a leading provider of comprehensive electrical
                infrastructure solutions. Our commitment to innovation and
                sustainability has driven us to develop cutting-edge
                technologies that not only meet today's needs but anticipate
                tomorrow's challenges.
              </p>
              <p>
                Today, GreenCo stands as a trusted partner to cities,
                municipalities, and private organizations across the nation,
                delivering reliable, efficient, and sustainable electrical
                infrastructure that powers progress and prosperity.
              </p>
            </div>
          </div>
          <div className="story-image relative">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581092918256-3d0c633d7d1d?w=600&h=400&fit=crop&auto=format"
                alt="GreenCo office building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div ref={valuesRef} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our
              commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="value-card bg-white/5 border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The experienced professionals leading GreenCo's mission to power
              the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="team-card bg-white/5 border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-400 mb-3">{member.position}</p>
                  <p className="text-white/70 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us in Powering the Future
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Ready to be part of the sustainable energy revolution? Explore
            career opportunities with GreenCo and help us build the
            infrastructure of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View Open Positions
            </button>
            <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
