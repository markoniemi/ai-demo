package com.example.backend;

import com.github.dockerjava.api.model.ExposedPort;
import com.github.dockerjava.api.model.PortBinding;
import com.github.dockerjava.api.model.Ports;
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
                .withExposedPorts(9000)
                .withCreateContainerCmdModifier(cmd -> cmd.getHostConfig().withPortBindings(
                        new PortBinding(Ports.Binding.bindPort(9000), new ExposedPort(9000))
                ));
    }

}
