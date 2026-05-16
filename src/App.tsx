import { useMemo } from 'react'
import {
  CheckCircle2,
  Calendar,
  Video,
  ClipboardList,
  MonitorCheck,
  BellRing,
  Mail,
  MessageCircle,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react'

type Step = {
  icon: typeof Calendar
  title: string
  body: string
  cta?: { label: string; href: string }
}

const STEPS: Step[] = [
  {
    icon: Calendar,
    title: 'Zet het gesprek in je agenda',
    body: 'Je ontvangt zo een bevestigingsmail met een agenda-uitnodiging. Accepteer deze direct, zodat je het tijdstip niet vergeet en je agenda geblokkeerd staat.',
    cta: { label: 'Voeg toe aan agenda', href: '#' },
  },
  {
    icon: ClipboardList,
    title: 'Vul het intake-formulier in',
    body: 'Zo kunnen we het gesprek volledig op jouw situatie afstemmen. Reken op 3 tot 5 minuten. Hoe scherper jouw antwoorden, hoe concreter onze aanpak.',
    cta: { label: 'Start intake (3 min.)', href: '#' },
  },
  {
    icon: Video,
    title: 'Bekijk de voorbereidingsvideo',
    body: 'In 8 minuten leggen we uit hoe wij coaches in 90 dagen naar consistente €10K+ maanden begeleiden. Bekijk deze vóór het gesprek — zo halen we samen meer uit ons uur.',
    cta: { label: 'Bekijk video (8 min.)', href: '#' },
  },
  {
    icon: MonitorCheck,
    title: 'Test je camera, microfoon en verbinding',
    body: 'We bellen via Google Meet. Doe vooraf een korte check op een rustige plek met goede wifi. Zo voorkom je technische ruis tijdens het gesprek.',
  },
  {
    icon: BellRing,
    title: 'Zet je telefoon op stil',
    body: 'Plan 60 minuten zonder afleiding. Hoe meer ruimte je geeft, hoe scherper jouw plan na afloop.',
  },
]

const FAQ = [
  {
    q: 'Wat gebeurt er tijdens het gesprek?',
    a: 'We brengen je huidige situatie in kaart, bepalen waar je vastloopt en laten zien welk pad jou in 90 dagen naar consistente €10K+ maanden brengt. Geen pitch, wel een eerlijk advies.',
  },
  {
    q: 'Met wie spreek ik?',
    a: 'Je spreekt met een van onze strategen. Zij hebben zelf gecoached op €30K+ p/m niveau en weten precies waar coaches in jouw fase op vastlopen.',
  },
  {
    q: 'Kan ik het gesprek verzetten?',
    a: 'Zeker. Gebruik de "Verzet het gesprek" link onderaan deze pagina of in je bevestigingsmail. Doe dit minimaal 12 uur van tevoren.',
  },
  {
    q: 'Wat als ik niet kom opdagen?',
    a: 'No-shows krijgen geen tweede mogelijkheid. We werken op afspraak met een beperkt aantal plekken per week — kom je niet, dan gaat de plek naar iemand anders.',
  },
]

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

function formatTime(d: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

function App() {
  const meeting = useMemo(() => {
    const start = new Date()
    start.setDate(start.getDate() + 2)
    start.setHours(14, 0, 0, 0)
    const end = new Date(start)
    end.setMinutes(end.getMinutes() + 45)
    return { start, end }
  }, [])

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">EcomPulse Coaching</span>
          </div>
          <a
            href="mailto:support@ecompulse.nl"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground sm:flex"
          >
            <Mail className="h-4 w-4" />
            support@ecompulse.nl
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]">
            <CheckCircle2 className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Bevestigd
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Bedankt! Je strategiegesprek staat in de planning.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Je hebt zojuist een belangrijke stap gezet richting consistente €10K+ maanden als coach.
            Hieronder vind je alles wat je nodig hebt om jouw gesprek tot een succes te maken.
          </p>
        </div>

        {/* Booking card */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/50 px-6 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Jouw gesprek
            </p>
          </div>
          <div className="grid gap-6 px-6 py-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Datum</p>
                <p className="mt-0.5 text-sm font-medium capitalize">{formatDate(meeting.start)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Tijdstip</p>
                <p className="mt-0.5 text-sm font-medium">
                  {formatTime(meeting.start)} – {formatTime(meeting.end)} (Europe/Amsterdam)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Video className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Waar</p>
                <p className="mt-0.5 text-sm font-medium">Google Meet</p>
                <p className="text-xs text-muted-foreground">Link in de bevestigingsmail</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Duur</p>
                <p className="mt-0.5 text-sm font-medium">45 minuten — neem rustig de tijd</p>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Doe dit nog vóór ons gesprek
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                5 korte stappen — samen ongeveer 15 minuten.
              </p>
            </div>
          </div>

          <ol className="mt-6 space-y-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                        Stap {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold tracking-tight text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        {step.cta.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Veelgestelde vragen</h2>
          <div className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {FAQ.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium hover:bg-muted/50">
                  {item.q}
                  <span className="text-muted-foreground transition group-open:rotate-180">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Reschedule / contact */}
        <section className="mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">Komt het tijdstip toch niet meer uit?</p>
          <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 hover:text-primary"
            >
              <Calendar className="h-4 w-4" />
              Verzet het gesprek
            </a>
            <a
              href="mailto:support@ecompulse.nl"
              className="inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Stel een vraag
            </a>
          </div>
        </section>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          We kijken ernaar uit je te spreken. <br className="sm:hidden" />
          — Team EcomPulse
        </p>
      </main>
    </div>
  )
}

export default App
