package kojelauta.backend.events

import java.lang.IllegalArgumentException

/**
 * Client event type
 */
interface ClientEvent {
    val type: String
}

/**
 * Event handler for receiving events from clients
 */
interface ClientEventHandler<T : ClientEvent> {

    val eventClass: Class<T>

    val type: String

    fun handleEvent(event: ClientEvent) {
        @Suppress("UNCHECKED_CAST")
        internalHandleEvent(
            event as? T
            ?: throw IllegalArgumentException("Invalid type ${event.javaClass.name}")
        )
    }

    fun internalHandleEvent(event: T)
}
