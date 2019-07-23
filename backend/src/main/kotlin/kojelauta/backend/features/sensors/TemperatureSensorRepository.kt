package kojelauta.backend.features.sensors

import org.influxdb.InfluxDBFactory
import org.influxdb.dto.Query
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class TemperatureSensorRepository(private val config: SensorsConfiguration) {

    private val log = LoggerFactory.getLogger(this::class.java)

    private val influxDB = InfluxDBFactory
        .connect(config.host, config.user, config.password)
        .apply {
            setDatabase("ruuvi")
        }

    fun findLatestMeasurementsBySensor(): TemperatureMeasurementsBySensor {
        val query = Query(
            """
            select
                mac,
                temperature,
                humidity
            from ruuvi_measurements
            group by mac
            order by time desc
            limit 1
            """.trimIndent()
        )

        return influxDB.query(query).results.flatMap {
                it.series.flatMap { series ->
                    series.values.map { value ->
                        val mac = value[1].toString()
                        TemperatureMeasurement(
                            mac = mac,
                            label = config.labels[mac],
                            temperature = BigDecimal(value[2].toString()).setScale(2),
                            humidity = BigDecimal(value[3].toString()).setScale(2)
                        )
                    }
                }
            }
            .groupBy { it.mac }
    }
}
