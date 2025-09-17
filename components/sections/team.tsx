import { Badge } from '@/components/ui/badge';

type Member = {
  name: string;
  role: string;
  initials: string;
  funFact: string;
  quote: string;
};

const TEAM: Member[] = [
  {
    name: 'Jaiditya Mathur',
    role: 'CEO',
    initials: 'JM',
    funFact:
      'Enjoys solving complex puzzles, a skill he applies to business strategy.',
    quote:
      "We're building the future of digital products, one pixel at a time.",
  },
  {
    name: 'Parth Bhalara',
    role: 'Head of Product',
    initials: 'PB',
    funFact:
      'Loves prototyping new ideas to uncover what users need before they even realize it.',
    quote:
      'My focus is on creating products that feel intuitive and solve real problems for our users.',
  },
  {
    name: 'Rishabh Mehta',
    role: 'Head of Front-End Engineering',
    initials: 'RM',
    funFact:
      'Has an obsessive eye for detail, noticing a single-pixel misalignment from across a room.',
    quote:
      'I believe great user experience comes from a deep understanding of human interaction and a passion for clean code.',
  },
  {
    name: 'Abhilash Singhal',
    role: 'Head of Back-End Engineering',
    initials: 'AS',
    funFact:
      'Builds systems that don’t crash under pressure, designed for reliability.',
    quote:
      'I enjoy the challenge of architecting robust and scalable systems that power our innovations.',
  },
  {
    name: 'Om Prakash',
    role: 'Head of Mobile Engineering',
    initials: 'OP',
    funFact:
      'Crafts mobile apps that feel like a natural extension of the user, making them impossible to put down.',
    quote:
      "We aim to build the app you didn't know you needed, but now can't live without.",
  },
  {
    name: 'Aakansha Bhati',
    role: 'Head of Finance',
    initials: 'AB',
    funFact:
      "Sees every budget not just as a spreadsheet, but as an investment in our team's potential",
    quote:
      'My goal is to ensure our growth is sustainable, allowing us to invest in our team and our vision.',
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 md:py-20"
    >
      <div className="mb-8 text-center md:mb-12">
        <Badge variant="accent" className="mb-3">
          Our Core Team
        </Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Meet the minds driving innovation.
        </h2>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((m) => (
          <li
            key={m.name}
            className="bg-card/60 group hover:border-primary/40 rounded-xl border p-5 shadow-sm backdrop-blur-sm transition"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg font-semibold">
                {m.initials}
              </div>
              <div>
                <p className="leading-tight font-medium">{m.name}</p>
                <p className="text-muted-foreground text-xs">{m.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">{m.funFact}</p>
            <blockquote className="text-muted-foreground mt-2 border-l pl-3 text-[11px] italic">
              “{m.quote}”
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
