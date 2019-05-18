package kojelauta.backend.health

import kojelauta.backend.events.Event
import kojelauta.backend.events.ServerEventEmitter
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import java.time.Duration
import java.time.LocalDateTime

data class PingEvent(val timestamp: LocalDateTime = LocalDateTime.now()) : Event("ping")

/**
 * Sends "ping" message periodically to clients
 */
@Component
class PingServerEventEmitter : ServerEventEmitter {

    private val pingInterval = Duration.ofSeconds(5L)

    override val flux = Flux.interval(pingInterval).map { PingEvent() }
}
