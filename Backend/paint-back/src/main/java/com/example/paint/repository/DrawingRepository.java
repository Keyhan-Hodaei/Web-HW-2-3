package com.example.paint.repository;

import com.example.paint.entity.Drawing;
import com.example.paint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    Drawing findByUser(User user);
}
