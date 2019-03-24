package kojelauta.backend.index

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.server.RouterFunctions
import org.springframework.web.reactive.function.server.router

/**
 * Router for serving index page and static assets
 */
@Configuration
class StaticRouter {
    /**
     * Index page
     */
    @Bean
    fun index(@Value("classpath:/static/index.html") html: Resource) = router {
        GET("/") { ok().contentType(MediaType.TEXT_HTML).syncBody(html)  }
    }

    /**
     * Assets
     */
    @Bean
    fun staticFiles() = RouterFunctions.resources("/**", ClassPathResource("static/"))
}
