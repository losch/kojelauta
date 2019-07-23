package kojelauta.backend.features.sensors

import java.math.BigDecimal

typealias TemperatureMeasurementsBySensor = Map<String, List<TemperatureMeasurement>>

data class TemperatureMeasurement(
    // MAC address of the sensor
    val mac: String,

    // Label for the sensor
    val label: String?,

    // Temperature in Celsius
    val temperature: BigDecimal,

    // Relative humidity
    val humidity: BigDecimal
)
