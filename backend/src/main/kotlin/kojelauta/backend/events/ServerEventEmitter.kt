package kojelauta.backend.events

import reactor.core.publisher.Flux

/**
 * Event base class
 */
open class Event(
    // Event type
    val type: String
)

/**
 * Event emitter class. Contains a flux where events are pushed to
 * and the Flux can be subscribed..
 */
interface ServerEventEmitter {
    val flux: Flux<out Event>
}