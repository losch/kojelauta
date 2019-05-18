package kojelauta.backend.websocket

import com.fasterxml.jackson.databind.ObjectMapper
import kojelauta.backend.events.ClientEvent
import kojelauta.backend.events.Event
import kojelauta.backend.events.ServerEventEmitter
import kojelauta.backend.events.ClientEventHandler
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketMessage
import org.springframework.web.reactive.socket.WebSocketSession
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.lang.Exception

/**
 * Websocket configurations. Listens for websocket connections and subscribes
 * to event emitters and publishes the events to websockets.
 */
@Configuration
class WebSocketConfiguration(private val objectMapper: ObjectMapper,
                             serverEventEmitters: List<ServerEventEmitter>,
                             private val eventHandlers: List<ClientEventHandler<out ClientEvent>>) {

    private val log = LoggerFactory.getLogger(this.javaClass)

    private val eventsBus: Flux<out Event> =
        Flux.merge(serverEventEmitters.map { it.flux })
            .share()
            .doOnSubscribe { log.info("Events subscribed") }
            .doFinally { log.info("Events unsubscribed") }

    @Bean
    fun webSocketHandler(handler: WebSocketHandler): HandlerMapping {
        val mapping = SimpleUrlHandlerMapping()
        mapping.order = 1
        mapping.urlMap = mapOf(
            "/events" to handler
        )

        val corsConfiguration = CorsConfiguration()
        corsConfiguration.allowedOrigins = listOf("*")
        mapping.setCorsConfigurations(mapOf("/events" to corsConfiguration))

        return mapping
    }

    @Bean
    fun handlerAdapter() = WebSocketHandlerAdapter()

    private fun receiveMessage(session: WebSocketSession,
                               message: WebSocketMessage) {
        log.info("Received message from ${session.handshakeInfo.remoteAddress}")

        try {
            val payload = message.payloadAsText

            val type = objectMapper.readValue(payload, ClientEvent::class.java).type

            val handlers = eventHandlers.filter { it.type == type }

            if (handlers.isEmpty()) {
                log.warn("Unknown message: $payload")
            }

            handlers.forEach { handler ->
                val event = objectMapper.readValue(payload, handler.eventClass)
                handler.handleEvent(event)
            }
        }
        catch(e: Exception) {
            log.error("Failed to receive message: $e")
            throw e
        }
    }

    private fun sendMessages(session: WebSocketSession): Mono<Void> =
        session.send(
            eventsBus.map {
                log.info("Publishing to ${session.handshakeInfo.remoteAddress} $it")
                session.textMessage(objectMapper.writeValueAsString(it))
            }
        )

    @Bean
    fun websocketHandler() = WebSocketHandler { session ->
        session.receive()
            .map { receiveMessage(session, it) }
            .then()
            .and(sendMessages(session))
            .doOnSubscribe { log.info("WebSocket connected from ${session.handshakeInfo.remoteAddress}") }
            .doFinally { log.info("WebSocket disconnected to ${session.handshakeInfo.remoteAddress}") }
    }
}
