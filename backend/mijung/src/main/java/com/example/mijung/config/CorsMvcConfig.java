package com.example.mijung.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Value("${cors.url}")
    private String corsURL;

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        String[] allowedOrigins = Arrays.stream(corsURL.split(","))
                .map(String::trim)
                .toArray(String[]::new);

        corsRegistry.addMapping("/**") // 모든 경로에 대해 CORS 설정을 적용
                .allowedOrigins(allowedOrigins) // cors.url로부터 분리된 허용된 출처 목록을 설정
                .allowedMethods("GET"); // 허용할 HTTP method
    }
}
