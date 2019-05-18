package kojelauta.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.web.reactive.config.EnableWebFlux

@SpringBootApplication
@EnableScheduling
@EnableWebFlux
class KojelautaApplication

fun main(args: Array<String>) {
	runApplication<KojelautaApplication>(*args)
}
