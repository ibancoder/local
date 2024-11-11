package aula04.lobita.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://178.156.55.174:8085",    // IP pública del front-end
                        "http://localhost:8085",         // Per desenvolupament en local
                        "http://localhost:5500",         // Per desenvolupament en local
                        "http://localhost:1234",         // Per desenvolupament en local
                        "http://127.0.0.1:5500"          // Per desenvolupament en local
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
