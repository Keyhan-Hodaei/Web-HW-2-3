package com.example.paint;

import com.example.paint.entity.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.paint.repository.UserRepository;

@SpringBootApplication
public class PaintApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaintApplication.class, args);
    }

    @Bean
    public CommandLineRunner initiateUsers(UserRepository userRepository) {
        return args -> {
            userRepository.save(new User("user1"));
            userRepository.save(new User("user2"));
            userRepository.save(new User("user3"));
        };
    }
}
