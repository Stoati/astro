import { z } from "zod";

export const DayList = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

export const DayEnum = z.enum(DayList);

export type DayEnum = z.infer<typeof DayEnum>;

export const TimeSlotsList = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
] as [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30"
];

export const TimeSlotsEnum = z.enum(TimeSlotsList);

export type TimeSlotsEnum = z.infer<typeof TimeSlotsEnum>;

export const Schedule = z.object({
  monday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
  tuesday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
  wednesday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
  thursday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
  friday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
  saturday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
  sunday: z.array(
    z.object({
      start: TimeSlotsEnum,
      stop: TimeSlotsEnum,
    })
  ),
});

export type Schedule = z.infer<typeof Schedule>;
