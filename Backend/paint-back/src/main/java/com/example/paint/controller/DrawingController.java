package com.example.paint.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.paint.service.DrawingService;

@RestController
@RequestMapping("/api/drawings")
public class DrawingController {
    private final DrawingService drawingService;

    public DrawingController(DrawingService drawingService) {
        this.drawingService = drawingService;
    }

    @PostMapping("/{username}")
    public ResponseEntity<Void> saveDrawing(@PathVariable String username, @RequestBody String content) {
        drawingService.saveDrawing(username, content);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{username}")
    public ResponseEntity<String> getDrawing(@PathVariable String username) {
        String content = drawingService.getDrawing(username);
        return content != null ? ResponseEntity.ok(content) : ResponseEntity.notFound().build();
    }
}
