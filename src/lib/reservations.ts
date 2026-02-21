export type ServiceType = "bath" | "cut"
export type DogSize = "toy" | "small" | "medium" | "large" | "giant" | "cat"

interface ReservationData {
  service: ServiceType
  size: DogSize
  startTime: string // ISO string
  name: string
  email: string
  notes: string
}

export async function createReservation(data: ReservationData) {
  const res = await fetch("/api/createReservation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || "Failed to create reservation")
  }
  return res.json()
}

export async function cancelReservation(eventId: string, service: ServiceType) {
  const res = await fetch("/api/cancelReservation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, service })
  })

  if (!res.ok) throw new Error("Failed to cancel reservation")
  return res.json()
}
