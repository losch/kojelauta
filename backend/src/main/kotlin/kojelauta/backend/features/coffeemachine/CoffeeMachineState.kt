package kojelauta.backend.features.coffeemachine

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDateTime
import java.time.LocalTime

data class CoffeeMachineState(
    val enabled: Boolean,
    val schedulingEnabled: Boolean,
    val scheduledDateTime: LocalDateTime) {

    @JsonCreator
    constructor(enabled: Boolean, schedulingEnabled: Boolean, scheduledTime: LocalTime):
        this(
            enabled,
            schedulingEnabled,
            scheduledDateTime = CoffeeMachineScheduleCalculator.calculateNextTriggerTime(LocalDateTime.now(), scheduledTime)
        )

    @get:JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    val scheduledTime: LocalTime
        get() = scheduledDateTime.toLocalTime()
}