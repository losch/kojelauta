package kojelauta.backend.sensors

import kojelauta.backend.events.Event
import kojelauta.backend.events.ServerEventEmitter
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import java.time.Duration

data class TemperatureMeasurementEvents(val measurements: TemperatureMeasurementsBySensor) : Event("temperature")

/**
 * Publishes temperature sensor data periodically for clients
 */
@Component
class TemperatureServerEventEmitter(
        private val temperatureSensorRepository: TemperatureSensorRepository) : ServerEventEmitter {

    override val events = Flux.interval(Duration.ofSeconds(1))
        .map {
            TemperatureMeasurementEvents(
                measurements = temperatureSensorRepository.findLatestMeasurementsBySensor()
            )
        }
}
