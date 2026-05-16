/**
 * Parses Calendly redirect query parameters.
 *
 * In Calendly: Event Type → Confirmation Page → "Redirect to an external site"
 * with "Pass event details to your redirected page" enabled. Calendly appends
 * the invitee UUID, event times, assigned host, etc. as query params.
 *
 * Docs: https://help.calendly.com/hc/en-us/articles/223147027
 */

export type CalendlyBooking = {
  inviteeFullName?: string
  inviteeFirstName?: string
  inviteeEmail?: string
  inviteeUuid?: string
  eventTypeName?: string
  eventTypeUuid?: string
  eventStartTime?: Date
  eventEndTime?: Date
  assignedTo?: string
  answers: Record<string, string>
  rescheduleUrl?: string
  cancelUrl?: string
}

const param = (sp: URLSearchParams, key: string) => {
  const v = sp.get(key)
  return v && v.trim() !== '' ? v : undefined
}

const parseDate = (v?: string): Date | undefined => {
  if (!v) return undefined
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? undefined : d
}

export function parseCalendlyParams(search: string): CalendlyBooking {
  const sp = new URLSearchParams(search)

  const fullName = param(sp, 'invitee_full_name')
  const firstName =
    param(sp, 'invitee_first_name') ?? fullName?.split(' ')[0]

  const inviteeUuid = param(sp, 'invitee_uuid')

  const answers: Record<string, string> = {}
  for (let i = 1; i <= 10; i++) {
    const v = param(sp, `answer_${i}`)
    if (v) answers[`answer_${i}`] = v
  }

  return {
    inviteeFullName: fullName,
    inviteeFirstName: firstName,
    inviteeEmail: param(sp, 'invitee_email'),
    inviteeUuid,
    eventTypeName: param(sp, 'event_type_name'),
    eventTypeUuid: param(sp, 'event_type_uuid'),
    eventStartTime: parseDate(param(sp, 'event_start_time')),
    eventEndTime: parseDate(param(sp, 'event_end_time')),
    assignedTo: param(sp, 'assigned_to'),
    answers,
    rescheduleUrl: inviteeUuid
      ? `https://calendly.com/reschedulings/${inviteeUuid}`
      : undefined,
    cancelUrl: inviteeUuid
      ? `https://calendly.com/cancellations/${inviteeUuid}`
      : undefined,
  }
}

export function formatDateNL(d: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Amsterdam',
  }).format(d)
}

export function formatTimeNL(d: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  }).format(d)
}

export function durationMinutes(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / 60000)
}

export function initialsFromName(name?: string): string {
  if (!name) return 'EP'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
