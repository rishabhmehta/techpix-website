import { Badge } from '@/components/ui/badge';

type Member = {
  name: string;
  role: string;
  initials: string;
};

const TEAM: Member[] = [
  { name: 'Jaiditya Mathur', role: 'CEO', initials: 'JM' },
  { name: 'Parth Bhalara', role: 'Head of Product', initials: 'PB' },
  {
    name: 'Rishabh Mehta',
    role: 'Head of Frontend Engineering',
    initials: 'RM',
  },
  {
    name: 'Abhilash Singhal',
    role: 'Head of Backend Engineering',
    initials: 'AS',
  },
  { name: 'Om Prakash', role: 'Head of Mobile Engineering', initials: 'OP' },
  { name: 'Aakansha Bhati', role: 'Head of Finance', initials: 'AB' },
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 md:py-20"
    >
      <div className="mb-8 text-center md:mb-12">
        <Badge variant="accent" className="mb-3">
          Core Team
        </Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Senior, Hands‑on Leadership
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
          Small, expert teams led by engineering and product leaders.
        </p>
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
            <p className="text-muted-foreground text-xs">
              Proven track record shipping production systems across web, mobile
              and cloud. Pragmatic, quality‑driven, outcome‑oriented.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
