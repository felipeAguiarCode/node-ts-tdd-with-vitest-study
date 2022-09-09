import { describe, expect, it } from "vitest"
import { Appointment } from "../entities/appointment"
import { getFutureDate } from "../test/util/get-future-date"
import { CreateAppointment } from "./create-appointment"
import { InMemoryAppointmentsRepo } from "../repositories/in-memory/in-memory-appointments-repo"

describe("Create Appointment", () => {
  it("should be able to create an appointment", async () => {
    const startsAt = getFutureDate("2022-09-10")
    const endsAt = getFutureDate("2022-09-11")

    const appointmentRepository = new InMemoryAppointmentsRepo()
    const sut = new CreateAppointment(appointmentRepository)

    expect(
      sut.execute({
        customer: "Felipe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment)
  })

  it("should not be able to create an appointment with overllaping dates", async () => {
    const startsAt = getFutureDate("2022-09-10")
    const endsAt = getFutureDate("2022-09-15")

    const appointmentRepository = new InMemoryAppointmentsRepo()
    const sut = new CreateAppointment(appointmentRepository)

    await sut.execute({
      customer: "Felipe",
      startsAt,
      endsAt,
    })

    expect(
      sut.execute({
        customer: "Johnny",
        startsAt: getFutureDate("2022-09-12"),
        endsAt: getFutureDate("2022-09-14"),
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
