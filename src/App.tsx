import { useMemo } from 'react'
import {
  CheckCircle2,
  Calendar,
  Video,
  Mail,
  ArrowUpRight,
  Clock,
  User,
} from 'lucide-react'
import {
  parseCalendlyParams,
  formatDateNL,
  formatTimeNL,
  durationMinutes,
  initialsFromName,
  type CalendlyBooking,
} from './lib/calendly'

const FAQ = [
  {
    q: 'Wat gebeurt er tijdens het gesprek?',
    a: 'We brengen je huidige situatie in kaart, bepalen waar je vastloopt en laten zien welk pad jou naar je eerste €10K maand met je eigen online store brengt. Geen pitch, wel een eerlijk advies.',
  },
  {
    q: 'Met wie spreek ik?',
    a: 'Je spreekt met één van onze strategen. Zij weten precies waar starters in jouw fase op vastlopen bij het bouwen van hun online store. Hierboven zie je met wie jij specifiek bent ingepland.',
  },
  {
    q: 'Kan ik het gesprek verzetten?',
    a: 'Zeker. Gebruik de "Verzet gesprek" link onderaan deze pagina of in je bevestigingsmail. Doe dit minimaal 12 uur van tevoren.',
  },
  {
    q: 'Wat als ik niet kom opdagen?',
    a: 'No-shows krijgen geen tweede mogelijkheid. We werken op afspraak met een beperkt aantal plekken per week — kom je niet, dan gaat de plek naar iemand anders.',
  },
]

function BookingCard({ booking }: { booking: CalendlyBooking }) {
  const { eventStartTime, eventEndTime, assignedTo } = booking
  const minutes =
    eventStartTime && eventEndTime
      ? durationMinutes(eventStartTime, eventEndTime)
      : undefined

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Jouw gesprek
        </p>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[color:var(--color-success)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-success)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
          </span>
          Bevestigd
        </span>
      </div>

      <div className="grid gap-6 px-6 py-6 sm:grid-cols-2">
        <DetailRow
          icon={User}
          label="Je gesprekspartner"
          value={assignedTo ?? 'Wordt zo toegewezen'}
          sub={assignedTo ? 'EcomPulse strateeg' : 'Calendly wijst toe op basis van beschikbaarheid'}
          accent
        />
        <DetailRow
          icon={Calendar}
          label="Datum"
          value={
            eventStartTime ? capitalize(formatDateNL(eventStartTime)) : 'Volgt in bevestigingsmail'
          }
        />
        <DetailRow
          icon={Clock}
          label="Tijdstip"
          value={
            eventStartTime && eventEndTime
              ? `${formatTimeNL(eventStartTime)} – ${formatTimeNL(eventEndTime)}`
              : 'Volgt in bevestigingsmail'
          }
          sub={eventStartTime ? 'Europe/Amsterdam' : undefined}
        />
        <DetailRow
          icon={Video}
          label="Waar"
          value="Google Meet"
          sub={
            minutes ? `${minutes} minuten — link in de bevestigingsmail` : 'Link in de bevestigingsmail'
          }
        />
      </div>
    </section>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: typeof Calendar
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          accent
            ? 'bg-primary/15 text-primary'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function App() {
  const booking = useMemo(
    () => parseCalendlyParams(window.location.search),
    [],
  )

  const firstName = booking.inviteeFirstName

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-[11px] font-bold">E</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">EcomPulse</span>
          </div>
          <a
            href="mailto:support@ecompulse.nl"
            className="hidden items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground sm:flex"
          >
            <Mail className="h-3.5 w-3.5" />
            support@ecompulse.nl
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-20 sm:pt-24">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-success)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Bevestigd ·{' '}
              <span className="text-foreground/85">Gesprek staat in je agenda</span>
            </span>
          </div>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {firstName ? `Bedankt ${firstName},` : 'Bedankt,'}
            <br />
            je gesprek is{' '}
            <span className="font-serif-italic">bevestigd</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Je hebt zojuist een belangrijke stap gezet richting jouw eerste €10K maand met je eigen online store.
            Hieronder vind je alles wat je nodig hebt om jouw gesprek tot een succes te maken.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-[color:var(--color-success)]" />
            <span className="text-sm text-muted-foreground">
              Bevestigingsmail onderweg naar{' '}
              <span className="text-foreground/85">
                {booking.inviteeEmail ?? 'je inbox'}
              </span>
            </span>
          </div>
        </div>

        {/* Booking card */}
        <BookingCard booking={booking} />

        {/* FAQ */}
        <section className="mt-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Veelgestelde <span className="font-serif-italic">vragen</span>
          </h2>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card/60">
            {FAQ.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium hover:bg-muted/40">
                  {item.q}
                  <span className="text-muted-foreground transition group-open:rotate-180">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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

        {/* Reschedule / cancel */}
        <section className="mt-16 rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center sm:p-8">
          <p className="text-sm font-medium">Komt het tijdstip toch niet meer uit?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Verzet of annuleer het gesprek direct via Calendly.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <a
              href={booking.rescheduleUrl ?? '#'}
              target={booking.rescheduleUrl ? '_blank' : undefined}
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 ${
                !booking.rescheduleUrl ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              <Calendar className="h-4 w-4" />
              Verzet gesprek
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={booking.cancelUrl ?? '#'}
              target={booking.cancelUrl ? '_blank' : undefined}
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground ${
                !booking.cancelUrl ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              Annuleer gesprek
            </a>
          </div>
          {!booking.inviteeUuid && (
            <p className="mt-4 text-[11px] text-muted-foreground/70">
              Verzet/annuleer-links worden actief zodra je via Calendly op deze pagina komt.
            </p>
          )}
        </section>

        <footer className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
            {initialsFromName(booking.assignedTo)}
          </div>
          <p className="text-sm text-muted-foreground">
            We kijken ernaar uit je te spreken.
          </p>
          <p className="text-xs text-muted-foreground/70">— Team EcomPulse</p>
        </footer>
      </main>
    </div>
  )
}

export default App
