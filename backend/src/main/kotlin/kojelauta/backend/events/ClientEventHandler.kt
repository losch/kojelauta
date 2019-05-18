package kojelauta.backend.events

import java.lang.IllegalArgumentException

/**
 * Client event type
 */
open class ClientEvent(
    val type: String
)

/**
 * Event handler for receiving events from clients
 */
abstract class ClientEventHandler<T: ClientEvent>(val type: String,
                                                  val eventClass: Class<T>) {

    fun handleEvent(event: ClientEvent) {
        @Suppress("UNCHECKED_CAST")
        internalHandleEvent(
            event as? T
            ?: throw IllegalArgumentException("Invalid type ${event.javaClass.name}")
        )
    }

    abstract fun internalHandleEvent(event: T)
}
