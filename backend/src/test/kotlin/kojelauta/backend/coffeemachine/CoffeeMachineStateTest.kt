package kojelauta.backend.coffeemachine

import org.junit.Assert.*
import org.junit.Test
import java.time.LocalDateTime

class CoffeeMachineStateTest {

    @Test
    fun `CoffeeMachineState created with LocalTime has correct values`() {
        val now = LocalDateTime.now()

        val state = CoffeeMachineState(
            enabled = true,
            schedulingEnabled = true,
            scheduledTime = now.toLocalTime()
        )

        assertEquals(true, state.enabled)
        assertEquals(true, state.schedulingEnabled)
        assertEquals(now.toLocalTime(), state.scheduledTime)
    }
}
