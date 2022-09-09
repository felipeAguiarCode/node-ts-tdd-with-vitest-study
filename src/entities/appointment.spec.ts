import { beforeAll, expect, it, test } from "vitest"
import { Appointment } from "./appointment"

test("create an appointment", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() + 1)
  endsAt.setDate(endsAt.getDate() + 2)

  const appointment = new Appointment({
    customer: "Felipe",
    startsAt: startsAt,
    endsAt: endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual("Felipe")
})

test("cannot create an appointment with end date before start date", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() + 2)
  endsAt.setDate(endsAt.getDate() + 1)

  expect(() => {
    return new Appointment({
      customer: "Felipe",
      startsAt: new Date(),
      endsAt: new Date(),
    })
  }).toThrow()
})

test("cannot create an appointment with start date before now", () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: "Felipe",
      startsAt: new Date(),
      endsAt: new Date(),
    })
  }).toThrow()
})
