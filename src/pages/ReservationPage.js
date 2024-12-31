import React, { useState, useEffect } from "react";
import SpaceComponent from "../components/SpaceComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  isSameDay,
  isToday,
  setHours,
  setMinutes,
  addMinutes,
  isAfter,
  isBefore,
} from "date-fns";
import {
  useBookVisitMutation,
  useGetBookedTimesQuery,
} from "../data/visitsSlice";
import { useTranslation } from "react-i18next";

const ReservationPage = () => {
  const { t, i18n } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [visitDate, setVisitDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTime, setSelectedTime] = useState(0);

  console.log(visitDate);

  const [bookVisit] = useBookVisitMutation();
  const { data: bookedTimes } = useGetBookedTimesQuery(
    format(visitDate, "yyyy-MM-dd")
  );

  const getAvailableTimes = () => {
    const times = [];
    let start = setHours(setMinutes(new Date(), 0), 11); // 11:00 AM
    const end = setHours(setMinutes(new Date(), 0), 19); // 7:00 PM

    while (start <= end) {
      times.push(format(start, "HH:mm"));
      start = addMinutes(start, 30);
    }

    if (isToday(visitDate)) {
      const now = new Date();
      return times.filter((time) =>
        isAfter(
          setHours(
            setMinutes(new Date(), time.split(":")[1]),
            time.split(":")[0]
          ),
          now
        )
      );
    }

    return times;
  };

  useEffect(() => {
    if (bookedTimes) {
      const bookedForSelectedDate = bookedTimes
        .filter((entry) => isSameDay(new Date(entry.visitDate), visitDate))
        .flatMap((entry) => {
          const times = [];
          const startTime = new Date(entry.visitDate);
          for (let i = 0; i < +entry.selectedTime + 1; i++) {
            const intervalTime = new Date(
              startTime.getTime() + i * 30 * 60 * 1000
            );
            times.push(format(intervalTime, "HH:mm"));
          }
          return times;
        });

      const allAvailableTimes = getAvailableTimes();
      const filteredTimes = allAvailableTimes.filter(
        (time) => !bookedForSelectedDate.includes(time)
      );
      setAvailableTimes(filteredTimes);
    } else {
      setAvailableTimes(getAvailableTimes());
    }
  }, [bookedTimes, visitDate]);

  useEffect(() => {
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const startDateTime = setHours(
        setMinutes(new Date(), startMinutes),
        startHours
      );
      const endDateTime = setHours(
        setMinutes(new Date(), endMinutes),
        endHours
      );

      const differenceInMinutes = (endDateTime - startDateTime) / (1000 * 60);
      const intervals = Math.ceil(differenceInMinutes / 30);

      setSelectedTime(intervals > 0 ? intervals : 0);
    }
  }, [startTime, endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const visitDateTime = new Date(visitDate);
      const [hours, minutes] = startTime.split(":").map(Number);
      visitDateTime.setHours(hours, minutes);

      const { data } = await bookVisit({
        name,
        email,
        phone,
        message,
        visitDate: visitDateTime.toISOString(),
        selectedTime,
      });

      if (data && data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error recording visit:", error);
      alert("Please select time");
    }
  };

  const getEndTimes = () => {
    if (!startTime) return [];
    const filteredEndTimes = availableTimes
      .filter((time) => {
        return isAfter(
          setHours(
            setMinutes(new Date(), time.split(":")[1]),
            time.split(":")[0]
          ),
          setHours(
            setMinutes(new Date(), startTime.split(":")[1]),
            startTime.split(":")[0]
          )
        );
      })
      .slice(0, 4);

    filteredEndTimes.shift();

    // Find the first booked time and disable times from there
    const selectedDate = new Date(visitDate);
    const firstBooked = bookedTimes
      ?.filter(
        (entry) => isSameDay(new Date(entry.visitDate), selectedDate) // Filter by selected date
      )
      .map((entry) => format(new Date(entry.visitDate), "HH:mm")) // Extract and format visit times
      .find((bookedTime) => {
        const [bookedHour, bookedMinute] = bookedTime.split(":").map(Number); // Extract hour and minute
        const [startHour, startMinute] = startTime.split(":").map(Number); // Extract hour and minute from startTime

        const bookedDate = setHours(
          setMinutes(new Date(), bookedMinute),
          bookedHour
        );
        const startDate = setHours(
          setMinutes(new Date(), startMinute),
          startHour
        );

        return isAfter(bookedDate, startDate); // Compare the times
      });

    console.log(firstBooked);

    if (firstBooked) {
      return filteredEndTimes
        .filter((time) =>
          isBefore(
            setHours(
              setMinutes(new Date(), time.split(":")[1]),
              time.split(":")[0]
            ),
            setHours(
              setMinutes(new Date(), firstBooked.split(":")[1]),
              firstBooked.split(":")[0]
            )
          )
        )
        .slice(0, 4);
    }

    return filteredEndTimes;
  };

  return (
    <div className="reservation-page w-full flex flex-col items-center">
      <div className="space-component-container w-full">
        <SpaceComponent data={{ data: t("bookSpace") }} />
      </div>
      <div className="reservation-page-inner-container pt-5 pb-10">
        <div className="reservation-row-1 w-full">
          <div className="form w-ful">
            <form
              onSubmit={handleSubmit}
              className="reservation-form max-w-3xl mx-auto bg-white flex flex-col border-black border-4 px-3 py-2"
            >
              <div className="w-full pt-3">
                <h4 className="text-[20px] text-center">{t("bookVisit")}</h4>
              </div>
              <div className="name-container flex flex-col pb-6 form-control">
                <input
                  name="name"
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="border-b-2 border-black focus:outline-none"
                />{" "}
                <label htmlFor="name">{t("enterName")}</label>
              </div>
              <div className="form-control email-container flex flex-col pb-6">
                <input
                  name="email"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="border-b-2 border-black focus:outline-none"
                />
                <label htmlFor="email">{t("enterEmail")}</label>
              </div>
              <div className="form-control number-container flex flex-col pb-6 mb-2">
                <input
                  type="tel"
                  name="number"
                  id="number"
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="border-b-2 border-black focus:outline-none"
                />{" "}
                <label htmlFor="number">{t("enterPhoneNumber")}</label>
              </div>
              <div className="visit-date-time-container pb-6 flex flex-col ">
                <div className="date-container flex flex-col pb-2">
                  <label
                    htmlFor="date"
                    className="ps-[10px] text-[0.7rem] text-[#666768]"
                  >
                    {t("visitDate")}
                  </label>
                  <DatePicker
                    selected={visitDate}
                    onChange={(date) => setVisitDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    minDate={new Date()}
                    className="ps-[10px] border-b-2 border-black focus:outline-none w-full cursor-pointer"
                  />
                </div>
                <div className="time-container flex flex-row gap-[40px] ">
                  <div className="start-time flex flex-col w-1/2 border-b-2 border-black h-fit ps-[10px]">
                    <label
                      htmlFor="start-time"
                      className="text-[0.7rem] text-[#666768]"
                    >
                      {t("startTime")}
                    </label>
                    <select
                      name="start-time"
                      id="start-time"
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      value={startTime}
                      className="w-fit bg-white focus:outline-none cursor-pointer"
                    >
                      <option>-- : --</option>
                      {getAvailableTimes().map((time) =>
                        time !== "18:30" && time !== "19:00" ? (
                          <option
                            key={time}
                            value={time}
                            disabled={!availableTimes.includes(time)}
                            className={`${
                              availableTimes.includes(time)
                                ? "disabled-option"
                                : ""
                            }`}
                          >
                            {time}
                          </option>
                        ) : null
                      )}
                    </select>
                  </div>
                  <div className="end-time-container flex flex-col w-1/2 border-b-2 border-black h-fit ps-[10px]">
                    <label
                      htmlFor="end-time"
                      className="text-[0.7rem] text-[#666768]"
                    >
                      {t("endTime")}
                    </label>
                    <select
                      name="end-time"
                      id="end-time"
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      value={endTime}
                      className="w-fit bg-white focus:outline-none cursor-pointer"
                    >
                      <option>-- : --</option>
                      {getEndTimes().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-control message message-form flex flex-col pb-6">
                <textarea
                  name="message"
                  id="message"
                  rows={1}
                  placeholder=""
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-b-2 border-black focus:outline-none"
                ></textarea>
                <label htmlFor="message">{t("sendMessage")}</label>
              </div>
              <div className="button-container flex justify-center mb-2">
                <button className="button pb-1.5 pt-2 px-5  bg-black rounded text-white px-2 ">
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
