package kojelauta.backend.events

/**
 * Client event type
 */
open class ClientEvent(
    val type: String
)

/**
 * Event handler for receiving events from clients
 */
abstract class ClientEventHandler<T : ClientEvent>(val type: String,
                                                   val eventClass: Class<T>) {

    fun castAndHandleEvent(event: ClientEvent) {
        @Suppress("UNCHECKED_CAST")
        handleEvent(
            event as? T
            ?: throw IllegalArgumentException("Invalid type ${event.javaClass.name}")
        )
    }

    abstract fun handleEvent(event: T)
}
