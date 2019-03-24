package kojelauta.backend.sensors

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.server.*

/**
 * Endpoint for fetching sensor data
 */
@Configuration
class TemperatureSensorRouter {
    @Bean
    fun router(repository: TemperatureSensorRepository) = router {
        GET("/temperature") {
            ok()
                .contentType(MediaType.APPLICATION_JSON)
                .header("Access-Control-Allow-Origin", "*")
                .syncBody(repository.findLatestMeasurementsBySensor())
        }
    }
}
