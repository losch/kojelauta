package kojelauta.backend.coffeemachine

import kojelauta.backend.events.ClientEvent
import kojelauta.backend.events.ClientEventHandler
import kojelauta.backend.events.Event
import kojelauta.backend.events.ServerEventEmitter
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import reactor.core.publisher.DirectProcessor
import reactor.core.publisher.Flux
import java.time.Duration
import java.time.LocalTime
import java.util.concurrent.atomic.AtomicBoolean
import java.util.concurrent.atomic.AtomicReference

const val COFFEE_EVENT_TYPE = "coffee"

data class CoffeeMachineState(
    val enabled: Boolean,
    val schedulingEnabled: Boolean,
    val scheduledTime: LocalTime
)

data class CoffeeMachineServerEvent(val state: CoffeeMachineState) : Event(COFFEE_EVENT_TYPE)
data class CoffeeMachineClientEvent(val state: CoffeeMachineState) : ClientEvent(COFFEE_EVENT_TYPE)

/**
 * A combined class for emitting events and handling received events
 */
@Component
class CoffeeMachine : ServerEventEmitter,
                      ClientEventHandler<CoffeeMachineClientEvent>(COFFEE_EVENT_TYPE, CoffeeMachineClientEvent::class.java) {

    private val log = LoggerFactory.getLogger(this.javaClass)

    private val state = AtomicReference<CoffeeMachineState>(
        CoffeeMachineState(
            enabled = false,
            schedulingEnabled = false,
            scheduledTime = LocalTime.MIDNIGHT
        )
    )

    // Coffee machine scheduler
    @Scheduled(fixedRate = 1000)
    fun coffeeScheduler() {
        val currentState = state.get()

        // Check if it's time to switch coffee machine on
        if (!currentState.enabled &&
            currentState.schedulingEnabled &&
            currentState.scheduledTime.isBefore(LocalTime.now())) {
            log.info("! Switching coffee machine on !")

            state.set(currentState.copy(
                enabled = true,
                schedulingEnabled = false
            ))

            fluxSink.next(CoffeeMachineServerEvent(state.get()))
        }
    }

    // Server event emitting

    private final val fluxProcessor =
        DirectProcessor.create<CoffeeMachineServerEvent>()
                       .serialize()
    private final val fluxSink = fluxProcessor.sink()

    override val events = fluxProcessor

    // Client event handling

    override fun getInitialEvent() = CoffeeMachineServerEvent(state.get())

    override fun handleEvent(event: CoffeeMachineClientEvent) {
        state.set(event.state)
        fluxSink.next(CoffeeMachineServerEvent(state.get()))
    }
}
