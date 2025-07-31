package service;


import entity.Drawing;
import entity.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import repository.DrawingRepository;
import repository.UserRepository;

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
        if (user == null) throw new RuntimeException("User not found");

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
        if (user == null) throw new RuntimeException("User not found");

        Drawing drawing = drawingRepository.findByUser(user);
        return drawing != null ? drawing.getContent() : null;
    }
}
