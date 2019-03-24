package kojelauta.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.reactive.config.EnableWebFlux

@SpringBootApplication
@EnableWebFlux
class KojelautaApplication

fun main(args: Array<String>) {
	runApplication<KojelautaApplication>(*args)
}
