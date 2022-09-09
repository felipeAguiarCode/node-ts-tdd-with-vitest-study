import { beforeAll, expect, it, test } from "vitest"
import { Appointment } from "./appointment"
import { getFutureDate } from "../test/util/get-future-date"

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
  const startsAt = getFutureDate("2022-08-10")
  const endsAt = getFutureDate("2022-08-09")

  expect(() => {
    return new Appointment({
      customer: "Felipe",
      startsAt,
      endsAt,
    })
  }).toThrow()
})

test("cannot create an appointment with start date before now", () => {
  const startsAt = new Date()

  startsAt.setDate(startsAt.getDate() + 1)

  expect(() => {
    return new Appointment({
      customer: "Felipe",
      startsAt,
      endsAt: new Date(),
    })
  }).toThrow()
})
