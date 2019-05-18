package kojelauta.backend.health

import kojelauta.backend.events.ClientEvent
import kojelauta.backend.events.ClientEventHandler
import org.slf4j.LoggerFactory
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.stereotype.Component
import java.time.LocalDateTime

const val PONG_EVENT_TYPE = "pong"

data class PongClientEvent(
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) val timestamp: LocalDateTime
) : ClientEvent(PONG_EVENT_TYPE)

/**
 * Handles "pong" messages from clients
 */
@Component
class PongClientEventsHandler : ClientEventHandler<PongClientEvent>(PONG_EVENT_TYPE, PongClientEvent::class.java) {

    private val log = LoggerFactory.getLogger(this.javaClass)

    override fun internalHandleEvent(event: PongClientEvent) {
        log.info("Got PONG: $event")
    }
}
