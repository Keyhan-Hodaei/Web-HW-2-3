package com.example.paint.service;


import com.example.paint.entity.Drawing;
import com.example.paint.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.example.paint.repository.DrawingRepository;
import com.example.paint.repository.UserRepository;

@Service
public class DrawingService {
    private final DrawingRepository drawingRepository;
    private final UserRepository userRepository;

    public DrawingService(DrawingRepository drawingRepository, UserRepository userRepository) {
        this.drawingRepository = drawingRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveDrawing(String username, String content) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            user = new User(username);
            userRepository.save(user);
        }

        Drawing drawing = drawingRepository.findByUser(user);
        if (drawing == null)
            drawing = new Drawing(user, content);
        else
            drawing.setContent(content);
        drawingRepository.save(drawing);
    }

    @Transactional
    public String getDrawing(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }

        Drawing drawing = drawingRepository.findByUser(user);
        return drawing != null ? drawing.getContent() : null;
    }
}
