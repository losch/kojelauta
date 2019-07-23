package kojelauta.backend.features.sensors

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * Configuration for sensor database
 */
@Configuration
@ConfigurationProperties(prefix = "sensors")
class SensorsConfiguration {
    lateinit var host: String
    lateinit var user: String
    lateinit var password: String
    lateinit var labels: Map<String, String>
}
