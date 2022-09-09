import { Appointment } from "../../entities/appointment"
import { IAppointmentsRepository } from "../I-appointments-repository"
import { areIntervalsOverlapping } from "date-fns"

export class InMemoryAppointmentsRepo implements IAppointmentsRepository {
  public items: Appointment[] = []

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overLappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      )
    })

    if (!overLappingAppointment) {
      return null
    }

    return overLappingAppointment
  }

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async save(appointment: Appointment): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
