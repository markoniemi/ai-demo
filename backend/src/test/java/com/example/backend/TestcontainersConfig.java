package com.example.backend;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.context.ImportTestcontainers;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.GenericContainer;

@TestConfiguration(proxyBeanMethods = false)
@ImportTestcontainers
public class TestcontainersConfig {

    @Bean
    GenericContainer<?> oauthServer() {
        return new GenericContainer<>("oauth-server")
                .withExposedPorts(9000);
    }

}