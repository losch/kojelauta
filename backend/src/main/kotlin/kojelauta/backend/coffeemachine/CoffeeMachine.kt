package kojelauta.backend.coffeemachine

import kojelauta.backend.events.ClientEvent
import kojelauta.backend.events.ClientEventHandler
import kojelauta.backend.events.Event
import kojelauta.backend.events.ServerEventEmitter
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import reactor.core.publisher.DirectProcessor
import reactor.core.publisher.Flux
import java.time.Duration
import java.util.concurrent.atomic.AtomicBoolean

const val COFFEE_EVENT_TYPE = "coffee"

data class CoffeeMachineServerEvent(val enabled: Boolean) : Event(COFFEE_EVENT_TYPE)
data class CoffeeMachineClientEvent(val enabled: Boolean) : ClientEvent(COFFEE_EVENT_TYPE)

/**
 * A combined class for emitting events and handling received events
 */
@Component
class CoffeeMachine : ServerEventEmitter,
                      ClientEventHandler<CoffeeMachineClientEvent>(COFFEE_EVENT_TYPE, CoffeeMachineClientEvent::class.java) {

    private val log = LoggerFactory.getLogger(this.javaClass)

    private val state = AtomicBoolean(false)

    // Server event emitting

    private final val fluxProcessor =
        DirectProcessor.create<CoffeeMachineServerEvent>()
                       .serialize()
    private final val fluxSink = fluxProcessor.sink()
    private final val coffeeStatePublishFlux =
        Flux.interval(Duration.ofSeconds(1))
            .map { CoffeeMachineServerEvent(state.get()) }

    override val flux = Flux.merge(coffeeStatePublishFlux, fluxProcessor)

    // Client event handling

    override fun internalHandleEvent(event: CoffeeMachineClientEvent) {
        state.set(event.enabled)
        fluxSink.next(CoffeeMachineServerEvent(state.get()))
    }
}
