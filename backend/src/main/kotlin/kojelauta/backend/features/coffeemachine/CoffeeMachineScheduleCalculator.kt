package kojelauta.backend.features.coffeemachine

import java.time.LocalDateTime
import java.time.LocalTime

object CoffeeMachineScheduleCalculator {

    fun calculateNextTriggerTime(currentDateTime: LocalDateTime, time: LocalTime): LocalDateTime {
        val nextDay = currentDateTime.toLocalTime() >= time

        return currentDateTime
            .withHour(time.hour)
            .withMinute(time.minute)
            .withSecond(time.second)
            .let {
                if (nextDay) {
                    it.plusDays(1)
                }
                else {
                    it
                }
            }

    }
}
