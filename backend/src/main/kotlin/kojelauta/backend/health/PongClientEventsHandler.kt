package kojelauta.backend.health

import kojelauta.backend.events.ClientEvent
import kojelauta.backend.events.ClientEventHandler
import org.slf4j.LoggerFactory
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.stereotype.Component
import java.time.LocalDateTime

data class PongClientEvent(
    override val type: String,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) val timestamp: LocalDateTime
) : ClientEvent

/**
 * Handles "pong" messages from clients
 */
@Component
class PongClientEventsHandler : ClientEventHandler<PongClientEvent> {

    override val type = "pong"
    override val eventClass = PongClientEvent::class.java

    private val log = LoggerFactory.getLogger(this.javaClass)

    override fun internalHandleEvent(event: PongClientEvent) {
        log.info("Got PONG: $event")
    }
}
