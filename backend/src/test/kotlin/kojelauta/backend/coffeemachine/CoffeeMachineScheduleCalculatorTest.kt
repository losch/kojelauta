package kojelauta.backend.coffeemachine

import org.junit.Test

import org.junit.Assert.*
import java.time.LocalDateTime
import java.time.LocalTime

class CoffeeMachineScheduleCalculatorTest {

    private val currentTime = LocalDateTime.of(2019, 6, 20, 12, 0, 0)

    @Test
    fun `calculateNextTriggerTime calculates future time for the same date`() {
        val dateTime = CoffeeMachineScheduleCalculator.calculateNextTriggerTime(
            currentTime,
            LocalTime.of(12, 0, 1)
        )

        val expected = LocalDateTime.of(2019, 6, 20, 12, 0, 1)

        assertEquals(expected, dateTime)
    }

    @Test
    fun `calculateNextTriggerTime calculates past time for the next date`() {
        val dateTime = CoffeeMachineScheduleCalculator.calculateNextTriggerTime(
            currentTime,
            LocalTime.of(11, 59, 59)
        )

        val expected = LocalDateTime.of(2019, 6, 21, 11, 59, 59)

        assertEquals(expected, dateTime)
    }

    @Test
    fun `calculateNextTriggerTime calculates the same time for the next date`() {
        val dateTime = CoffeeMachineScheduleCalculator.calculateNextTriggerTime(
            currentTime,
            LocalTime.of(12, 0, 0)
        )

        val expected = LocalDateTime.of(2019, 6, 21, 12, 0, 0)

        assertEquals(expected, dateTime)
    }
}
