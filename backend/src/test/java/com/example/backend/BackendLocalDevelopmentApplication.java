package com.example.backend;

import org.springframework.boot.SpringApplication;

public class BackendLocalDevelopmentApplication {

    public static void main(String[] args) {
        SpringApplication.from(BackendApplication::main)
                .with(TestcontainersConfig.class)
                .run(args);
    }

}