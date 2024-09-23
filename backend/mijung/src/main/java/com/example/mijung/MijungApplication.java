package com.example.mijung;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(servers = {@Server(url = "https://mijung.store", description = "도메인 설명")})
@SpringBootApplication
public class MijungApplication {

    public static void main(String[] args) {
        SpringApplication.run(MijungApplication.class, args);
    }

}
